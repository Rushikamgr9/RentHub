import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl shadow-indigo-500/10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;