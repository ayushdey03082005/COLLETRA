import React from 'react';
import GlassCard from './GlassCard';

const DashboardCard = ({ icon, title, value, subtext, colorClass = 'text-cyan-500 dark:text-cyan-400' }) => {
    const Icon = icon;
    
    return (
        <GlassCard>
            <div className="flex items-center">
                <div className={`p-3 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg mr-4 ${colorClass}`}>
                    <Icon size={24} />
                </div>
                <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
                    {subtext && <p className="text-xs text-gray-400 dark:text-gray-500">{subtext}</p>}
                </div>
            </div>
        </GlassCard>
    );
};

export default DashboardCard;