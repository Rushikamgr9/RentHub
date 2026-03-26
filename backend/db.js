// backend/db.js
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_NAME || "renthub",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default db;