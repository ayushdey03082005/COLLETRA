import React from 'react';
import NeonButton from '../components/NeonButton';
import GlassCard from '../components/GlassCard';
import { TrendingUp, DollarSign, User } from 'lucide-react';

export default function RoleSelectionPage({ onLogin }) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-4 transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(167,139,250,0.05)_0%,_transparent_50%)] dark:bg-[radial-gradient(circle_at_center,_rgba(167,139,250,0.1)_0%,_transparent_50%)]"></div>
      <header className="text-center z-10 mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-purple-600 dark:text-purple-400 drop-shadow-[0_0_10px_rgba(167,139,250,0.3)]">
          Select Your Role
        </h1>
      </header>
      <main className="z-10">
        <GlassCard className="text-center w-full max-w-md animate-fade-in">
          <h2 className="text-2xl font-light text-gray-600 dark:text-gray-200 mb-8">How would you like to proceed?</h2>
          <div className="space-y-4">
            <NeonButton onClick={() => onLogin('borrower')} className="w-full flex items-center justify-center">
              <TrendingUp className="mr-2 h-5 w-5" /> Continue as Borrower
            </NeonButton>
            <NeonButton onClick={() => onLogin('lender')} className="w-full flex items-center justify-center">
              <DollarSign className="mr-2 h-5 w-5" /> Continue as Lender
            </NeonButton>
            <NeonButton onClick={() => onLogin('admin')} className="w-full flex items-center justify-center">
              <User className="mr-2 h-5 w-5" /> Continue as Admin
            </NeonButton>
          </div>
        </GlassCard>
      </main>
    </div>
  );
}