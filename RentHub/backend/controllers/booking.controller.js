// backend/controllers/booking.controller.js
import db from "../db.js";

// 1️⃣ Request a booking (Tenant)
export const requestBooking = (req, res) => {
  const tenant_id = req.user.id;
  const { room_id } = req.body;

  const sql = "INSERT INTO bookings (room_id, tenant_id, status) VALUES (?,?,?)";
  db.query(sql, [room_id, tenant_id, "pending"], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Booking requested successfully", bookingId: result.insertId });
  });
};

// 2️⃣ View bookings (Landlord sees bookings for their rooms)
export const getBookings = (req, res) => {
  const landlord_id = req.user.id;

  const sql = `
    SELECT b.id AS booking_id, b.room_id, b.tenant_id, b.status, r.title AS room_title, r.landlord_id
    FROM bookings b
    JOIN rooms r ON b.room_id = r.id
    WHERE r.landlord_id = ?
  `;

  db.query(sql, [landlord_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// 3️⃣ Approve / Reject Booking (Landlord)
export const updateBookingStatus = (req, res) => {
  const { id } = req.params; // booking id
  const { status } = req.body; // "approved" or "rejected"

  const sql = "UPDATE bookings SET status=? WHERE id=?";
  db.query(sql, [status, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (status === "approved") {
      // Update room status to booked
      const sqlRoom = `
        UPDATE rooms 
        SET status='booked' 
        WHERE id=(SELECT room_id FROM bookings WHERE id=?)
      `;
      db.query(sqlRoom, [id], (err2, result2) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json({ message: "Booking approved and room status updated to booked" });
      });
    } else {
      res.json({ message: "Booking rejected" });
    }
  });
};