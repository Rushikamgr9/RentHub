import Navbar from "../components/Navbar";
import RoomCard from "../components/RoomCard";
import ChatBox from "../components/ChatBox";
import { useState } from "react";

const DUMMY_ROOMS = [
  { title: "Single Room", price: 150, location: "City Center", status: "Available", image: "https://photos2.spareroom.co.uk/images/flatshare/listings/large/98/97/98975189.jpg" },
  { title: "Double Room", price: 250, location: "Near University", status: "Booked", image: "https://5.imimg.com/data5/SELLER/Default/2023/3/UD/UA/SZ/58744500/375794490-500x500.jpg" },
  { title: "Studio Apartment", price: 400, location: "Downtown", status: "Available", image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/483970478.jpg?k=d4e939e099fccacc4fcebcb67cb861cf5f0445a6da40224ba8baab094e3e4c35&o=" },
];

function TenantDashboard() {
  const [search, setSearch] = useState("");
  const filteredRooms = DUMMY_ROOMS.filter(
    (room) =>
      room.title.toLowerCase().includes(search.toLowerCase()) ||
      room.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar role="tenant" />
      <div className="page">
        <div className="dash-header">
          <h2>Find a room</h2>
          <input
            className="search-inp"
            type="text"
            placeholder="Search by title or location…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="rooms-grid">
          {filteredRooms.map((room, index) => (
            <RoomCard key={index} room={room} />
          ))}
        </div>
        <ChatBox />
      </div>
    </>
  );
}

export default TenantDashboard;
