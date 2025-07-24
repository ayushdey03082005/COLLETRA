import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import ChartTooltip from '../components/ChartTooltip';

// Utility function to calculate loan health
const calculateLoanHealth = (loan) => {
    if (!loan) return {};
    const health = (loan.collateralValue / loan.loanAmount) * loan.riskFactor - loan.overduePenalty;
    if (health >= 1.5) return { value: health, status: 'Safe', color: 'text-green-500 dark:text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-500' };
    if (health >= 1.0) return { value: health, status: 'Caution', color: 'text-orange-500 dark:text-orange-400', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500' };
    return { value: health, status: 'Risky', color: 'text-red-500 dark:text-red-400', bgColor: 'bg-red-500/10', borderColor: 'border-red-500' };
};

const LoanHealthPage = ({ theme, loanData }) => {
    const healthInfo = calculateLoanHealth(loanData);
    
    const healthHistory = [ 
        { name: 'Day 1', health: 1.9 }, 
        { name: 'Day 5', health: 1.95 }, 
        { name: 'Day 10', health: 1.85 }, 
        { name: 'Day 15', health: 1.82 }, 
        { name: 'Day 20', health: 1.78 }, 
        { name: 'Today', health: healthInfo.value }, 
    ];
    
    const healthIcon = useMemo(() => {
        if (!healthInfo.status) return null;
        if (healthInfo.status === 'Safe') return <ShieldCheck className="h-16 w-16 text-green-500 dark:text-green-400" />;
        if (healthInfo.status === 'Caution') return <ShieldAlert className="h-16 w-16 text-orange-500 dark:text-orange-400" />;
        return <ShieldX className="h-16 w-16 text-red-500 dark:text-red-400" />;
    }, [healthInfo.status]);
    
    const axisColor = theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#6b7280';
    const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    
    return (
        <div className="p-4 sm:p-8 space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Loan Health Tracker</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <GlassCard className="lg:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Health Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={healthHistory}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                            <XAxis dataKey="name" stroke={axisColor} />
                            <YAxis domain={[0.5, 2.5]} stroke={axisColor} />
                            <Tooltip content={<ChartTooltip theme={theme} />} />
                            <Legend wrapperStyle={{color: axisColor}}/>
                            <Line type="monotone" dataKey="health" stroke="#a78bfa" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </GlassCard>
                <GlassCard className="flex flex-col items-center justify-center text-center">
                    {healthIcon}
                    <h3 className={`text-4xl font-bold mt-4 ${healthInfo.color}`}>{healthInfo.status || '...'}</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">Current Health: {healthInfo.value ? healthInfo.value.toFixed(2) : '...'}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">Keep collateral value high to maintain a safe loan status.</p>
                </GlassCard>
            </div>
            <GlassCard>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Repayment Planner</h3>
                <p className="text-gray-600 dark:text-gray-400">
                    Your next repayment is due on <span className="text-cyan-500 dark:text-cyan-400">
                        {loanData ? new Date(loanData.repaymentDueDate).toLocaleDateString() : '...'}
                    </span>. Consider adding more collateral or making an early payment to improve your loan health.
                </p>
                <div className="mt-4 space-x-4">
                    <button className="text-sm bg-green-500/20 text-green-600 dark:text-green-300 px-4 py-2 rounded-md hover:bg-green-500/30 dark:hover:bg-green-500/40 transition-colors">
                        Make Payment
                    </button>
                    <button className="text-sm bg-blue-500/20 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-md hover:bg-blue-500/30 dark:hover:bg-blue-500/40 transition-colors">
                        Add Collateral
                    </button>
                </div>
            </GlassCard>
        </div>
    );
};

export default LoanHealthPage;