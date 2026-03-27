import React from "react";
import Card from "../ui/Card";

export default function ConversationList({ conversations, activeChat, onSelect, loading }) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center gap-3 p-4 animate-pulse">
            <div className="w-12 h-12 bg-slate-200 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-slate-200 rounded w-1/2" />
              <div className="h-2 bg-slate-100 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-400 text-sm font-medium">No conversations yet.</p>
        <p className="text-slate-500 text-[10px] mt-1 font-bold uppercase tracking-widest">Start a chat from a property listing</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-50">
      {conversations.map((conv) => (
        <div
          key={conv.id}
          onClick={() => onSelect(conv)}
          className={`flex items-center gap-4 p-4 cursor-pointer transition-all duration-200 hover:bg-slate-50 border-l-4 ${
            activeChat?.id === conv.id 
            ? "border-indigo-600 bg-indigo-50/30" 
            : "border-transparent"
          }`}
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold overflow-hidden shadow-sm">
              {conv.name?.charAt(0) || "?"}
            </div>
            {/* Online Indicator Placeholder */}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline mb-0.5">
              <h4 className="text-sm font-bold text-slate-900 truncate">{conv.name}</h4>
              <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap ml-2">
                {conv.last_message_time ? new Date(conv.last_message_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
              </span>
            </div>
            <p className={`text-xs truncate font-medium ${conv.unread ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>
                  {conv.last_message_type === 'call' ? '📹 Video Call' : 
                   conv.last_message_type === 'call_ended' ? '📹 Call Ended' : 
                   conv.last_message}
                </p>
          </div>
        </div>
      ))}
    </div>
  );
}