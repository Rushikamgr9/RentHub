// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import RoomCard from "../components/rooms/RoomCard";
// // import RoomSearch from "../components/rooms/RoomSearch";

// // export default function Rooms() {
// //   const [rooms, setRooms] = useState([]);
// //   const [filteredRooms, setFilteredRooms] = useState([]);

// //   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     axios
// //       .get("http://localhost:5000/api/rooms", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       .then((res) => {
// //         setRooms(res.data);
// //         setFilteredRooms(res.data);
// //       });
// //   }, []);

// //   // SEARCH FUNCTION
// //   const handleSearch = (location, price) => {
// //     let result = rooms;

// //     if (location) {
// //       result = result.filter((room) =>
// //         room.location.toLowerCase().includes(location.toLowerCase())
// //       );
// //     }

// //     if (price) {
// //       result = result.filter((room) => room.price <= price);
// //     }

// //     setFilteredRooms(result);
// //   };

// //   // BOOK ROOM
// //   const handleBooking = async (roomId) => {
// //     try {
// //       await axios.post(
// //         "http://localhost:5000/api/bookings/request",
// //         { room_id: roomId },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       alert("Booking requested!");
// //     } catch (err) {
// //       console.log(err);
// //       alert("Booking failed");
// //     }
// //   };

// //   return (
// //     <div className="p-6">

// //       <h2 className="text-2xl font-bold mb-6">Available Rooms</h2>

// //       <RoomSearch onSearch={handleSearch} />

// //       <div className="grid grid-cols-3 gap-6">
// //         {filteredRooms.map((room) => (
// //           <RoomCard
// //             key={room.id}
// //             room={room}
// //             onBook={() => handleBooking(room.id)}
// //           />
// //         ))}
        
// //       </div>

// //     </div>
// //   );
// // }

// // Rooms.jsx
// import { useState, useEffect } from "react";
// import axios from "axios";
// import RoomCard from "../components/rooms/RoomCard";
// import RoomForm from "../components/rooms/RoomForm";

// export default function Rooms() {
//   const [rooms, setRooms] = useState([]);
//   const [editingRoom, setEditingRoom] = useState(null); // holds the room being edited
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("token");

//   const fetchRooms = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:5000/api/rooms", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setRooms(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRooms();
//   }, []);

//   const updateRoom = async (room) => {
//     try {
//       await axios.put(`http://localhost:5000/api/rooms/${room.id}`, room, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEditingRoom(null); // hide form after update
//       fetchRooms();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deleteRoom = async (id) => {
//     if (!confirm("Are you sure you want to delete this room?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/rooms/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchRooms();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto mt-8 px-4">
//       <h2 className="text-xl font-bold mb-4">My Rooms</h2>

//       {/* Conditionally show edit form */}
//       {editingRoom && (
//         <RoomForm
//           editingRoom={editingRoom}
//           updateRoom={updateRoom}
//           addRoom={null} // form is only for update here
//         />
//       )}

//       {loading ? (
//         <p className="text-center text-gray-500">Loading rooms...</p>
//       ) : rooms.length === 0 ? (
//         <p className="text-center text-gray-500">No rooms added yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {rooms.map((room) => (
//             <RoomCard
//               key={room.id}
//               room={room}
//               onEdit={() => setEditingRoom(room)}
//               onDelete={() => deleteRoom(room.id)}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import RoomCard from "../components/rooms/RoomCard";
import RoomSearch from "../components/rooms/RoomSearch";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/rooms", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRooms(res.data);
        setFilteredRooms(res.data);
      });
  }, []);

  // SEARCH FUNCTION
  const handleSearch = (location, price) => {
    let result = rooms;

    if (location) {
      result = result.filter((room) =>
        room.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (price) {
      result = result.filter((room) => room.price <= price);
    }

    setFilteredRooms(result);
  };

  // BOOK ROOM
  const handleBooking = async (roomId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/bookings/request",
        { room_id: roomId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Booking requested!");
    } catch (err) {
      console.log(err);
      alert("Booking failed");
    }
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">Available Rooms</h2>

      <RoomSearch onSearch={handleSearch} />

      <div className="grid grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onBook={() => handleBooking(room.id)}
          />
        ))}
      </div>

    </div>
  );
}