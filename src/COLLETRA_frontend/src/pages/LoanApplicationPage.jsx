import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import NeonButton from '../components/NeonButton';
import { ShieldCheck, Wallet } from 'lucide-react';

export default function LoanApplicationPage({ setPage }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setPage('borrower/dashboard');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="p-8 flex flex-col items-center justify-center h-full text-center">
        <ShieldCheck className="text-green-500 dark:text-green-400 h-24 w-24 mb-4 animate-pulse" />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Application Submitted!</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Your loan request is now being processed. Redirecting to dashboard...</p>
      </div>
    );
  }
  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Loan Application</h2>
      <GlassCard className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Loan Amount ($)</label>
            <input type="number" id="amount" placeholder="e.g., 10000" className="w-full bg-gray-200/50 dark:bg-gray-800/50 border border-gray-300 dark:border-purple-500/30 rounded-lg px-4 py-2 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400" />
          </div>
          <div>
            <label htmlFor="collateral" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Collateral Type</label>
            <select id="collateral" className="w-full bg-gray-200/50 dark:bg-gray-800/50 border border-gray-300 dark:border-purple-500/30 rounded-lg px-4 py-2 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400">
              <option>ICP</option>
              <option>BTC</option>
              <option>ETH</option>
            </select>
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Repayment Duration (days)</label>
            <input type="number" id="duration" placeholder="e.g., 30" className="w-full bg-gray-200/50 dark:bg-gray-800/50 border border-gray-300 dark:border-purple-500/30 rounded-lg px-4 py-2 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Wallet Verification</label>
            <div className="flex items-center p-3 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg">
              <Wallet className="h-5 w-5 text-cyan-500 dark:text-cyan-400 mr-3"/>
              <span className="text-green-600 dark:text-green-400 font-mono text-sm">Wallet Connected: 0x...aBcDeF</span>
            </div>
          </div>
          <div className="text-center pt-4">
            <NeonButton type="submit" className="w-full md:w-auto">Submit Application</NeonButton>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}