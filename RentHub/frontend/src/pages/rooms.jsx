import { useState, useMemo } from "react"
import { useRooms } from "../hooks/useRooms";
import RoomForm from "../components/Room/RoomForm"
import RoomCard from "../components/Room/RoomCard"
import RoomSearch from "../components/Room/RoomSearch";
import { useAuth } from "../hooks/useAuth";

function Rooms() {
  const { rooms, loading, error, addRoom, updateRoom, deleteRoom, bookRoom, toggleRoomStatus } = useRooms();
  const { user } = useAuth();
  const role = user?.role;

  const [editingRoom, setEditingRoom] = useState(null)
  const [search, setSearch] = useState("")

  const filteredRooms = useMemo(() => {
    return rooms.filter(room =>
      room.title.toLowerCase().includes(search.toLowerCase()) ||
      room.location.toLowerCase().includes(search.toLowerCase())
    );
  }, [rooms, search]);

  const displayRooms = filteredRooms;

  const handleSave = (room) => {
    if (editingRoom) {
      updateRoom(room);
      setEditingRoom(null);
    } else {
      addRoom(room);
    }
  };

  const handleBook = (room) => {
    bookRoom(room);
  };

  return (
    <div>
      <h2>Rooms Management</h2>

      <RoomSearch value={search} onChange={setSearch} />

      {role === "landlord" && (
        <RoomForm onSave={handleSave} editing={editingRoom} />
      )}

      {loading && <p>Loading rooms...</p>}
      {error && <p className="error">{error}</p>}

      {displayRooms.length === 0 ? (
        <p>No rooms found.</p>
      ) : (
        displayRooms.map(room => (
          <RoomCard
            key={room.id}
            room={room}
            role={role}
            onEdit={setEditingRoom}
            onDelete={deleteRoom}
            onToggle={toggleRoomStatus}
            onBook={handleBook}
          />
        ))
      )}
    </div>
  )
}

export default Rooms