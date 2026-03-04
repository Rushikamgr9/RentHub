function RoomCard({ room, deleteRoom, toggleStatus, setEditingRoom, role }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "15px",
      marginBottom: "10px",
      borderRadius: "8px"
    }}>
      <h3>{room.title}</h3>
      <p>Price: Rs. {room.price}</p>
      <p>Location: {room.location}</p>
      <p>Status: {room.status}</p>

      {role === "landlord" && (
        <>
          <button onClick={() => toggleStatus(room.id)}>
            Change Status
          </button>

          <button
            onClick={() => setEditingRoom(room)}
            style={{ marginLeft: "10px" }}
          >
            Edit
          </button>

          <button
            onClick={() => deleteRoom(room.id)}
            style={{
              marginLeft: "10px",
              backgroundColor: "red",
              color: "white"
            }}
          >
            Delete
          </button>
        </>
      )}
    </div>
  )
}

export default RoomCard