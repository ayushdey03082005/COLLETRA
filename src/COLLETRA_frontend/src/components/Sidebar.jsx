import React from 'react';
import { Home, FileText, ShieldCheck, Briefcase, TrendingUp, DollarSign, BarChart2, Users, Wallet, User, Settings, LogOut, Sun, Moon } from 'lucide-react';

const navItems = {
  borrower: [
    { name: 'Home', icon: Home, page: 'borrower/dashboard' },
    { name: 'Apply', icon: FileText, page: 'borrower/apply' },
    { name: 'Loan Health', icon: ShieldCheck, page: 'borrower/health' },
    { name: 'History', icon: Briefcase, page: 'profile' },
  ],
  lender: [
    { name: 'Home', icon: Home, page: 'lender/dashboard' },
    { name: 'Invest', icon: TrendingUp, page: 'lender/invest' },
    { name: 'Portfolio', icon: Briefcase, page: 'lender/portfolio' },
    { name: 'Profile', icon: User, page: 'profile' },
  ],
  admin: [
    { name: 'Overview', icon: BarChart2, page: 'admin/dashboard' },
    { name: 'Users', icon: Users, page: 'admin/users' },
    { name: 'Loans', icon: DollarSign, page: 'admin/loans' },
    { name: 'Wallets', icon: Wallet, page: 'admin/wallets' },
  ],
};

export default function Sidebar({ role, currentPage, setPage, onLogout, theme, toggleTheme }) {
  const currentNav = navItems[role] || [];
  return (
    <aside className="w-64 bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl border-r border-black/5 dark:border-purple-500/20 flex-col p-4 text-gray-600 dark:text-gray-300 transition-colors duration-300 hidden md:flex">
      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-10 px-2">
        Collatera
      </div>
      <nav className="flex-grow">
        <ul>
          {currentNav.map(item => (
            <li key={item.name}>
              <a href="#" onClick={e => { e.preventDefault(); setPage(item.page); }}
                className={`flex items-center px-4 py-3 my-1 rounded-lg transition-all duration-200 ${currentPage === item.page ? 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-white shadow-inner' : 'hover:bg-gray-200/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'}`}>
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <button onClick={toggleTheme} className="flex items-center w-full px-4 py-3 my-1 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white transition-all duration-200">
          {theme === 'dark' ? <Sun className="h-5 w-5 mr-3" /> : <Moon className="h-5 w-5 mr-3" />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <a href="#" onClick={e => { e.preventDefault(); setPage('profile'); }} className="flex items-center w-full px-4 py-3 my-1 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white transition-all duration-200">
          <Settings className="h-5 w-5 mr-3" />
          <span>Settings</span>
        </a>
        <a href="#" onClick={onLogout} className="flex items-center w-full px-4 py-3 my-1 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white transition-all duration-200">
          <LogOut className="h-5 w-5 mr-3" />
          <span>Logout</span>
        </a>
      </div>
    </aside>
  );
}