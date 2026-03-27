import express from "express";
import { sendMessage, getMessages, getConversations } from "../controllers/chat.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/send", auth, sendMessage);
router.get("/messages", auth, getMessages);
router.get("/conversations", auth, getConversations);

export default router;