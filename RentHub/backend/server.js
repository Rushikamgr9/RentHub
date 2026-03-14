import express from "express"
import cors from "cors"
import roomsRoute from "./routes/rooms.js"

const app = express()
const reviewRoutes = require("./routes/reviewRoutes");

app.use("/api/reviews", reviewRoutes);
app.use(cors())
app.use(express.json())

app.use("/rooms", roomsRoute)

app.listen(5000, () => {
  console.log("Server running on port 5000")
})