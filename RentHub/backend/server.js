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

const app = express()
const reviewRoutes = require("./routes/reviewRoutes");

app.use("/api/reviews", reviewRoutes);
app.use(cors())
app.use(express.json())

// Create HTTP server and Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // allow frontend to connect
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  // Listen for incoming messages
  socket.on("send_message", (data) => {
    // data = { sender_id, receiver_id, message }
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
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