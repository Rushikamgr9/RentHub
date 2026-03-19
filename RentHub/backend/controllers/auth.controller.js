// backend/controllers/auth.controller.js
import db from "../db.js"; // your mysql2 connection
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const [existing] = await db.promise().query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existing.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await db.promise().query(
      "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
      [name, email, hash, role]
    );

    res.json({
      id: result.insertId,
      email: email,
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const [rows] = await db.promise().query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0)
      return res.status(404).json({ error: "User not found" });

    const user = rows[0];

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Wrong password" });

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};