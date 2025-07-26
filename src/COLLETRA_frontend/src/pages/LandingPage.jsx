import React, { useState } from 'react';
import NeonButton from '../components/NeonButton';
import GlassCard from '../components/GlassCard';
import { User, Wallet, Loader2, Github } from 'lucide-react';

export default function LandingPage({ onConnectWallet }) {
  const [isLoading, setIsLoading] = useState(null);

  const handleConnect = async (walletType) => {
    setIsLoading(walletType);
    try {
      await onConnectWallet(walletType === 'ii' ? 'ii' : 'plug');
    } catch (error) {
      console.error("Connection failed:", error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-4 transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(167,139,250,0.05)_0%,_transparent_50%)] dark:bg-[radial-gradient(circle_at_center,_rgba(167,139,250,0.1)_0%,_transparent_50%)]"></div>
      <header className="text-center z-10 mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-purple-600 dark:text-purple-400 drop-shadow-[0_0_10px_rgba(167,139,250,0.3)]">
          Collatera
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">Transparent DeFi Lending on ICP</p>
      </header>
      <main className="z-10">
        <GlassCard className="text-center w-full max-w-md animate-fade-in">
          <h2 className="text-2xl font-light text-gray-600 dark:text-gray-200 mb-8">Connect your wallet to continue</h2>
          <div className="space-y-4">
            <NeonButton onClick={() => handleConnect('ii')} disabled={!!isLoading} className="w-full flex items-center justify-center">
              {isLoading === 'ii' ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <User className="mr-2 h-5 w-5" />}
              {isLoading === 'ii' ? 'Connecting...' : 'Connect with Internet Identity'}
            </NeonButton>
            <NeonButton onClick={() => handleConnect('plug')} disabled={!!isLoading} className="w-full flex items-center justify-center">
              {isLoading === 'plug' ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wallet className="mr-2 h-5 w-5" />}
              {isLoading === 'plug' ? 'Connecting...' : 'Connect with Plug Wallet'}
            </NeonButton>
          </div>
        </GlassCard>
      </main>
      <footer className="absolute bottom-6 text-center text-gray-500 dark:text-gray-400 z-10 space-x-4">
        <a href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300 flex items-center justify-center gap-2"><Github size={16}/> GitHub</a>
      </footer>
    </div>
  );
}