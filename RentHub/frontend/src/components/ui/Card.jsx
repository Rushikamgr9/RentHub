import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default Card;