import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ConversationList from "../components/chat/ConversationList";
import ChatBox from "../components/chat/ChatBox";
import Card from "../components/ui/Card";

export default function Chat() {
  const [searchParams] = useSearchParams();
  const directUserId = searchParams.get("user_id");
  const directUserName = searchParams.get("user_name");

  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/chat/conversations", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setConversations(res.data);
        
        // Handle Direct Messaging from Room Card
        if (directUserId) {
          const existing = res.data.find(c => c.id === parseInt(directUserId));
          if (existing) {
            setActiveChat(existing);
          } else if (directUserName) {
            // Add a temporary "new chat" object
            setActiveChat({ id: parseInt(directUserId), name: directUserName });
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, [token, directUserId, directUserName]);

  return (
    <div className="h-[calc(100vh-160px)] animate-in fade-in zoom-in-95 duration-700">
      <Card className="h-full flex overflow-hidden border-slate-100 shadow-2xl bg-white/40 backdrop-blur-xl">
        {/* Sidebar: Conversations */}
        <div className="w-full md:w-80 lg:w-96 border-r border-slate-100 flex flex-col bg-white">
          <div className="p-6 border-b border-slate-100 bg-slate-50/30">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Messages</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Recent Conversations</p>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <ConversationList 
              conversations={conversations} 
              activeChat={activeChat} 
              onSelect={setActiveChat}
              loading={loading}
            />
          </div>
        </div>

        {/* Main: Chat Box */}
        <div className="flex-1 hidden md:block h-full">
          <ChatBox activeChat={activeChat} />
        </div>
      </Card>
    </div>
  );
}