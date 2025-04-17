import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import cron from 'node-cron';

import { updateShiftStatuses, checkForNewBuses } from './controllers/crewController.js';
import crewDetail from "./routes/crew.js"

import busesRoutes from './routes/buses.js';
import schedulingRoutes from './routes/scheduling.js';
import routesRoutes from './routes/routes.js';
import { Bus } from './models/bus.js';
import adminRoute from './routes/admin.js'
import { Crew } from './models/crew.js';

import { jwtAuthMiddleware, requireAdmin } from './middleware/auth.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

// 3. Initialize Express App
const app = express();
const PORT = process.env.PORT || 4000;

// 4. Middleware Configuration
// JSON Body Parser
app.use(express.json());

// CORS Setup
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }));


// 5. Setup API Routes
app.use('/api/newUser',authRoutes);
app.use('/api/crew',jwtAuthMiddleware,crewDetail);
app.use('/api/buses',jwtAuthMiddleware,busesRoutes);
app.use('/api/routes',jwtAuthMiddleware,routesRoutes);
app.use('/api/scheduling',jwtAuthMiddleware,schedulingRoutes);
app.use('/api/admin',jwtAuthMiddleware,adminRoute)

// 6. Create HTTP Server and Integrate Socket.IO
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // Allow all origins for WebSocket; adjust for production.
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const connectedCrew = new Map();

// Socket.IO Connection Management
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // When crew connects, they register their ID
  socket.on('registerCrew', (crewId) => {
    connectedCrew.set(crewId, socket.id);
    console.log(`Crew ${crewId} registered with socket ${socket.id}`);
  });

  // On disconnect, remove from map
  socket.on('disconnect', () => {
    for (const [crewId, id] of connectedCrew.entries()) {
      if (id === socket.id) {
        connectedCrew.delete(crewId);
        console.log(`Crew ${crewId} disconnected`);
        break;
      }
    }
  });
});

// 7. Connect to MongoDB and Start Server
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, { dbName: 'dtc_scheduling' })
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    
    // Emit bus updates every 10 seconds via Socket.IO
    setInterval(async () => {
      try {
        const buses = await Bus.find({});
        io.emit('busUpdates', buses);
        console.log('Bus updates sent to clients');
      } catch (error) {
        console.error('Error during bus updates:', error);
      }
    }, 10000);

    // Start the HTTP server after successful DB connection
    server.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });

// 8. Schedule Cron Jobs

// Shift Rotation Cron Job (Runs every Monday at midnight)
// This rotates the crew's shift according to the defined mapping.
cron.schedule('0 0 * * 1', async () => {
  console.log('Rotating shifts for the week...');
  const shiftRotation = {
    morning: 'afternoon',
    afternoon: 'evening',
    evening: 'morning',
  };

  try {
    const crews = await Crew.find();
    for (const crew of crews) {
      // Update shift based on the rotation mapping.
      crew.shift = shiftRotation[crew.shift];
      await crew.save();
    }
    console.log('Shift rotation completed successfully.');
  } catch (err) {
    console.error('Error rotating shifts:', err);
  }
});

// Update Shift Statuses and Check for New Buses every 5 seconds
cron.schedule('*/5 * * * * *', async () => {
  try {
    console.log('Running shift status updater and bus check...');
    await updateShiftStatuses();
    await checkForNewBuses();
    console.log('Shift statuses updated and bus check completed.');
  } catch (error) {
    console.error('Error in scheduled job:', error);
  }
});

export { io, connectedCrew };