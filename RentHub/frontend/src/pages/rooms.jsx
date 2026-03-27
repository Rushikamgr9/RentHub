import React, { useEffect, useState } from "react";
import axios from "axios";
import RoomCard from "../components/rooms/RoomCard";
import RoomSearch from "../components/rooms/RoomSearch";
import RoomDetailsModal from "../components/RoomDetailsModal";
import EditRoomModal from "../components/rooms/EditRoomModal";
import MapComponent from "../components/ui/MapComponent";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [roomToManage, setRoomToManage] = useState(null);
  const [viewType, setViewType] = useState("grid"); // "grid" or "map"

  const token = localStorage.getItem("token");

  const handleViewDetails = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const fetchRooms = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/rooms", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRooms(res.data);
        setFilteredRooms(res.data);
      })
      .catch(err => console.error("Error fetching rooms:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRooms();
  }, [token]);

  // SEARCH FUNCTION
  const handleSearch = (params) => {
    const { province, district, city, type, price } = params;
    let result = rooms;

    if (province) {
      result = result.filter((room) =>
        room.location.toLowerCase().includes(province.toLowerCase())
      );
    }

    if (district) {
      result = result.filter((room) =>
        room.location.toLowerCase().includes(district.toLowerCase())
      );
    }

    if (city) {
      result = result.filter((room) =>
        room.location.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (type) {
      result = result.filter((room) =>
        room.title.toLowerCase().includes(type.toLowerCase())
      );
    }

    if (price) {
      result = result.filter((room) => Number(room.price) <= Number(price));
    }

    setFilteredRooms(result);
  };

  // EDIT ROOM
  const handleEdit = (room) => {
    setRoomToManage(room);
    setIsEditModalOpen(true);
  };

  // DELETE ROOM
  const handleDeleteClick = (roomId) => {
    setRoomToManage({ id: roomId });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/rooms/delete/${roomToManage.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsDeleteModalOpen(false);
      fetchRooms(); // refresh list
      alert("Room deleted successfully");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete room");
    }
  };

  // BOOK ROOM
  const handleBooking = async (roomId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/bookings/request",
        { room_id: roomId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Booking requested successfully!");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || "Booking failed");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Available Rooms</h2>
          <p className="text-slate-500 mt-1">Found {filteredRooms.length} properties matching your criteria</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
           <button 
             onClick={() => setViewType("grid")}
             className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewType === "grid" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
           >
             Grid View
           </button>
           <button 
             onClick={() => setViewType("map")}
             className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewType === "map" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
           >
             Map View
           </button>
        </div>
      </div>

      <RoomSearch onSearch={handleSearch} />

      {filteredRooms.length > 0 ? (
        viewType === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onBook={() => handleBooking(room.id)}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-[600px] rounded-3xl overflow-hidden border-2 border-slate-200/60 shadow-xl relative z-0">
            <MapContainer 
              center={{ lat: 27.7172, lng: 85.3240 }} 
              zoom={12} 
              style={{ h: "100%", width: "100%", height: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {filteredRooms.map((room) => (
                room.latitude && room.longitude && (
                  <Marker key={room.id} position={{ lat: room.latitude, lng: room.longitude }}>
                    <Popup>
                      <div className="p-2 space-y-2">
                        <h3 className="font-bold text-slate-900">{room.title}</h3>
                        <p className="text-indigo-600 font-bold">Rs {room.price}</p>
                        <button 
                          onClick={() => handleViewDetails(room)}
                          className="w-full py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                )
              ))}
            </MapContainer>
          </div>
        )
      ) : (
        <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5-1.5l-1.5.545m-3.182 4.909l2.424-.882M4.5 18.75h3m-3-4.5h3m-3-4.5h3m-3-4.5h3M12.75 12h.008v.008h-.008V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.008v.008h-.008v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No rooms found</h3>
          <p className="text-slate-500">Try adjusting your search filters to find more properties.</p>
        </div>
      )}

      <RoomDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={selectedRoom}
        onBook={handleBooking}
      />

      <EditRoomModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        room={roomToManage}
        onUpdate={fetchRooms}
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
      >
        <div className="space-y-6">
          <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <p className="font-medium">Are you sure you really want to delete this property? This action cannot be undone.</p>
          </div>
          
          <div className="flex gap-4">
            <Button 
              variant="danger" 
              className="flex-1 py-4 font-bold"
              onClick={confirmDelete}
            >
              Yes, Delete
            </Button>
            <Button 
              variant="secondary" 
              className="flex-1 py-4 font-bold"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              No, Keep it
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
