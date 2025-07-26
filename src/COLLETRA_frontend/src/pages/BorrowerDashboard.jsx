import React from 'react';
import LoanHealthMeter from '../components/LoanHealthMeter';
import RepaymentTimer from '../components/RepaymentTimer';
import DashboardCard from '../components/DashboardCard';
import GlassCard from '../components/GlassCard';
import NeonButton from '../components/NeonButton';
import { DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartTooltip from '../components/ChartTooltip';

const calculateLoanHealth = (loan) => {
  if (!loan) return {};
  const health = (loan.collateralValue / loan.loanAmount) * loan.riskFactor - loan.overduePenalty;
  if (health >= 1.5) return { value: health, status: 'Safe', color: 'text-green-500 dark:text-green-400' };
  if (health >= 1.0) return { value: health, status: 'Caution', color: 'text-orange-500 dark:text-orange-400' };
  return { value: health, status: 'Risky', color: 'text-red-500 dark:text-red-400' };
};

export default function BorrowerDashboard({ setPage, theme, loanData, collateralHistory }) {
  const healthInfo = calculateLoanHealth(loanData);
  const axisColor = theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#6b7280';
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  return (
    <div className="p-4 sm:p-8 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Borrower Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LoanHealthMeter healthInfo={healthInfo} />
        <RepaymentTimer dueDate={loanData?.repaymentDueDate} />
        <DashboardCard icon={DollarSign} title="Loan Amount" value={loanData ? `$${loanData.loanAmount.toLocaleString()}`: '...'} subtext="Principal"/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Collateral Value</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={collateralHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" stroke={axisColor} />
              <YAxis stroke={axisColor} domain={['dataMin - 1000', 'dataMax + 1000']}/>
              <Tooltip content={<ChartTooltip theme={theme} />} />
              <Legend wrapperStyle={{color: axisColor}}/>
              <Line type="monotone" dataKey="value" name="Value ($)" stroke="#38bdf8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard className="flex flex-col justify-center items-center text-center">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Need another loan?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Apply for a new loan with your updated collateral.</p>
          <NeonButton onClick={() => setPage('borrower/apply')}>Apply for New Loan</NeonButton>
        </GlassCard>
      </div>
    </div>
  );
}