import express from "express";
import { assignCrew, completeTrip, crewDetail, listCrew, swapShift, transferBus } from "../controllers/crewController.js";
import { getCrewMessages, respondToMessage } from "../controllers/admin/message.js";

const app = express.Router();

app.get('/list', listCrew);
app.get("/assign", assignCrew);
app.get('/crewDetail', crewDetail);
app.post("/complete_trip", completeTrip);
app.post("/transfer_bus", transferBus);
app.post('/swap_shift', swapShift);
app.put('/message/:id/respond', respondToMessage);
app.get('/messages/:crewId', getCrewMessages);

export default app;