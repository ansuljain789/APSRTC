import express from "express";
import { assignCrew, completeTrip, crewDetail, listCrew, swapShift, transferBus } from "../controllers/crewController.js";

const app = express.Router();

app.get('/list', listCrew);
app.get("/assign", assignCrew);
app.get('/crewDetail', crewDetail);
app.post("/complete_trip", completeTrip);
app.post("/transfer_bus", transferBus);
app.post('/swap_shift', swapShift);

export default app;