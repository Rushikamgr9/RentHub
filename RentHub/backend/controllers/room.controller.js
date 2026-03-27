// backend/controllers/room.controller.js
import db from "../db.js";

//  Add Room (Landlord)
export const addRoom = (req, res) => {
  const { title, description, price, location, latitude, longitude } = req.body;
  const landlord_id = req.user.id; // get from JWT

  // Basic validation
  if (!title || !description || !price || !location) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql =
    "INSERT INTO rooms (title, description, price, location, latitude, longitude, landlord_id, status) VALUES (?,?,?,?,?,?,?,?)";

  db.query(
    sql,
    [title, description, price, location, latitude, longitude, landlord_id, "available"],
    (err, result) => {
      if (err) {
        console.error("DB ERROR:", err); // will show MySQL errors in terminal
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.json({ message: "Room added successfully", roomId: result.insertId });
    }
  );
};

// // View All Rooms (Tenant)
// export const getRooms = (req, res) => {
//   const sql = "SELECT * FROM rooms";
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json(err);
//     res.json(results);
//   });
// };

export const getRooms = (req, res) => {
  const { id, role } = req.user;

  if (role === "landlord") {
    // Landlords only see their own rooms
    const sql = "SELECT * FROM rooms WHERE landlord_id=?";
    db.query(sql, [id], (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    });
  } else {
    // Tenants see all rooms with landlord info
    const sql = `
      SELECT r.*, u.name AS landlord_name, u.email AS landlord_email, u.address AS landlord_address
      FROM rooms r
      JOIN users u ON r.landlord_id = u.id
    `;
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    });
  }
};

// //  Update Room (Landlord)
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
  const { title, description, price, location, status, latitude, longitude } = req.body;

  const sql = "UPDATE rooms SET title=?, description=?, price=?, location=?, status=?, latitude=?, longitude=? WHERE id=? AND landlord_id=?";
  db.query(sql, [title, description, price, location, status, latitude, longitude, roomId, landlord_id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Room not found or unauthorized" });
    res.json({ message: "Room updated successfully" });
  });
};

// //  Delete Room (Landlord)
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

//  Search & Filter Rooms (Tenant)
export const searchRooms = (req, res) => {
  const { province, district, city, price, type, status } = req.query;

  let sql = `
    SELECT r.*, u.name AS landlord_name, u.email AS landlord_email, u.address AS landlord_address
    FROM rooms r
    JOIN users u ON r.landlord_id = u.id
    WHERE 1=1
  `;
  const params = [];

  if (province) {
    sql += " AND r.location LIKE ?";
    params.push(`%${province}%`);
  }
  if (district) {
    sql += " AND r.location LIKE ?";
    params.push(`%${district}%`);
  }
  if (city) {
    sql += " AND r.location LIKE ?";
    params.push(`%${city}%`);
  }
  if (price) {
    sql += " AND r.price <= ?";
    params.push(price);
  }
  if (type) {
    sql += " AND r.title LIKE ?";
    params.push(`%${type}%`);
  }
  if (status) {
    sql += " AND r.status = ?";
    params.push(status);
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// Update Room Status (Booked/Available)
export const updateRoomStatus = (roomId, status, callback) => {
  const sql = "UPDATE rooms SET status=? WHERE id=?";
  db.query(sql, [status, roomId], (err, result) => {
    callback(err, result);
  });
};