// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import roomRoutes from "./routes/room.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import db from "./db.js"; // mysql2 connection
import { Server } from "socket.io";
import http from "http";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/chat", chatRoutes);

// Create HTTP server and Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // allow frontend to connect
});

// In-memory call room tracking: chatId -> Set of userIds
const activeCalls = new Map();

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  // User joins their own private room
  socket.on("join", (userId) => {
    socket.join(`user_${userId}`);
    socket.userId = userId.toString(); // Normalize to string
    console.log(`User ${userId} joined their room`);
  });

  // Targeted messaging
  socket.on("send_message", (data) => {
    io.to(`user_${data.receiver_id}`).emit("receive_message", data);
  });

  // Active calls request (for sync)
  socket.on("check_active_calls", (callback) => {
    const activeChatIds = Array.from(activeCalls.keys());
    callback(activeChatIds);
  });

  // Video Call Room Management
  socket.on("join_video_room", ({ roomId, chatId, recipientId }) => {
    if (!chatId) return;
    
    socket.join(`call_${roomId}`);
    socket.currentRoom = roomId;
    socket.chatId = chatId;
    socket.recipientId = recipientId;

    if (!activeCalls.has(chatId)) {
      activeCalls.set(chatId, new Set());
    }
    activeCalls.get(chatId).add(socket.userId);
    
    console.log(`User ${socket.userId} joined call ${chatId} (Room ${roomId}): ${activeCalls.get(chatId).size} members`);
  });

  const leaveCall = (roomId, chatId, recipientId) => {
    if (chatId && activeCalls.has(chatId)) {
      const users = activeCalls.get(chatId);
      users.delete(socket.userId);
      console.log(`User ${socket.userId} left call ${chatId}: ${users.size} members left`);

      // If call is ended (0 people left)
      if (users.size === 0) {
        console.log(`Call ${chatId} is now empty. Ending session.`);
        
        // 1. Update DB
        db.query("UPDATE chats SET type = 'call_ended' WHERE id = ?", [chatId], (err) => {
          if (err) console.error("Error updating call status in DB:", err);
        });

        // 2. Notify participants
        io.to(`user_${socket.userId}`).emit("call_status_update", { chatId, status: 'call_ended' });
        if (recipientId) {
          io.to(`user_${recipientId}`).emit("call_status_update", { chatId, status: 'call_ended' });
        }
        
        activeCalls.delete(chatId);
      }
    }
  };

  socket.on("leave_video_room", ({ roomId, chatId, recipientId }) => {
    leaveCall(roomId, chatId, recipientId);
    if (roomId) socket.leave(`call_${roomId}`);
    socket.currentRoom = null;
  });

  socket.on("disconnect", () => {
    if (socket.currentRoom) {
      leaveCall(socket.currentRoom, socket.chatId, socket.recipientId);
    }
    console.log("Socket disconnected:", socket.id);
  });
});

// Test database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
  } else {
    console.log("MySQL connected");
    connection.release();
  }
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));