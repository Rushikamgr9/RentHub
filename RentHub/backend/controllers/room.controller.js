// backend/controllers/room.controller.js
import db from "../db.js";

// 1️⃣ Add Room (Landlord)
export const addRoom = (req, res) => {
  const { title, description, price, location } = req.body;
  const landlord_id = req.user.id; // get from JWT

  // Basic validation
  if (!title || !description || !price || !location) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql =
    "INSERT INTO rooms (title, description, price, location, landlord_id, status) VALUES (?,?,?,?,?,?)";

  db.query(
    sql,
    [title, description, price, location, landlord_id, "available"],
    (err, result) => {
      if (err) {
        console.error("DB ERROR:", err); // will show MySQL errors in terminal
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.json({ message: "Room added successfully", roomId: result.insertId });
    }
  );
};

// // 2️⃣ View All Rooms (Tenant)
// export const getRooms = (req, res) => {
//   const sql = "SELECT * FROM rooms";
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json(err);
//     res.json(results);
//   });
// };

export const getRooms = (req, res) => {
  const landlord_id = req.user.id; // get landlord ID from JWT
  const sql = "SELECT * FROM rooms WHERE landlord_id=?";
  db.query(sql, [landlord_id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// // 3️⃣ Update Room (Landlord)
// export const updateRoom = (req, res) => {
//   const roomId = req.params.id;
//   const { title, description, price, location, type, status } = req.body;

//   const sql =
//     "UPDATE rooms SET title=?, description=?, price=?, location=?, type=?, status=? WHERE id=?";
//   db.query(sql, [title, description, price, location, type, status, roomId], (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json({ message: "Room updated successfully" });
//   });
// };

export const updateRoom = (req, res) => {
  const roomId = req.params.id;
  const landlord_id = req.user.id; // ensure only owner can update
  const { title, description, price, location, status } = req.body;

  const sql = "UPDATE rooms SET title=?, description=?, price=?, location=?, status=? WHERE id=? AND landlord_id=?";
  db.query(sql, [title, description, price, location, status, roomId, landlord_id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Room not found or unauthorized" });
    res.json({ message: "Room updated successfully" });
  });
};

// // 4️⃣ Delete Room (Landlord)
// export const deleteRoom = (req, res) => {
//   const roomId = req.params.id;

//   const sql = "DELETE FROM rooms WHERE id=?";
//   db.query(sql, [roomId], (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json({ message: "Room deleted successfully" });
//   });
// };

export const deleteRoom = (req, res) => {
  const roomId = req.params.id;
  const landlord_id = req.user.id;
 
  const sql = "DELETE FROM rooms WHERE id=? AND landlord_id=?";
  db.query(sql, [roomId, landlord_id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Room not found or unauthorized" });
    res.json({ message: "Room deleted successfully" });
  });
};

// 5️⃣ Search & Filter Rooms (Tenant)
export const searchRooms = (req, res) => {
  const { location, price, type, status } = req.query;

  let sql = "SELECT * FROM rooms WHERE 1=1";

  if (location) sql += ` AND location LIKE '%${location}%'`;
  if (price) sql += ` AND price <= ${price}`;
  if (type) sql += ` AND type='${type}'`;
  if (status) sql += ` AND status='${status}'`;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// 6️⃣ Update Room Status (Booked/Available)
export const updateRoomStatus = (roomId, status, callback) => {
  const sql = "UPDATE rooms SET status=? WHERE id=?";
  db.query(sql, [status, roomId], (err, result) => {
    callback(err, result);
  });
};