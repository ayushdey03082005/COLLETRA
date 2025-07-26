import React from 'react';

export default function GlassCard({ children, className = '' }) {
  return (
    <div className={`bg-white/60 dark:bg-gray-900/50 backdrop-blur-lg border border-purple-500/20 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-purple-500/10 p-6 ${className}`}>
      {children}
    </div>
  );
}