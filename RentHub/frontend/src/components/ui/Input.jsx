import React from "react";

const Input = ({ label, type = "text", placeholder, value, onChange, className = "", multiline = false, rows = 4, ...props }) => {
  const baseClasses = "px-4 py-2.5 rounded-lg border border-slate-200 bg-white/50 backdrop-blur-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-sm w-full font-medium shadow-sm";

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-bold text-slate-700 ml-1 tracking-tight">
          {label}
        </label>
      )}
      
      {multiline ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          className={`${baseClasses} resize-none`}
          {...props}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={baseClasses}
          {...props}
        />
      )}
    </div>
  );
};

export default Input;