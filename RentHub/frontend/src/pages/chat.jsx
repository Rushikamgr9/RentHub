// src/pages/chat.jsx
import { useState } from "react";
import ChatBox from "../components/chat/ChatBox";

function Chat() {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const rooms = JSON.parse(localStorage.getItem("rooms")) || [];

  return (
    <div>
      <h2>Chat</h2>
      <div style={{ display: "flex" }}>
        <div style={{ width: "200px", marginRight: "20px" }}>
          <h3>Rooms</h3>
          {rooms.map(room => (
            <p key={room.id} style={{ cursor: "pointer" }} onClick={() => setSelectedRoomId(room.id)}>
              {room.title}
            </p>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          {selectedRoomId ? <ChatBox roomId={selectedRoomId} /> : <p>Select a room to chat</p>}
        </div>
      </div>
    </div>
  );
}

export default Chat;