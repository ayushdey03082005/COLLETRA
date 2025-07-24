import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Briefcase, DollarSign, ShieldAlert } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import DashboardCard from '../components/DashboardCard';
import ChartTooltip from '../components/ChartTooltip';

const AdminDashboard = ({ theme, adminData }) => {
    const statsData = [ 
        { name: 'Jan', loans: 40, volume: 240000 }, 
        { name: 'Feb', loans: 30, volume: 139800 }, 
        { name: 'Mar', loans: 120, volume: 980000 }, 
        { name: 'Apr', loans: 80, volume: 390800 }, 
        { name: 'May', loans: 152, volume: 1250000 }, 
    ];
    
    const axisColor = theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#6b7280';
    const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    
    return (
        <div className="p-4 sm:p-8 space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard icon={Briefcase} title="Total Active Loans" value={adminData?.totalActiveLoans || '...'} />
                <DashboardCard icon={DollarSign} title="Total Liquidity" value={adminData ? `$${adminData.liquidityPool.toLocaleString()}`: '...'} />
                <DashboardCard icon={ShieldAlert} title="Flagged Accounts" value={adminData?.flaggedAccounts || '...'} colorClass="text-red-500 dark:text-red-400" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <GlassCard className="lg:col-span-3">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Platform Growth</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={statsData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                            <XAxis dataKey="name" stroke={axisColor} />
                            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                            <Tooltip content={<ChartTooltip theme={theme} />} />
                            <Legend wrapperStyle={{color: axisColor}}/>
                            <Bar yAxisId="left" dataKey="volume" fill="#8884d8" name="Volume ($)" />
                            <Bar yAxisId="right" dataKey="loans" fill="#82ca9d" name="Active Loans" />
                        </BarChart>
                    </ResponsiveContainer>
                </GlassCard>
                <GlassCard className="lg:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">User Management</h3>
                     <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-purple-500/20">
                                    <th className="p-2 font-semibold text-gray-500 dark:text-gray-400">Role</th>
                                    <th className="p-2 font-semibold text-gray-500 dark:text-gray-400">Status</th>
                                    <th className="p-2 font-semibold text-gray-500 dark:text-gray-400">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminData?.users.map(user => (
                                    <tr key={user.id} className="border-b border-gray-200 dark:border-gray-800">
                                        <td className="p-2 text-gray-800 dark:text-white">{user.role}</td>
                                        <td className={`p-2 font-semibold ${user.status === 'Active' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{user.status}</td>
                                        <td className="p-2"><button className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-gray-700 dark:text-gray-300">View</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default AdminDashboard;