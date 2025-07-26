import React from 'react';

export default function LoanHealthMeter({ healthInfo }) {
  const healthPercentage = healthInfo.value ? Math.min(Math.max((healthInfo.value / 2) * 100, 0), 100) : 0;
  const healthColor = healthInfo.value >= 1.5 ? 'bg-green-500' : healthInfo.value >= 1.0 ? 'bg-orange-500' : 'bg-red-500';
  return (
    <div className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-lg border border-purple-500/20 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-purple-500/10 p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Current Loan Health</h3>
      <div className="flex items-center justify-between mb-2">
        <span className={`font-bold text-xl ${healthInfo.color}`}>{healthInfo.status || '...'}</span>
        <span className="text-2xl font-bold text-gray-800 dark:text-white">{healthInfo.value ? healthInfo.value.toFixed(2) : '...'}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-4">
        <div className={`${healthColor} h-4 rounded-full transition-all duration-500`} style={{ width: `${healthPercentage}%` }}></div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 text-center">Thresholds: Risky &lt; 1.0, Caution &lt; 1.5, Safe ≥ 1.5</p>
    </div>
  );
}