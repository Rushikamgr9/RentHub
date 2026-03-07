import { useState } from "react";
import Navbar from "../components/Navbar";
import RoomCard from "../components/RoomCard";

function LandlordDashboard() {
  const [rooms, setRooms] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  const addRoom = () => {
    if (!title || !price || !location) {
      alert("Please fill in all fields.");
      return;
    }
    setRooms([
      ...rooms,
      { title, price, location, status: "Available", image: "https://via.placeholder.com/400x220/1a2332/8b9cad?text=Room" },
    ]);
    setTitle("");
    setPrice("");
    setLocation("");
  };

  return (
    <>
      <Navbar role="landlord" />
      <div className="page">
        <h2 className="dash-header">My listings</h2>
        <div className="add-room">
          <h3>Add a room</h3>
          <div className="row">
            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <button type="button" className="btn btn-primary" onClick={addRoom}>Add room</button>
        </div>
        <h3>My rooms</h3>
        <div className="rooms-grid">
          {rooms.map((room, index) => (
            <RoomCard key={index} room={room} />
          ))}
        </div>
      </div>
    </>
  );
}

export default LandlordDashboard;
