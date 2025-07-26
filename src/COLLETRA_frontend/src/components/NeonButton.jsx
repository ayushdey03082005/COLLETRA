import React from 'react';

export default function NeonButton({ children, onClick, className = '', disabled = false, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 font-bold text-white rounded-lg shadow-[0_0_10px_rgba(72,187,255,0.5),inset_0_0_5px_rgba(72,187,255,0.4)] border border-cyan-400 bg-cyan-500/20 backdrop-blur-sm hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(72,187,255,0.8)] transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 ${className}`}
    >
      {children}
    </button>
  );
}