import Button from "../Button";

export default function RoomCard({ room, onEdit, onDelete, onToggle, role, onBook }) {
  return (
    <div className="room-card">
      <h3>{room.title}</h3>
      <p>{room.location}</p>
      <p>Rs. {room.price}</p>
      <span className={`status-badge ${room.status === "Booked" ? "booked" : "available"}`}> {room.status} </span>

      {role === "landlord" ? (
        <>
          <Button onClick={() => onToggle(room.id)}>Change Status</Button>
          <Button onClick={() => onEdit(room)} style={{ marginLeft: "0.5rem" }}>Edit</Button>
          <Button danger onClick={() => onDelete(room.id)} style={{ marginLeft: "0.5rem" }}>Delete</Button>
        </>
      ) : (
        room.status === "Available" && <Button primary onClick={() => onBook(room)}>Book</Button>
      )}
    </div>
  );
}
