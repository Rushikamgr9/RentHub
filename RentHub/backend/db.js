// backend/utils/db.js
import mysql from "mysql2";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "renthub",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


export default db; 