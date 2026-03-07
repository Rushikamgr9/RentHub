import express from "express"
import db from "../db.js"

const router = express.Router()

// In-memory fallback storage
let roomsStorage = []
let isDBConnected = false

// Check if database is connected
db.ping((err) => {
  if (!err) {
    isDBConnected = true
  }
})

// Get rooms
router.get("/", (req, res) => {
  if (isDBConnected) {
    db.query("SELECT * FROM rooms", (err, result) => {
      if (err) {
        res.status(500).json({ error: "Database error", rooms: roomsStorage })
      } else {
        res.json(result)
      }
    })
  } else {
    res.json(roomsStorage)
  }
})

// Add room
router.post("/", (req, res) => {
  const { title, price, location } = req.body

  const newRoom = {
    id: Date.now(),
    title,
    price,
    location,
    status: "Available"
  }

  if (isDBConnected) {
    db.query(
      "INSERT INTO rooms (title, price, location) VALUES (?, ?, ?)",
      [title, price, location],
      (err, result) => {
        if (err) {
          roomsStorage.push(newRoom)
          res.json(newRoom)
        } else {
          res.json(newRoom)
        }
      }
    )
  } else {
    roomsStorage.push(newRoom)
    res.json(newRoom)
  }
})

export default router