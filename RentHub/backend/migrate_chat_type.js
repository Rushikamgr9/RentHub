import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'rent_hub'
});

const sql = "ALTER TABLE chats ADD COLUMN type ENUM('text', 'call') DEFAULT 'text' AFTER message;";

connection.query(sql, (err, results) => {
  if (err) {
    if (err.code === 'ER_DUP_COLUMN_NAME') {
      console.log("Column 'type' already exists.");
    } else {
      console.error("Error adding column:", err);
    }
  } else {
    console.log("Column 'type' successfully added to 'chats' table.");
  }
  connection.end();
});