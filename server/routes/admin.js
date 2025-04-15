import express from "express";
import { sendMessageToCrew } from "../controllers/admin/message.js";

const router = express.Router();

router.post('/message', sendMessageToCrew);

export default router;