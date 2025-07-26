import React from 'react';
import { Home, FileText, ShieldCheck, Briefcase, TrendingUp, DollarSign, BarChart2, Users, LogOut } from 'lucide-react';

const navItems = {
  borrower: [
    { name: 'Home', icon: Home, page: 'borrower/dashboard' },
    { name: 'Apply', icon: FileText, page: 'borrower/apply' },
    { name: 'Health', icon: ShieldCheck, page: 'borrower/health' },
  ],
  lender: [
    { name: 'Home', icon: Home, page: 'lender/dashboard' },
    { name: 'Invest', icon: TrendingUp, page: 'lender/invest' },
    { name: 'Portfolio', icon: Briefcase, page: 'lender/portfolio' },
  ],
  admin: [
    { name: 'Overview', icon: BarChart2, page: 'admin/dashboard' },
    { name: 'Users', icon: Users, page: 'admin/users' },
    { name: 'Loans', icon: DollarSign, page: 'admin/loans' },
  ],
};

export default function MobileNav({ role, currentPage, setPage, onLogout }) {
  const currentNav = navItems[role] || [];
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl border-t border-black/5 dark:border-purple-500/20 flex justify-around p-2 text-gray-600 dark:text-gray-300">
      {currentNav.map(item => (
        <a key={item.name} href="#" onClick={e => { e.preventDefault(); setPage(item.page); }} className={`flex flex-col items-center text-xs transition-colors duration-200 ${currentPage === item.page ? 'text-purple-700 dark:text-white' : 'hover:text-gray-900 dark:hover:text-white'}`}>
          <item.icon className="h-6 w-6 mb-1" />
          <span>{item.name}</span>
        </a>
      ))}
      <button onClick={onLogout} className="flex flex-col items-center text-xs hover:text-gray-900 dark:hover:text-white">
        <LogOut className="h-6 w-6 mb-1" />
        <span>Logout</span>
      </button>
    </nav>
  );
}