import React from 'react';

const NeonButton = ({ children, onClick, className = '', disabled = false, type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`neon-button px-6 py-3 font-bold text-white rounded-lg transform transition-all duration-300 ease-in-out ${className}`}
  >
    {children}
  </button>
);

export default NeonButton;