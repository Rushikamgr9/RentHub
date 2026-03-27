import React from "react";

const Select = ({ label, options, value, onChange, placeholder = "Select an option", className = "", ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-bold text-slate-700 ml-1 tracking-tight">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white/50 backdrop-blur-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-sm w-full font-medium shadow-sm appearance-none cursor-pointer hover:bg-white/80"
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={typeof option === 'string' ? option : option.value}>
            {typeof option === 'string' ? option : option.label}
          </option>
        ))}
      </select>
      
      {/* Custom Chevron icon */}
      <div className="relative -mt-8 mr-4 pointer-events-none self-end scale-75 opacity-40">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
  );
};

export default Select;