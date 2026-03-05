import express from "express"
import db from "../db.js"

const router = express.Router()

// Get rooms
router.get("/", (req, res) => {
  db.query("SELECT * FROM rooms", (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.json(result)
    }
  })
})

// Add room
router.post("/", (req, res) => {
  const { title, price, location } = req.body

  db.query(
    "INSERT INTO rooms (title, price, location) VALUES (?, ?, ?)",
    [title, price, location],
    (err, result) => {
      if (err) {
        res.send(err)
      } else {
        res.json("Room Added")
      }
    }
  )
})

export default router