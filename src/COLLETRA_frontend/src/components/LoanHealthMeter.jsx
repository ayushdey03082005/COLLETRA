import React from 'react';
import GlassCard from './GlassCard';

const LoanHealthMeter = ({ healthInfo }) => {
    const healthPercentage = healthInfo.value ? Math.min(Math.max((healthInfo.value / 2) * 100, 0), 100) : 0;
    
    const getHealthColor = () => {
        if (healthInfo.value >= 1.5) return 'health-safe';
        if (healthInfo.value >= 1.0) return 'health-caution';
        return 'health-risky';
    };

    return (
        <GlassCard>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Current Loan Health</h3>
            <div className="flex items-center justify-between mb-2">
                <span className={`font-bold text-xl ${healthInfo.color}`}>
                    {healthInfo.status || '...'}
                </span>
                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                    {healthInfo.value ? healthInfo.value.toFixed(2) : '...'}
                </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-4">
                <div 
                    className={`${getHealthColor()} health-meter-bar h-4 rounded-full`} 
                    style={{ width: `${healthPercentage}%` }}
                ></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 text-center">
                Thresholds: Risky &lt; 1.0, Caution &lt; 1.5, Safe ≥ 1.5
            </p>
        </GlassCard>
    );
};

export default LoanHealthMeter;