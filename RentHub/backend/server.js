import express from "express"
import cors from "cors"
import roomsRoute from "./routes/rooms.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/rooms", roomsRoute)

app.listen(5000, () => {
  console.log("Server running on port 5000")
})