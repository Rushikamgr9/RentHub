import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Button from "../ui/Button";

const socket = io("http://localhost:5000");

export default function ChatBox({ activeChat }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);
  const token = localStorage.getItem("token");
  const myId = JSON.parse(atob(token.split('.')[1])).id; // Simple JWT decode

  // Join private room
  useEffect(() => {
    socket.emit("join", myId);
  }, [myId]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch History
  useEffect(() => {
    if (activeChat) {
      axios.get(`http://localhost:5000/api/chat/messages?other_user_id=${activeChat.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setChat(res.data);
        // Sync active calls
        socket.emit("check_active_calls", (activeChatIds) => {
          setChat(prev => prev.map(m => {
            if (m.type === 'call' && !activeChatIds.includes(m.id)) {
              // If it's a call invite but not in activeCalls, it should be ended
              // (unless it's brand new - grace period of 30 seconds)
              const age = Date.now() - new Date(m.created_at).getTime();
              return age > 30000 ? { ...m, type: 'call_ended' } : m;
            }
            return m;
          }));
        });
      })
      .catch(err => console.error(err));
    }
  }, [activeChat, token]);

  // Socket Listener
  useEffect(() => {
    socket.on("receive_message", (data) => {
      // Only add message if it belongs to current active chat
      if (activeChat && (data.sender_id === activeChat.id || data.receiver_id === activeChat.id)) {
        setChat((prev) => [...prev, data]);
      }
    });

    socket.on("call_status_update", ({ chatId, status }) => {
      setChat((prev) => prev.map(m => m.id === chatId ? { ...m, type: status } : m));
    });

    return () => {
      socket.off("receive_message");
      socket.off("call_status_update");
    };
  }, [activeChat]);

  useEffect(scrollToBottom, [chat]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "" || !activeChat) return;
    
    const msgData = {
      sender_id: myId,
      receiver_id: activeChat.id,
      message: message,
      created_at: new Date().toISOString()
    };

    try {
      // 1. Send to server (Persistence)
      await axios.post("http://localhost:5000/api/chat/send", msgData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 2. Emit to Socket (Real-time)
      socket.emit("send_message", msgData);

      // 3. Update Local UI (Instant)
      setChat((prev) => [...prev, msgData]);
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    }
  };

  if (!activeChat) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-10 bg-slate-50/10">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-200 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        </div>
        <h4 className="text-xl font-extrabold text-slate-900 mb-2">Select a Conversation</h4>
        <p className="text-slate-500 text-sm max-w-xs mx-auto font-medium lowercase first-letter:uppercase">Choose a person from the sidebar to see your full message history and start chatting.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Chat Header */}
      <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-white/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-600/20">
            {activeChat.name?.charAt(0) || "U"}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{activeChat.name}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Now</span>
            </div>
          </div>
        </div>

        {/* Video Call Button */}
        <button 
          onClick={async () => {
            const roomId = "chat_" + [myId, activeChat.id].sort((a,b) => a-b).join("_");
            try {
              // Send invitation message
              const token = localStorage.getItem("token");
              const res = await axios.post("http://localhost:5000/api/chat/send", {
                receiver_id: activeChat.id,
                message: "Incoming Video Call...",
                type: "call"
              }, {
                headers: { Authorization: `Bearer ${token}` }
              });

              // Emit via socket for real-time invitation
              if (socket) {
                socket.emit("send_message", {
                  sender_id: myId,
                  receiver_id: activeChat.id,
                  message: "Incoming Video Call...",
                  type: "call",
                  id: res.data.chatId,
                  created_at: new Date().toISOString()
                });
              }

              // Small delay to ensure socket event is sent before navigation
              setTimeout(() => {
                window.location.href = `/video-call/${roomId}?chatId=${res.data.chatId}&recipientId=${activeChat.id}`;
              }, 600);
            } catch (err) {
              console.error("Error starting call:", err);
            }
          }}
          className="p-3 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm active:scale-95"
          title="Start Video Call"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-slate-50/30">
        {chat.length === 0 && (
          <div className="text-center py-20 opacity-40 italic text-slate-400 text-sm">
            Say hello to {activeChat.name}...
          </div>
        )}
        
        {chat.map((m, i) => {
          const isMe = m.sender_id === myId;
          return (
            <div key={i} className={`flex ${isMe ? "justify-end text-right" : "justify-start text-left"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[80%] group`}>
                <div className={`px-5 py-3.5 rounded-2xl shadow-sm relative ${
                  isMe 
                  ? "bg-indigo-600 text-white rounded-tr-sm" 
                  : "bg-white border border-slate-100 text-slate-700 rounded-tl-sm shadow-indigo-500/5"
                }`}>
                  {m.type === 'call' ? (
                    <div className="flex flex-col gap-3 min-w-[180px]">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-inner ${isMe ? 'bg-indigo-500' : 'bg-indigo-50'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-4 h-4 ${isMe ? 'text-white' : 'text-indigo-600'}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                          </svg>
                        </div>
                        <span className="text-sm font-bold tracking-tight">
                          {m.message}
                        </span>
                      </div>
                      <button 
                        onClick={() => {
                          const roomId = "chat_" + [myId, activeChat.id].sort((a,b) => a-b).join("_");
                          window.location.href = `/video-call/${roomId}?chatId=${m.id}&recipientId=${m.sender_id === myId ? m.receiver_id : m.sender_id}`;
                        }}
                        className={`w-full py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${
                          isMe 
                          ? 'bg-white text-indigo-600 hover:bg-indigo-50' 
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        Join Call
                      </button>
                    </div>
                  ) : m.type === 'call_ended' ? (
                    <div className="flex flex-col gap-2 min-w-[180px] opacity-60">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isMe ? 'bg-indigo-500' : 'bg-slate-100'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-4 h-4 ${isMe ? 'text-white' : 'text-slate-400'}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                          </svg>
                        </div>
                        <span className="text-sm font-bold tracking-tight">
                          Call has been ended
                        </span>
                      </div>
                      <div className={`text-[10px] uppercase tracking-tighter text-center font-bold px-2 py-1 rounded bg-slate-100/50 ${isMe ? 'text-white/70' : 'text-slate-400'}`}>
                        Session Expired
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm font-medium leading-relaxed">{m.message}</p>
                  )}
                </div>
                <div className={`text-[9px] mt-2 font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity text-slate-400`}>
                  {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-8 border-t border-slate-100 bg-white">
        <form onSubmit={sendMessage} className="flex gap-4">
          <input 
            className="flex-1 px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 transition-all text-sm font-medium text-slate-700 placeholder:text-slate-300" 
            value={message} 
            onChange={e => setMessage(e.target.value)} 
            placeholder={`Message ${activeChat.name}...`}
          />
          <Button 
            type="submit" 
            className="px-8 h-[50px] rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/10 active:scale-95 transition-transform"
          >
            <span className="font-bold">Send</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </Button>
        </form>
      </div>
    </div>
  );
}