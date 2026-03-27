// backend/controllers/chat.controller.js
import db from "../db.js";

// 1️⃣ Send message
export const sendMessage = (req, res) => {
  const { message, receiver_id, type } = req.body;
  const sender_id = req.user.id; // get sender from JWT

  if (!message || !receiver_id) {
    return res.status(400).json({ error: "Message and receiver_id are required" });
  }

  const sql = "INSERT INTO chats (sender_id, receiver_id, message, type) VALUES (?, ?, ?, ?)";
  db.query(sql, [sender_id, receiver_id, message, type || 'text'], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Message sent successfully", chatId: result.insertId });
  });
};

// 2️⃣ Get all messages between two users
export const getMessages = (req, res) => {
  const user_id = req.user.id;
  const { other_user_id } = req.query;

  const sql = `
    SELECT c.*, u.name as sender_name 
    FROM chats c
    JOIN users u ON c.sender_id = u.id
    WHERE (sender_id=? AND receiver_id=?) 
       OR (sender_id=? AND receiver_id=?) 
    ORDER BY created_at ASC
  `;

  db.query(sql, [user_id, other_user_id, other_user_id, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

// 3️⃣ Get list of all conversations for a user
export const getConversations = (req, res) => {
  const user_id = req.user.id;

  const sql = `
    SELECT 
      u.id, 
      u.name, 
      u.email,
      (SELECT message FROM chats 
       WHERE (sender_id = u.id AND receiver_id = ?) 
          OR (sender_id = ? AND receiver_id = u.id) 
       ORDER BY created_at DESC LIMIT 1) as last_message,
      (SELECT type FROM chats 
       WHERE (sender_id = u.id AND receiver_id = ?) 
          OR (sender_id = ? AND receiver_id = u.id) 
       ORDER BY created_at DESC LIMIT 1) as last_message_type,
      (SELECT created_at FROM chats 
       WHERE (sender_id = u.id AND receiver_id = ?) 
          OR (sender_id = ? AND receiver_id = u.id) 
       ORDER BY created_at DESC LIMIT 1) as last_message_time
    FROM users u
    WHERE u.id IN (
      SELECT DISTINCT receiver_id FROM chats WHERE sender_id = ?
      UNION
      SELECT DISTINCT sender_id FROM chats WHERE receiver_id = ?
    )
    ORDER BY last_message_time DESC
  `;

  db.query(sql, [user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};