import { useState } from "react";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "You", text: input }]);
    setInput("");
  };

  return (
    <div className="chat-box" style={{ marginTop: 24 }}>
      <h3>Chat</h3>
      <div className="chat-messages">
        {messages.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No messages yet.</p>}
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
        ))}
      </div>
      <div className="chat-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button type="button" className="btn btn-primary" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
