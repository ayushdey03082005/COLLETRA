import React from 'react';

const ChartTooltip = ({ active, payload, label, theme }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 text-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                <p className="label text-gray-700 dark:text-gray-300">{`${label}`}</p>
                {payload.map((pld, index) => (
                    <p key={index} style={{ color: pld.color }}>
                        {`${pld.name}: ${pld.value.toLocaleString()}`}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default ChartTooltip;