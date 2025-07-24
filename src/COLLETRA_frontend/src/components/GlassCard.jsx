import React from 'react';

const GlassCard = ({ children, className = '' }) => (
  <div className={`glass-card dashboard-card p-6 ${className}`}>
    {children}
  </div>
);

export default GlassCard;