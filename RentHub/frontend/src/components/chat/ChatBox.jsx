// src/components/chat/ChatBox.jsx
import { useState, useEffect } from "react";

function ChatBox({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const allMessages = JSON.parse(localStorage.getItem("messages")) || {};
    setMessages(allMessages[roomId] || []);
  }, [roomId]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const newMessage = { id: Date.now(), text, sender: "You" };
    const allMessages = JSON.parse(localStorage.getItem("messages")) || {};
    const roomMessages = allMessages[roomId] || [];
    const updatedMessages = [...roomMessages, newMessage];

    allMessages[roomId] = updatedMessages;
    localStorage.setItem("messages", JSON.stringify(allMessages));
    setMessages(updatedMessages);
    setText("");
  };

  return (
    <div>
      <div style={{ border: "1px solid #ccc", height: "200px", overflowY: "scroll", marginBottom: "10px", padding: "5px" }}>
        {messages.map(m => (
          <p key={m.id}><strong>{m.sender}:</strong> {m.text}</p>
        ))}
      </div>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default ChatBox;