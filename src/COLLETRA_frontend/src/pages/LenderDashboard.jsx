import React from 'react';
import DashboardCard from '../components/DashboardCard';
import GlassCard from '../components/GlassCard';
import { Briefcase, DollarSign, TrendingUp, BarChart2 } from 'lucide-react';

export default function LenderDashboard({ setPage, lenderData }) {
  return (
    <div className="p-4 sm:p-8 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Lender Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard icon={Briefcase} title="Active Loans" value={lenderData?.activeLoansGiven || '...'} />
        <DashboardCard icon={DollarSign} title="Total Invested" value={lenderData ? `$${lenderData.totalInvested.toLocaleString()}` : '...'} />
        <DashboardCard icon={TrendingUp} title="Average ROI" value={lenderData ? `${lenderData.avgROI}%` : '...'} />
        <DashboardCard icon={BarChart2} title="Total Earnings" value={lenderData ? `$${lenderData.earnings.toLocaleString()}` : '...'} colorClass="text-green-500 dark:text-green-400"/>
      </div>
      <GlassCard>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Lending Opportunities</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-purple-500/20">
                <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Amount</th>
                <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Collateral</th>
                <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Health</th>
                <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {lenderData?.lendingOpportunities.map(opp => (
                <tr key={opp.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50">
                  <td className="p-3 text-gray-800 dark:text-white">${opp.amount.toLocaleString()}</td>
                  <td className="p-3 text-gray-800 dark:text-white">{opp.collateral}</td>
                  <td className="p-3 text-green-600 dark:text-green-400">{opp.health.toFixed(1)}</td>
                  <td className="p-3"><button className="text-xs bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 px-3 py-1 rounded-md hover:bg-cyan-500/30 dark:hover:bg-cyan-500/40 transition-colors">Lend Now</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}