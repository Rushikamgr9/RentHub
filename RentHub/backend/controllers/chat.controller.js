// backend/controllers/chat.controller.js
import db from "../db.js";

// 1️⃣ Send message
export const sendMessage = (req, res) => {
  const { message, receiver_id } = req.body;
  const sender_id = req.user.id; // get sender from JWT

  if (!message || !receiver_id) {
    return res.status(400).json({ error: "Message and receiver_id are required" });
  }

  const sql = "INSERT INTO chats (sender_id, receiver_id, message) VALUES (?, ?, ?)";
  db.query(sql, [sender_id, receiver_id, message], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: "Message sent successfully", chatId: result.insertId });
  });
};

// 2️⃣ Get all messages between two users (Tenant & Landlord)
export const getMessages = (req, res) => {
  const user_id = req.user.id;
  const { other_user_id } = req.params; // chat with this user

  const sql = `
    SELECT * FROM chats 
    WHERE (sender_id=? AND receiver_id=?) 
       OR (sender_id=? AND receiver_id=?) 
    ORDER BY created_at ASC
  `;

  db.query(sql, [user_id, other_user_id, other_user_id, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(result);
  });
};