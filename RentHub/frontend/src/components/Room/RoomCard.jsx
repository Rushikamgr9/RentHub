import React from "react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function RoomCard({ room, onBook, onEdit, onDelete, onViewDetails }) {
  const role = localStorage.getItem("role");

  return (
    <Card className="group">
      {/* Room Image Placeholder with Gradient Overlay */}
      <div className="relative h-48 overflow-hidden bg-slate-200">
        <img 
          src={room.image_url || `https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60`} 
          alt={room.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg backdrop-blur-md border ${
            room.status === "available" 
            ? "bg-emerald-500/80 text-white border-emerald-400/50" 
            : "bg-amber-500/80 text-white border-amber-400/50"
          }`}>
            {room.status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-900 truncate flex-1 leading-tight">{room.title}</h3>
          <div className="text-lg font-black text-indigo-600 ml-2">
            Rs {room.price}
            <span className="text-[10px] text-slate-400 font-medium block text-right mt-[-4px]">/ month</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <span className="truncate">{room.location}</span>
        </div>

        <p className="text-slate-600 text-sm line-clamp-2 mb-6 min-h-[40px]">
          {room.description || "No description provided for this room."}
        </p>

        <div className="flex gap-3 mt-auto">
          {role === "tenant" && room.status === "available" && (
            <Button 
              className="flex-1 shadow-indigo-500/20" 
              onClick={() => onBook(room.id)}
            >
              Book Now
            </Button>
          )}

          {role === "landlord" && (
            <>
              <Button 
                variant="secondary" 
                className="flex-1 py-2 text-xs"
                onClick={() => onEdit && onEdit(room)}
              >
                Edit
              </Button>
              <Button 
                variant="danger" 
                className="py-2 px-4 shadow-red-500/10"
                onClick={() => onDelete && onDelete(room.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-1.801a1.25 1.25 0 00-1.25-1.25h-2.5a1.25 1.25 0 00-1.25 1.25V3.75m7.5 0V4.5m-7.5 0V4.5" />
                </svg>
              </Button>
            </>
          )}

          {role === "tenant" && (
            <Link to={`/chat?user_id=${room.landlord_id}&user_name=${room.landlord_name}`}>
              <Button variant="ghost" className="px-3 hover:bg-slate-100 text-indigo-600" title="Message Landlord">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </Button>
            </Link>
          )}

          <Button 
            variant="ghost" 
            className="px-3 hover:bg-slate-100" 
            title="View Full Details"
            onClick={() => onViewDetails && onViewDetails(room)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Button>
        </div>
      </div>
    </Card>
  );
}
