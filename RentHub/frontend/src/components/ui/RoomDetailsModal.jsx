import React from "react";
import { Link } from "react-router-dom";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import MapComponent from "./ui/MapComponent";

export default function RoomDetailsModal({ isOpen, onClose, room, onBook }) {
  if (!room) return null;

  const role = localStorage.getItem("role");

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Property Details">
      <div className="space-y-8">
        {/* Section 1: Room Details */}
        <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Room Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-tight mb-1">Title & Type</p>
              <p className="text-slate-900 font-bold text-lg">{room.title}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-tight mb-1">Monthly Rent</p>
              <p className="text-indigo-600 font-black text-xl">Rs {room.price}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-tight mb-1">Location</p>
              <p className="text-slate-700 font-medium">{room.location}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-tight mb-1">Description</p>
              <p className="text-slate-600 text-sm leading-relaxed bg-white p-4 rounded-xl border border-slate-100 italic">
                "{room.description || "No specific description provided by the landlord."}"
              </p>
            </div>
          </div>
        </div>

        {/* Section: Map Location */}
        {room.latitude && room.longitude && (
          <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-10.5v.114c0 .113-.032.224-.103.306L8.35 14.28a.434.434 0 0 1-.644-.01l-1.99-2.31c-.08-.093-.116-.215-.116-.34V6.75M9 6.75h6" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Property Location</h3>
            </div>
            <MapComponent lat={room.latitude} lng={room.longitude} zoom={15} />
          </div>
        )}

        {/* Section 2: Owner Details */}
        <div className="bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100/50 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Owner / Landlord Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                 {room.landlord_name?.charAt(0) || "L"}
               </div>
               <div>
                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-tight mb-1">Full Name</p>
                 <p className="text-slate-900 font-bold">{room.landlord_name || "Landlord Identity Hidden"}</p>
               </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-tight mb-1">Email Address</p>
              <p className="text-slate-700 font-medium">{room.landlord_email || "Not Provided"}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-tight mb-1">Permanent Address</p>
              <p className="text-slate-700 font-medium">{room.landlord_address || "Address Hidden"}</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-4 pt-4">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Close
          </Button>
          {role === "tenant" && room.status === "available" && (
            <>
              <Link to={`/chat?user_id=${room.landlord_id}&user_name=${room.landlord_name}`} className="flex-1">
                <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                  Message
                </Button>
              </Link>
              <Button className="flex-[2] shadow-indigo-500/20" onClick={() => {onBook(room.id); onClose();}}>
                Proceed to Booking
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
