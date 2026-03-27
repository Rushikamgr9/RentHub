import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import { addRoom,getRooms,updateRoom,deleteRoom } from "../controllers/room.controller.js";

const router = express.Router();

router.post("/add",auth,addRoom);
router.get("/",auth,getRooms);
router.put("/update/:id",auth,updateRoom);
router.delete("/delete/:id",auth,deleteRoom);

export default router;