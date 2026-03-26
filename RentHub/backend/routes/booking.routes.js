import express from "express";
import { requestBooking, getBookings, updateBookingStatus } from "../controllers/booking.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/request", auth, requestBooking); // tenant requests booking
router.get("/", auth, getBookings); // landlord views bookings
router.put("/:id", auth, updateBookingStatus); // approve/reject

export default router;