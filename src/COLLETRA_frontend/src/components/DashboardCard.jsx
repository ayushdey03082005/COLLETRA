import React from 'react';

export default function DashboardCard({ icon, title, value, subtext, colorClass = 'text-cyan-500 dark:text-cyan-400' }) {
  const Icon = icon;
  return (
    <div className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-lg border border-purple-500/20 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-purple-500/10 p-6 flex items-center">
      <div className={`p-3 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg mr-4 ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
        {subtext && <p className="text-xs text-gray-400 dark:text-gray-500">{subtext}</p>}
      </div>
    </div>
  );
}