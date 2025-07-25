// // import React, { useState, useEffect, useMemo } from 'react';
// // import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
// // import { ShieldCheck, ShieldAlert, ShieldX, DollarSign, Clock, BarChart2, Users, Settings, LogOut, Github, Video, Home, FileText, Briefcase, TrendingUp, User, Wallet, Bell, Sun, Moon, Loader2 } from 'lucide-react';

// // // --- MOCK DATA (Initial State) --- //
// // const initialMockLoanData = {
// //   loanAmount: 10000,
// //   collateralValue: 18000,
// //   repaymentDueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 days from now
// //   paymentHistory: 'good',
// //   riskFactor: 1.1,
// //   overduePenalty: 0,
// // };

// // const initialCollateralHistory = [
// //   { name: '30d ago', value: 16000 },
// //   { name: '20d ago', value: 17500 },
// //   { name: '10d ago', value: 17000 },
// //   { name: 'Now', value: 18000 },
// // ];

// // const calculateLoanHealth = (loan) => {
// //   if (!loan) return {};
// //   const health = (loan.collateralValue / loan.loanAmount) * loan.riskFactor - loan.overduePenalty;
// //   if (health >= 1.5) return { value: health, status: 'Safe', color: 'text-green-500 dark:text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-500' };
// //   if (health >= 1.0) return { value: health, status: 'Caution', color: 'text-orange-500 dark:text-orange-400', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500' };
// //   return { value: health, status: 'Risky', color: 'text-red-500 dark:text-red-400', bgColor: 'bg-red-500/10', borderColor: 'border-red-500' };
// // };

// // const lenderData = {
// //   activeLoansGiven: 5,
// //   totalInvested: 50000,
// //   avgROI: 8.5,
// //   earnings: 4250,
// //   lendingOpportunities: [
// //     { id: 1, amount: 5000, collateral: 'BTC', health: 1.8 },
// //     { id: 2, amount: 12000, collateral: 'ETH', health: 1.6 },
// //     { id: 3, amount: 7500, collateral: 'ICP', health: 2.1 },
// //   ],
// // };

// // const adminData = {
// //     totalActiveLoans: 152,
// //     liquidityPool: 1250000,
// //     flaggedAccounts: 3,
// //     users: [
// //         { id: 'u001', role: 'Borrower', joined: '2023-10-01', status: 'Active' },
// //         { id: 'u002', role: 'Lender', joined: '2023-09-15', status: 'Active' },
// //         { id: 'u003', role: 'Borrower', joined: '2023-11-05', status: 'Flagged' },
// //         { id: 'u004', role: 'Lender', joined: '2023-08-22', status: 'Inactive' },
// //     ]
// // };

// // const transactionHistory = [
// //     { id: 't001', action: 'Loan Requested', amount: 10000, date: '2024-07-20', status: 'Pending' },
// //     { id: 't002', action: 'Loan Funded', amount: 8000, date: '2024-07-18', status: 'Complete' },
// //     { id: 't003', action: 'Repayment', amount: 500, date: '2024-07-15', status: 'Complete' },
// //     { id: 't004', action: 'Collateral Sold', amount: 12000, date: '2024-07-12', status: 'Liquidated' },
// // ];


// // // --- UI COMPONENTS --- //

// // const NeonButton = ({ children, onClick, className = '', disabled = false }) => (
// //   <button
// //     onClick={onClick}
// //     disabled={disabled}
// //     className={`px-6 py-3 font-bold text-white rounded-lg shadow-[0_0_10px_rgba(72,187,255,0.5),inset_0_0_5px_rgba(72,187,255,0.4)] border border-cyan-400 bg-cyan-500/20 backdrop-blur-sm hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(72,187,255,0.8)] transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 ${className}`}
// //   >
// //     {children}
// //   </button>
// // );

// // const GlassCard = ({ children, className = '' }) => (
// //   <div className={`bg-white/60 dark:bg-gray-900/50 backdrop-blur-lg border border-purple-500/20 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-purple-500/10 p-6 ${className}`}>
// //     {children}
// //   </div>
// // );

// // const LandingPage = ({ onConnectWallet }) => {
// //     const [isLoading, setIsLoading] = useState(false);

// //     const handleConnect = () => {
// //         setIsLoading(true);
// //         // Simulate API call
// //         setTimeout(() => {
// //             onConnectWallet();
// //             setIsLoading(false);
// //         }, 1500);
// //     };

// //     return (
// //         <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-4 transition-colors duration-300">
// //             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(167,139,250,0.05)_0%,_transparent_50%)] dark:bg-[radial-gradient(circle_at_center,_rgba(167,139,250,0.1)_0%,_transparent_50%)]"></div>
// //             <header className="text-center z-10 mb-12">
// //                 <h1 className="text-5xl md:text-6xl font-bold text-purple-600 dark:text-purple-400 drop-shadow-[0_0_10px_rgba(167,139,250,0.3)]">
// //                     Collatera
// //                 </h1>
// //                 <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">Transparent DeFi Lending on ICP</p>
// //             </header>
// //             <main className="z-10">
// //                 <GlassCard className="text-center w-full max-w-md animate-fade-in">
// //                      <h2 className="text-2xl font-light text-gray-600 dark:text-gray-200 mb-8">Connect your wallet to continue</h2>
// //                     <div className="space-y-4">
// //                         <NeonButton onClick={handleConnect} disabled={isLoading} className="w-full flex items-center justify-center">
// //                             {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <User className="mr-2 h-5 w-5" />}
// //                             {isLoading ? 'Connecting...' : 'Connect with Internet Identity'}
// //                         </NeonButton>
// //                         <NeonButton onClick={handleConnect} disabled={isLoading} className="w-full flex items-center justify-center">
// //                              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wallet className="mr-2 h-5 w-5" />}
// //                              {isLoading ? 'Connecting...' : 'Connect with Plug Wallet'}
// //                         </NeonButton>
// //                     </div>
// //                 </GlassCard>
// //             </main>
// //             <footer className="absolute bottom-6 text-center text-gray-500 dark:text-gray-400 z-10 space-x-4">
// //                 <a href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300 flex items-center justify-center gap-2"><Github size={16}/> GitHub</a>
// //             </footer>
// //         </div>
// //     );
// // };


// // const RoleSelectionPage = ({ onLogin }) => (
// //     <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-4 transition-colors duration-300">
// //         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(167,139,250,0.05)_0%,_transparent_50%)] dark:bg-[radial-gradient(circle_at_center,_rgba(167,139,250,0.1)_0%,_transparent_50%)]"></div>
// //         <header className="text-center z-10 mb-12">
// //             <h1 className="text-5xl md:text-6xl font-bold text-purple-600 dark:text-purple-400 drop-shadow-[0_0_10px_rgba(167,139,250,0.3)]">
// //                 Select Your Role
// //             </h1>
// //         </header>
// //         <main className="z-10">
// //             <GlassCard className="text-center w-full max-w-md animate-fade-in">
// //                 <h2 className="text-2xl font-light text-gray-600 dark:text-gray-200 mb-8">How would you like to proceed?</h2>
// //                 <div className="space-y-4">
// //                     <NeonButton onClick={() => onLogin('borrower')} className="w-full flex items-center justify-center">
// //                         <TrendingUp className="mr-2 h-5 w-5" /> Continue as Borrower
// //                     </NeonButton>
// //                     <NeonButton onClick={() => onLogin('lender')} className="w-full flex items-center justify-center">
// //                         <DollarSign className="mr-2 h-5 w-5" /> Continue as Lender
// //                     </NeonButton>
// //                     <NeonButton onClick={() => onLogin('admin')} className="w-full flex items-center justify-center">
// //                         <User className="mr-2 h-5 w-5" /> Continue as Admin
// //                     </NeonButton>
// //                 </div>
// //             </GlassCard>
// //         </main>
// //     </div>
// // );


// // const Sidebar = ({ role, currentPage, setPage, onLogout, theme, toggleTheme }) => {
// //     const navItems = {
// //         borrower: [ { name: 'Home', icon: Home, page: 'borrower/dashboard' }, { name: 'Apply', icon: FileText, page: 'borrower/apply' }, { name: 'Loan Health', icon: ShieldCheck, page: 'borrower/health' }, { name: 'History', icon: Briefcase, page: 'profile' }, ],
// //         lender: [ { name: 'Home', icon: Home, page: 'lender/dashboard' }, { name: 'Invest', icon: TrendingUp, page: 'lender/invest' }, { name: 'Portfolio', icon: Briefcase, page: 'lender/portfolio' }, { name: 'Profile', icon: User, page: 'profile' }, ],
// //         admin: [ { name: 'Overview', icon: BarChart2, page: 'admin/dashboard' }, { name: 'Users', icon: Users, page: 'admin/users' }, { name: 'Loans', icon: DollarSign, page: 'admin/loans' }, { name: 'Wallets', icon: Wallet, page: 'admin/wallets' }, ],
// //     };
// //     const currentNav = navItems[role] || [];
// //     return (
// //         <aside className="w-64 bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl border-r border-black/5 dark:border-purple-500/20 flex-col p-4 text-gray-600 dark:text-gray-300 transition-colors duration-300 hidden md:flex">
// //             <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-10 px-2">
// //                 Collatera
// //             </div>
// //             <nav className="flex-grow">
// //                 <ul>
// //                     {currentNav.map(item => (
// //                         <li key={item.name}>
// //                             <a href="#" onClick={(e) => { e.preventDefault(); setPage(item.page); }}
// //                                 className={`flex items-center px-4 py-3 my-1 rounded-lg transition-all duration-200 ${currentPage === item.page ? 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-white shadow-inner' : 'hover:bg-gray-200/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'}`}>
// //                                 <item.icon className="h-5 w-5 mr-3" />
// //                                 <span>{item.name}</span>
// //                             </a>
// //                         </li>
// //                     ))}
// //                 </ul>
// //             </nav>
// //             <div className="mt-auto">
// //                  <button onClick={toggleTheme} className="flex items-center w-full px-4 py-3 my-1 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white transition-all duration-200">
// //                     {theme === 'dark' ? <Sun className="h-5 w-5 mr-3" /> : <Moon className="h-5 w-5 mr-3" />}
// //                     <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
// //                 </button>
// //                 <a href="#" onClick={(e) => { e.preventDefault(); setPage('profile'); }} className="flex items-center w-full px-4 py-3 my-1 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white transition-all duration-200">
// //                     <Settings className="h-5 w-5 mr-3" />
// //                     <span>Settings</span>
// //                 </a>
// //                 <a href="#" onClick={onLogout} className="flex items-center w-full px-4 py-3 my-1 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white transition-all duration-200">
// //                     <LogOut className="h-5 w-5 mr-3" />
// //                     <span>Logout</span>
// //                 </a>
// //             </div>
// //         </aside>
// //     );
// // };

// // const MobileNav = ({ role, currentPage, setPage, onLogout, theme, toggleTheme }) => {
// //     const navItems = {
// //         borrower: [ { name: 'Home', icon: Home, page: 'borrower/dashboard' }, { name: 'Apply', icon: FileText, page: 'borrower/apply' }, { name: 'Health', icon: ShieldCheck, page: 'borrower/health' }],
// //         lender: [ { name: 'Home', icon: Home, page: 'lender/dashboard' }, { name: 'Invest', icon: TrendingUp, page: 'lender/invest' }, { name: 'Portfolio', icon: Briefcase, page: 'lender/portfolio' }],
// //         admin: [ { name: 'Overview', icon: BarChart2, page: 'admin/dashboard' }, { name: 'Users', icon: Users, page: 'admin/users' }, { name: 'Loans', icon: DollarSign, page: 'admin/loans' }],
// //     };
// //     const currentNav = navItems[role] || [];

// //     return (
// //         <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl border-t border-black/5 dark:border-purple-500/20 flex justify-around p-2 text-gray-600 dark:text-gray-300">
// //             {currentNav.map(item => (
// //                 <a key={item.name} href="#" onClick={(e) => { e.preventDefault(); setPage(item.page); }} className={`flex flex-col items-center text-xs transition-colors duration-200 ${currentPage === item.page ? 'text-purple-700 dark:text-white' : 'hover:text-gray-900 dark:hover:text-white'}`}>
// //                     <item.icon className="h-6 w-6 mb-1" />
// //                     <span>{item.name}</span>
// //                 </a>
// //             ))}
// //              <button onClick={onLogout} className="flex flex-col items-center text-xs hover:text-gray-900 dark:hover:text-white">
// //                 <LogOut className="h-6 w-6 mb-1" />
// //                 <span>Logout</span>
// //             </button>
// //         </nav>
// //     );
// // };


// // const DashboardCard = ({ icon, title, value, subtext, colorClass = 'text-cyan-500 dark:text-cyan-400' }) => {
// //     const Icon = icon;
// //     return (
// //         <GlassCard>
// //             <div className="flex items-center">
// //                 <div className={`p-3 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg mr-4 ${colorClass}`}>
// //                     <Icon size={24} />
// //                 </div>
// //                 <div>
// //                     <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
// //                     <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
// //                     {subtext && <p className="text-xs text-gray-400 dark:text-gray-500">{subtext}</p>}
// //                 </div>
// //             </div>
// //         </GlassCard>
// //     );
// // };

// // const LoanHealthMeter = ({ healthInfo }) => {
// //     const healthPercentage = Math.min(Math.max((healthInfo.value / 2) * 100, 0), 100);
// //     const healthColor = healthInfo.value >= 1.5 ? 'bg-green-500' : healthInfo.value >= 1.0 ? 'bg-orange-500' : 'bg-red-500';
// //     return (
// //         <GlassCard>
// //             <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Current Loan Health</h3>
// //             <div className="flex items-center justify-between mb-2">
// //                 <span className={`font-bold text-xl ${healthInfo.color}`}>{healthInfo.status}</span>
// //                 <span className="text-2xl font-bold text-gray-800 dark:text-white">{healthInfo.value.toFixed(2)}</span>
// //             </div>
// //             <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-4">
// //                 <div className={`${healthColor} h-4 rounded-full transition-all duration-500`} style={{ width: `${healthPercentage}%` }}></div>
// //             </div>
// //             <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 text-center">Thresholds: Risky &lt; 1.0, Caution &lt; 1.5, Safe ≥ 1.5</p>
// //         </GlassCard>
// //     );
// // }

// // const RepaymentTimer = ({ dueDate }) => {
// //     const [timeLeft, setTimeLeft] = useState('');
// //     useEffect(() => {
// //         const interval = setInterval(() => {
// //             const now = new Date();
// //             const diff = dueDate.getTime() - now.getTime();
// //             if (diff <= 0) {
// //                 setTimeLeft('Overdue');
// //                 clearInterval(interval);
// //                 return;
// //             }
// //             const days = Math.floor(diff / (1000 * 60 * 60 * 24));
// //             const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// //             const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
// //             setTimeLeft(`${days}d ${hours}h ${minutes}m left`);
// //         }, 1000);
// //         return () => clearInterval(interval);
// //     }, [dueDate]);
// //     const isUrgent = (dueDate.getTime() - new Date().getTime()) < 3 * 24 * 60 * 60 * 1000;
// //     return (
// //         <DashboardCard 
// //             icon={Clock}
// //             title="Repayment Due In"
// //             value={timeLeft}
// //             subtext={`Due on ${dueDate.toLocaleDateString()}`}
// //             colorClass={isUrgent ? 'text-red-500 dark:text-red-400' : 'text-cyan-500 dark:text-cyan-400'}
// //         />
// //     );
// // };

// // const ChartTooltip = ({ active, payload, label, theme }) => {
// //     if (active && payload && payload.length) {
// //         return (
// //             <div className="p-2 text-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
// //                 <p className="label text-gray-700 dark:text-gray-300">{`${label}`}</p>
// //                 {payload.map((pld, index) => (
// //                     <p key={index} style={{ color: pld.color }}>
// //                         {`${pld.name}: ${pld.value.toLocaleString()}`}
// //                     </p>
// //                 ))}
// //             </div>
// //         );
// //     }
// //     return null;
// // };

// // const BorrowerDashboard = ({ setPage, theme }) => {
// //     const healthInfo = calculateLoanHealth(initialMockLoanData);
// //     const axisColor = theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#6b7280';
// //     const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
// //     return (
// //         <div className="p-4 sm:p-8 space-y-8">
// //             <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Borrower Dashboard</h2>
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                 <LoanHealthMeter healthInfo={healthInfo} />
// //                 <RepaymentTimer dueDate={initialMockLoanData.repaymentDueDate} />
// //                 <DashboardCard icon={DollarSign} title="Loan Amount" value={`$${initialMockLoanData.loanAmount.toLocaleString()}`} subtext="Principal"/>
// //             </div>
// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //                 <GlassCard>
// //                     <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Collateral Value</h3>
// //                     <ResponsiveContainer width="100%" height={300}>
// //                         <LineChart data={initialCollateralHistory}>
// //                             <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
// //                             <XAxis dataKey="name" stroke={axisColor} />
// //                             <YAxis stroke={axisColor} domain={['dataMin - 1000', 'dataMax + 1000']}/>
// //                             <Tooltip content={<ChartTooltip theme={theme} />} />
// //                             <Legend wrapperStyle={{color: axisColor}}/>
// //                             <Line type="monotone" dataKey="value" name="Value ($)" stroke="#38bdf8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
// //                         </LineChart>
// //                     </ResponsiveContainer>
// //                 </GlassCard>
// //                 <GlassCard className="flex flex-col justify-center items-center text-center">
// //                     <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Need another loan?</h3>
// //                     <p className="text-gray-600 dark:text-gray-400 mb-6">Apply for a new loan with your updated collateral.</p>
// //                     <NeonButton onClick={() => setPage('borrower/apply')}>Apply for New Loan</NeonButton>
// //                 </GlassCard>
// //             </div>
// //         </div>
// //     );
// // };

// // const LenderDashboard = ({ setPage }) => {
// //     return (
// //         <div className="p-4 sm:p-8 space-y-8">
// //             <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Lender Dashboard</h2>
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //                 <DashboardCard icon={Briefcase} title="Active Loans" value={lenderData.activeLoansGiven} />
// //                 <DashboardCard icon={DollarSign} title="Total Invested" value={`$${lenderData.totalInvested.toLocaleString()}`} />
// //                 <DashboardCard icon={TrendingUp} title="Average ROI" value={`${lenderData.avgROI}%`} />
// //                 <DashboardCard icon={BarChart2} title="Total Earnings" value={`$${lenderData.earnings.toLocaleString()}`} colorClass="text-green-500 dark:text-green-400"/>
// //             </div>
// //             <GlassCard>
// //                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Lending Opportunities</h3>
// //                 <div className="overflow-x-auto">
// //                     <table className="w-full text-left">
// //                         <thead>
// //                             <tr className="border-b border-gray-200 dark:border-purple-500/20">
// //                                 <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Amount</th>
// //                                 <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Collateral</th>
// //                                 <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Health</th>
// //                                 <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Action</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {lenderData.lendingOpportunities.map(opp => (
// //                                 <tr key={opp.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50">
// //                                     <td className="p-3 text-gray-800 dark:text-white">${opp.amount.toLocaleString()}</td>
// //                                     <td className="p-3 text-gray-800 dark:text-white">{opp.collateral}</td>
// //                                     <td className="p-3 text-green-600 dark:text-green-400">{opp.health.toFixed(1)}</td>
// //                                     <td className="p-3"><button className="text-xs bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 px-3 py-1 rounded-md hover:bg-cyan-500/30 dark:hover:bg-cyan-500/40 transition-colors">Lend Now</button></td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                 </div>
// //             </GlassCard>
// //         </div>
// //     );
// // };

// // const AdminDashboard = ({ theme }) => {
// //     const statsData = [ { name: 'Jan', loans: 40, volume: 240000 }, { name: 'Feb', loans: 30, volume: 139800 }, { name: 'Mar', loans: 120, volume: 980000 }, { name: 'Apr', loans: 80, volume: 390800 }, { name: 'May', loans: 152, volume: 1250000 }, ];
// //     const axisColor = theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#6b7280';
// //     const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
// //     return (
// //         <div className="p-4 sm:p-8 space-y-8">
// //             <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h2>
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //                 <DashboardCard icon={Briefcase} title="Total Active Loans" value={adminData.totalActiveLoans} />
// //                 <DashboardCard icon={DollarSign} title="Total Liquidity" value={`$${adminData.liquidityPool.toLocaleString()}`} />
// //                 <DashboardCard icon={ShieldAlert} title="Flagged Accounts" value={adminData.flaggedAccounts} colorClass="text-red-500 dark:text-red-400" />
// //             </div>
// //             <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
// //                 <GlassCard className="lg:col-span-3">
// //                     <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Platform Growth</h3>
// //                     <ResponsiveContainer width="100%" height={300}>
// //                         <BarChart data={statsData}>
// //                             <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
// //                             <XAxis dataKey="name" stroke={axisColor} />
// //                             <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
// //                             <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
// //                             <Tooltip content={<ChartTooltip theme={theme} />} />
// //                             <Legend wrapperStyle={{color: axisColor}}/>
// //                             <Bar yAxisId="left" dataKey="volume" fill="#8884d8" name="Volume ($)" />
// //                             <Bar yAxisId="right" dataKey="loans" fill="#82ca9d" name="Active Loans" />
// //                         </BarChart>
// //                     </ResponsiveContainer>
// //                 </GlassCard>
// //                 <GlassCard className="lg:col-span-2">
// //                     <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">User Management</h3>
// //                      <div className="overflow-x-auto">
// //                         <table className="w-full text-left text-sm">
// //                             <thead>
// //                                 <tr className="border-b border-gray-200 dark:border-purple-500/20">
// //                                     <th className="p-2 font-semibold text-gray-500 dark:text-gray-400">Role</th>
// //                                     <th className="p-2 font-semibold text-gray-500 dark:text-gray-400">Status</th>
// //                                     <th className="p-2 font-semibold text-gray-500 dark:text-gray-400">Action</th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody>
// //                                 {adminData.users.map(user => (
// //                                     <tr key={user.id} className="border-b border-gray-200 dark:border-gray-800">
// //                                         <td className="p-2 text-gray-800 dark:text-white">{user.role}</td>
// //                                         <td className={`p-2 font-semibold ${user.status === 'Active' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{user.status}</td>
// //                                         <td className="p-2"><button className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-gray-700 dark:text-gray-300">View</button></td>
// //                                     </tr>
// //                                 ))}
// //                             </tbody>
// //                         </table>
// //                     </div>
// //                 </GlassCard>
// //             </div>
// //         </div>
// //     );
// // };

// // const LoanApplicationPage = ({ setPage }) => {
// //     const [submitted, setSubmitted] = useState(false);
// //     const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); setTimeout(() => { setPage('borrower/dashboard'); }, 2000); };
// //     if (submitted) {
// //         return (
// //             <div className="p-8 flex flex-col items-center justify-center h-full text-center">
// //                 <ShieldCheck className="text-green-500 dark:text-green-400 h-24 w-24 mb-4 animate-pulse" />
// //                 <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Application Submitted!</h2>
// //                 <p className="text-gray-600 dark:text-gray-400 mt-2">Your loan request is now being processed. Redirecting to dashboard...</p>
// //             </div>
// //         );
// //     }
// //     return (
// //         <div className="p-4 sm:p-8">
// //             <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Loan Application</h2>
// //             <GlassCard className="max-w-2xl mx-auto">
// //                 <form onSubmit={handleSubmit} className="space-y-6">
// //                     <div>
// //                         <label htmlFor="amount" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Loan Amount ($)</label>
// //                         <input type="number" id="amount" placeholder="e.g., 10000" className="w-full bg-gray-200/50 dark:bg-gray-800/50 border border-gray-300 dark:border-purple-500/30 rounded-lg px-4 py-2 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400" />
// //                     </div>
// //                     <div>
// //                         <label htmlFor="collateral" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Collateral Type</label>
// //                         <select id="collateral" className="w-full bg-gray-200/50 dark:bg-gray-800/50 border border-gray-300 dark:border-purple-500/30 rounded-lg px-4 py-2 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400">
// //                             <option>ICP</option>
// //                             <option>BTC</option>
// //                             <option>ETH</option>
// //                         </select>
// //                     </div>
// //                     <div>
// //                         <label htmlFor="duration" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Repayment Duration (days)</label>
// //                         <input type="number" id="duration" placeholder="e.g., 30" className="w-full bg-gray-200/50 dark:bg-gray-800/50 border border-gray-300 dark:border-purple-500/30 rounded-lg px-4 py-2 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400" />
// //                     </div>
// //                      <div>
// //                         <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Wallet Verification</label>
// //                         <div className="flex items-center p-3 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg">
// //                             <Wallet className="h-5 w-5 text-cyan-500 dark:text-cyan-400 mr-3"/>
// //                             <span className="text-green-600 dark:text-green-400 font-mono text-sm">Wallet Connected: 0x...aBcDeF</span>
// //                         </div>
// //                     </div>
// //                     <div className="text-center pt-4">
// //                         <NeonButton type="submit" className="w-full md:w-auto">Submit Application</NeonButton>
// //                     </div>
// //                 </form>
// //             </GlassCard>
// //         </div>
// //     );
// // };

// // const ProfilePage = () => {
// //     return (
// //         <div className="p-4 sm:p-8 space-y-8">
// //             <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Profile & History</h2>
// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //                 <GlassCard>
// //                     <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">User Details</h3>
// //                     <div className="space-y-3">
// //                         <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">User ID:</span><span className="font-mono text-gray-800 dark:text-white">usr_...c4f3</span></div>
// //                         <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Linked Wallet:</span><span className="font-mono text-gray-800 dark:text-white">0x...aBcDeF</span></div>
// //                         <div className="flex justify-between items-center"><span className="text-gray-500 dark:text-gray-400">Notifications:</span><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" value="" className="sr-only peer" defaultChecked/><div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div></label></div>
// //                     </div>
// //                 </GlassCard>
// //                 <GlassCard>
// //                     <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Account Security</h3>
// //                     <div className="space-y-3">
// //                          <button className="w-full text-left text-sm py-2 px-3 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-300/70 dark:hover:bg-gray-700/50 text-gray-800 dark:text-white">Change Password</button>
// //                          <button className="w-full text-left text-sm py-2 px-3 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-300/70 dark:hover:bg-gray-700/50 text-gray-800 dark:text-white">Enable 2FA</button>
// //                     </div>
// //                 </GlassCard>
// //             </div>
// //             <GlassCard>
// //                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Transaction History</h3>
// //                 <div className="overflow-x-auto">
// //                     <table className="w-full text-left">
// //                         <thead>
// //                             <tr className="border-b border-gray-200 dark:border-purple-500/20">
// //                                 <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Action</th>
// //                                 <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Amount</th>
// //                                 <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Date</th>
// //                                 <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Status</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {transactionHistory.map(tx => (
// //                                 <tr key={tx.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50">
// //                                     <td className="p-3 text-gray-800 dark:text-white">{tx.action}</td>
// //                                     <td className="p-3 text-gray-800 dark:text-white">${tx.amount.toLocaleString()}</td>
// //                                     <td className="p-3 text-gray-500 dark:text-gray-400">{tx.date}</td>
// //                                     <td className={`p-3 font-semibold ${tx.status === 'Complete' ? 'text-green-600 dark:text-green-400' : tx.status === 'Pending' ? 'text-orange-500 dark:text-orange-400' : 'text-red-500 dark:text-red-400'}`}>{tx.status}</td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                 </div>
// //             </GlassCard>
// //         </div>
// //     );
// // };

// // const LoanHealthPage = ({ theme }) => {
// //     const healthInfo = calculateLoanHealth(initialMockLoanData);
// //     const healthHistory = [ { name: 'Day 1', health: 1.9 }, { name: 'Day 5', health: 1.95 }, { name: 'Day 10', health: 1.85 }, { name: 'Day 15', health: 1.82 }, { name: 'Day 20', health: 1.78 }, { name: 'Today', health: healthInfo.value }, ];
// //     const healthIcon = useMemo(() => {
// //         if (healthInfo.status === 'Safe') return <ShieldCheck className="h-16 w-16 text-green-500 dark:text-green-400" />;
// //         if (healthInfo.status === 'Caution') return <ShieldAlert className="h-16 w-16 text-orange-500 dark:text-orange-400" />;
// //         return <ShieldX className="h-16 w-16 text-red-500 dark:text-red-400" />;
// //     }, [healthInfo.status]);
// //     const axisColor = theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#6b7280';
// //     const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
// //     return (
// //         <div className="p-4 sm:p-8 space-y-8">
// //             <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Loan Health Tracker</h2>
// //             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //                 <GlassCard className="lg:col-span-2">
// //                     <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Health Over Time</h3>
// //                     <ResponsiveContainer width="100%" height={300}>
// //                         <LineChart data={healthHistory}>
// //                             <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
// //                             <XAxis dataKey="name" stroke={axisColor} />
// //                             <YAxis domain={[0.5, 2.5]} stroke={axisColor} />
// //                             <Tooltip content={<ChartTooltip theme={theme} />} />
// //                             <Legend wrapperStyle={{color: axisColor}}/>
// //                             <Line type="monotone" dataKey="health" stroke="#a78bfa" strokeWidth={2} />
// //                         </LineChart>
// //                     </ResponsiveContainer>
// //                 </GlassCard>
// //                 <GlassCard className="flex flex-col items-center justify-center text-center">
// //                     {healthIcon}
// //                     <h3 className={`text-4xl font-bold mt-4 ${healthInfo.color}`}>{healthInfo.status}</h3>
// //                     <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">Current Health: {healthInfo.value.toFixed(2)}</p>
// //                     <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">Keep collateral value high to maintain a safe loan status.</p>
// //                 </GlassCard>
// //             </div>
// //             <GlassCard>
// //                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Repayment Planner</h3>
// //                 <p className="text-gray-600 dark:text-gray-400">Your next repayment is due on <span className="text-cyan-500 dark:text-cyan-400">{initialMockLoanData.repaymentDueDate.toLocaleDateString()}</span>. Consider adding more collateral or making an early payment to improve your loan health.</p>
// //                 <div className="mt-4 space-x-4">
// //                     <button className="text-sm bg-green-500/20 text-green-600 dark:text-green-300 px-4 py-2 rounded-md hover:bg-green-500/30 dark:hover:bg-green-500/40 transition-colors">Make Payment</button>
// //                     <button className="text-sm bg-blue-500/20 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-md hover:bg-blue-500/30 dark:hover:bg-blue-500/40 transition-colors">Add Collateral</button>
// //                 </div>
// //             </GlassCard>
// //         </div>
// //     );
// // }


// // // --- MAIN APP COMPONENT --- //

// // export default function App() {
// //   const [isWalletConnected, setIsWalletConnected] = useState(false);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [userRole, setUserRole] = useState(null);
// //   const [currentPage, setCurrentPage] = useState('landing');
// //   const [theme, setTheme] = useState('dark');

// //   // Set the theme on the body for global styles and in localStorage to persist
// //   useEffect(() => {
// //     const root = window.document.documentElement;
// //     if (theme === 'light') {
// //         root.classList.remove('dark');
// //     } else {
// //         root.classList.add('dark');
// //     }
// //     localStorage.setItem('theme', theme);
// //   }, [theme]);

// //   // Check for saved theme on initial load
// //   useEffect(() => {
// //       const savedTheme = localStorage.getItem('theme');
// //       if (savedTheme) {
// //           setTheme(savedTheme);
// //       }
// //   }, []);

// //   const toggleTheme = () => {
// //       setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
// //   };

// //   const handleConnectWallet = () => {
// //       setIsWalletConnected(true);
// //   }

// //   const handleLogin = (role) => {
// //     setUserRole(role);
// //     setIsLoggedIn(true);
// //     setCurrentPage(`${role}/dashboard`);
// //   };

// //   const handleLogout = () => {
// //     setIsWalletConnected(false);
// //     setIsLoggedIn(false);
// //     setUserRole(null);
// //     setCurrentPage('landing');
// //   };
  
// //   // Render logic based on authentication state
// //   if (!isWalletConnected) {
// //       return <LandingPage onConnectWallet={handleConnectWallet} />;
// //   }

// //   if (!isLoggedIn) {
// //       return <RoleSelectionPage onLogin={handleLogin} />;
// //   }

// //   const renderPage = () => {
// //     switch (currentPage) {
// //       case 'borrower/dashboard': return <BorrowerDashboard setPage={setCurrentPage} theme={theme} />;
// //       case 'lender/dashboard': return <LenderDashboard setPage={setCurrentPage} theme={theme} />;
// //       case 'admin/dashboard': return <AdminDashboard setPage={setCurrentPage} theme={theme} />;
// //       case 'borrower/apply': return <LoanApplicationPage setPage={setCurrentPage} />;
// //       case 'borrower/health': return <LoanHealthPage theme={theme} />;
// //       case 'profile':
// //       case 'lender/portfolio':
// //       case 'admin/users':
// //       case 'admin/loans':
// //       case 'admin/wallets':
// //         return <ProfilePage />;
// //       default:
// //         handleLogout(); 
// //         return null;
// //     }
// //   };

// //   return (
// //     <div className="font-inter flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
// //         <style>{`
// //             @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
// //             .font-inter { font-family: 'Inter', sans-serif; }
// //             @keyframes fade-in {
// //                 from { opacity: 0; transform: translateY(10px); }
// //                 to { opacity: 1; transform: translateY(0); }
// //             }
// //             .animate-fade-in { animation: fade-in 0.7s ease-out forwards; }
// //         `}</style>
// //       <div className="flex flex-1">
// //         <Sidebar role={userRole} currentPage={currentPage} setPage={setCurrentPage} onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme}/>
// //         <main className="flex-1 bg-gray-50 dark:bg-gray-800/50 overflow-y-auto pb-20 md:pb-0">
// //           {renderPage()}
// //         </main>
// //         <MobileNav role={userRole} currentPage={currentPage} setPage={setCurrentPage} onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} />
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState, useEffect } from 'react';
// import { AuthClient } from '@dfinity/auth-client';
// import { createActor } from 'declarations/backend';
// import { canisterId } from 'declarations/backend/index.js';
// import Sidebar from './components/Sidebar';
// import MobileNav from './components/MobileNav';
// import LandingPage from './pages/LandingPage';
// import RoleSelectionPage from './pages/RoleSelectionPage';
// import BorrowerDashboard from './pages/BorrowerDashboard';
// import LenderDashboard from './pages/LenderDashboard';
// import AdminDashboard from './pages/AdminDashboard';
// import LoanApplicationPage from './pages/LoanApplicationPage';
// import ProfilePage from './pages/ProfilePage';
// import LoanHealthPage from './pages/LoanHealthPage';
// import './App.css';

// // --- MOCK DATA (Initial State & Backend Simulation) --- //
// const initialMockLoanData = {
//   loanAmount: 10000,
//   collateralValue: 18000,
//   repaymentDueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 days from now
//   paymentHistory: 'good',
//   riskFactor: 1.1,
//   overduePenalty: 0,
// };

// const initialCollateralHistory = [
//   { name: '30d ago', value: 16000 },
//   { name: '20d ago', value: 17500 },
//   { name: '10d ago', value: 17000 },
//   { name: 'Now', value: 18000 },
// ];

// const lenderData = {
//   activeLoansGiven: 5,
//   totalInvested: 50000,
//   avgROI: 8.5,
//   earnings: 4250,
//   lendingOpportunities: [
//     { id: 1, amount: 5000, collateral: 'BTC', health: 1.8 },
//     { id: 2, amount: 12000, collateral: 'ETH', health: 1.6 },
//     { id: 3, amount: 7500, collateral: 'ICP', health: 2.1 },
//   ],
// };

// const adminData = {
//     totalActiveLoans: 152,
//     liquidityPool: 1250000,
//     flaggedAccounts: 3,
//     users: [
//         { id: 'u001', role: 'Borrower', joined: '2023-10-01', status: 'Active' },
//         { id: 'u002', role: 'Lender', joined: '2023-09-15', status: 'Active' },
//         { id: 'u003', role: 'Borrower', joined: '2023-11-05', status: 'Flagged' },
//         { id: 'u004', role: 'Lender', joined: '2023-08-22', status: 'Inactive' },
//     ]
// };

// // --- API SIMULATION --- //
// // This section simulates calls to a backend.
// // Replace the setTimeout with your actual backend fetch/canister calls.

// const api = {
//   connectWithInternetIdentity: async () => {
//     // --- INTERNET IDENTITY INTEGRATION POINT --- //
//     // 1. Add your Internet Identity authentication logic here.
//     //    e.g., const authClient = await AuthClient.create();
//     //          await authClient.login(...);
//     // 2. On success, return user data.
//     // 3. On failure, throw an error.
//     console.log("Simulating connection with Internet Identity...");
//     return new Promise(resolve => setTimeout(() => {
//       console.log("Internet Identity connection successful.");
//       resolve({ principalId: 'abc-123-xyz', wallet: 'Internet Identity' });
//     }, 1500));
//   },

//   connectWithPlugWallet: async () => {
//     // --- PLUG WALLET INTEGRATION POINT --- //
//     // 1. Add your Plug Wallet connection logic here.
//     //    e.g., const connected = await window.ic.plug.requestConnect();
//     // 2. On success, return user data.
//     // 3. On failure, throw an error.
//     console.log("Simulating connection with Plug Wallet...");
//     return new Promise(resolve => setTimeout(() => {
//       console.log("Plug Wallet connection successful.");
//       resolve({ principalId: 'def-456-uvw', wallet: 'Plug Wallet' });
//     }, 1500));
//   },
  
//   fetchUserData: async (role, principalId) => {
//     console.log(`Fetching data for role: ${role} and principal: ${principalId}`);
//     return new Promise(resolve => setTimeout(() => {
//         switch(role) {
//             case 'borrower':
//                 resolve({ loanData: initialMockLoanData, collateralHistory: initialCollateralHistory });
//                 break;
//             case 'lender':
//                 resolve({ lenderData });
//                 break;
//             case 'admin':
//                 resolve({ adminData });
//                 break;
//             default:
//                 resolve({});
//         }
//     }, 1000));
//   }
// };

// // --- MAIN APP COMPONENT --- //

// export default function App() {
//   const [isWalletConnected, setIsWalletConnected] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [currentPage, setCurrentPage] = useState('landing');
//   const [theme, setTheme] = useState('dark');
  
//   // State for dynamic data
//   const [loanData, setLoanData] = useState(null);
//   const [collateralHistory, setCollateralHistory] = useState(null);
//   const [lenderInfo, setLenderInfo] = useState(null);
//   const [adminInfo, setAdminInfo] = useState(null);

//   // Set the theme on the body for global styles and in localStorage to persist
//   useEffect(() => {
//     const root = window.document.documentElement;
//     if (theme === 'light') {
//         root.classList.remove('dark');
//     } else {
//         root.classList.add('dark');
//     }
//     localStorage.setItem('theme', theme);
//   }, [theme]);

//   // Check for saved theme on initial load
//   useEffect(() => {
//       const savedTheme = localStorage.getItem('theme');
//       if (savedTheme) {
//           setTheme(savedTheme);
//       }
//   }, []);

//   const toggleTheme = () => {
//       setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
//   };

//   const handleConnectWallet = async (walletType) => {
//       try {
//           let connectedUserData;
//           if (walletType === 'ii') {
//               connectedUserData = await api.connectWithInternetIdentity();
//           } else {
//               connectedUserData = await api.connectWithPlugWallet();
//           }
          
//           if (connectedUserData) {
//               setUserData(connectedUserData);
//               setIsWalletConnected(true);
//           }
//       } catch (error) {
//           console.error("Connection failed:", error);
//           // Here you would show an error message to the user
//       }
//   };

//   const handleLogin = async (role) => {
//     setUserRole(role);
    
//     // Fetch data based on role
//     const data = await api.fetchUserData(role, userData.principalId);
//     if (role === 'borrower') {
//         setLoanData(data.loanData);
//         setCollateralHistory(data.collateralHistory);
//     } else if (role === 'lender') {
//         setLenderInfo(data.lenderData);
//     } else if (role === 'admin') {
//         setAdminInfo(data.adminData);
//     }
    
//     setIsLoggedIn(true);
//     setCurrentPage(`${role}/dashboard`);
//   };

//   const handleLogout = () => {
//     setIsWalletConnected(false);
//     setIsLoggedIn(false);
//     setUserRole(null);
//     setUserData(null);
//     setLoanData(null);
//     setCollateralHistory(null);
//     setLenderInfo(null);
//     setAdminInfo(null);
//     setCurrentPage('landing');
//   };
  
//   // Render logic based on authentication state
//   if (!isWalletConnected) {
//       return <LandingPage onConnectWallet={handleConnectWallet} />;
//   }

//   if (!isLoggedIn) {
//       return <RoleSelectionPage onLogin={handleLogin} />;
//   }

//   const renderPage = () => {
//     switch (currentPage) {
//       case 'borrower/dashboard': 
//         return <BorrowerDashboard setPage={setCurrentPage} theme={theme} loanData={loanData} collateralHistory={collateralHistory} />;
//       case 'lender/dashboard': 
//         return <LenderDashboard setPage={setCurrentPage} lenderData={lenderInfo} />;
//       case 'admin/dashboard': 
//         return <AdminDashboard setPage={setCurrentPage} theme={theme} adminData={adminInfo} />;
//       case 'borrower/apply': 
//         return <LoanApplicationPage setPage={setCurrentPage} />;
//       case 'borrower/health': 
//         return <LoanHealthPage theme={theme} loanData={loanData} />;
//       case 'profile':
//       case 'lender/portfolio':
//       case 'lender/invest':
//       case 'admin/users':
//       case 'admin/loans':
//       case 'admin/wallets':
//         return <ProfilePage />;
//       default:
//         handleLogout(); 
//         return null;
//     }
//   };

//   return (
//     <div className="font-inter flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
//       <div className="flex flex-1">
//         <Sidebar 
//           role={userRole} 
//           currentPage={currentPage} 
//           setPage={setCurrentPage} 
//           onLogout={handleLogout} 
//           theme={theme} 
//           toggleTheme={toggleTheme}
//         />
//         <main className="flex-1 bg-gray-50 dark:bg-gray-800/50 overflow-y-auto pb-20 md:pb-0">
//           {renderPage()}
//         </main>
//         <MobileNav 
//           role={userRole} 
//           currentPage={currentPage} 
//           setPage={setCurrentPage} 
//           onLogout={handleLogout} 
//         />
//       </div>
//     </div>
//   );
// }

// const network = process.env.DFX_NETWORK;
// const identityProvider =
//   network === 'ic'
//     ? 'https://identity.ic0.app' // Mainnet
//     : 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943'; // Local

// // Reusable button component
// const Button = ({ onClick, children }) => <button onClick={onClick}>{children}</button>;

// const App = () => {
//   const [state, setState] = useState({
//     actor: undefined,
//     authClient: undefined,
//     isAuthenticated: false,
//     principal: 'Click "Whoami" to see your principal ID'
//   });

//   // Initialize auth client
//   useEffect(() => {
//     updateActor();
//   }, []);

//   const updateActor = async () => {
//     const authClient = await AuthClient.create();
//     const identity = authClient.getIdentity();
//     const actor = createActor(canisterId, {
//       agentOptions: {
//         identity
//       }
//     });
//     const isAuthenticated = await authClient.isAuthenticated();

//     setState((prev) => ({
//       ...prev,
//       actor,
//       authClient,
//       isAuthenticated
//     }));
//   };

//   const login = async () => {
//     await state.authClient.login({
//       identityProvider,
//       onSuccess: updateActor
//     });
//   };

//   const logout = async () => {
//     await state.authClient.logout();
//     updateActor();
//   };

//   const whoami = async () => {
//     setState((prev) => ({
//       ...prev,
//       principal: 'Loading...'
//     }));

//     const result = await state.actor.whoami();
//     const principal = result.toString();
//     setState((prev) => ({
//       ...prev,
//       principal
//     }));
//   };

//   return (
//     <div>
//       <h1>Who Am I?</h1>
//       <div id="info-box" className="info-box">
//         <div className="info-content">
//           <p>
//             <i className="fas fa-info-circle"></i> A <strong>principal</strong> is a unique identifier in the Internet
//             Computer ecosystem.
//           </p>
//           <p>
//             It represents an entity (user, canister smart contract, or other) and is used for identification and
//             authorization purposes.
//           </p>
//           <p>
//             In this example, click "Whoami" to find out the principal ID with which you're interacting with the backend.
//             If you're not signed in, you will see that you're using the so-called anonymous principal, "2vxsx-fae".
//           </p>
//           <p>
//             After you've logged in with Internet Identity, you'll see a longer principal, which is unique to your
//             identity and the dapp you're using.
//           </p>
//         </div>
//       </div>

//       {!state.isAuthenticated ? (
//         <Button onClick={login}>Login with Internet Identity</Button>
//       ) : (
//         <Button onClick={logout}>Logout</Button>
//       )}

//       <Button onClick={whoami}>Whoami</Button>

//       {state.principal && (
//         <div>
//           <h2>Your principal ID is:</h2>
//           <h4>{state.principal}</h4>
//         </div>
//       )}
//     </div>
//   );
// };

// // export default App;
import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ShieldCheck, ShieldAlert, ShieldX, DollarSign, Clock, BarChart2, Users, Settings, LogOut, Github, Home, FileText, Briefcase, TrendingUp, User, Wallet, Sun, Moon, Loader2 } from 'lucide-react';

// --- MOCK DATA & API SIMULATION ---
// This section simulates your backend canister's state and methods.
// Replace the logic inside these functions with your actual `actor` calls.

const MOCK_DB = {
    users: {},
    loans: {},
    transactions: {},
    nextLoanId: 0,
    nextTransactionId: 0,
};

const api = {
    // --- MODULE 1: USER AUTH & MANAGEMENT ---
    register_user: async (principalId, initial_role) => {
        console.log("API: register_user called with", { principalId, initial_role });
        // --- BACKEND INTEGRATION ---
        // Replace this with: const result = await actor.register_user(initial_role);
        if (MOCK_DB.users[principalId]) {
            // In a real scenario, you might just fetch the user instead of erroring
            return MOCK_DB.users[principalId];
        }
        const newUser = {
            principal: principalId,
            roles: [initial_role],
            transaction_history: [],
            active_loan_ids: [],
            created_at: Date.now() * 1_000_000, // nanoseconds
        };
        MOCK_DB.users[principalId] = newUser;
        return newUser;
    },
    get_user: async (principalId) => {
        console.log("API: get_user called for", principalId);
        // --- BACKEND INTEGRATION ---
        // const result = await actor.get_user();
        return MOCK_DB.users[principalId] || null;
    },

    // --- MODULE 4: SMART CONTRACT LOGIC ---
    create_loan_request: async (principalId, amount, collateral_value, duration_days) => {
        console.log("API: create_loan_request called");
        // --- BACKEND INTEGRATION ---
        // const result = await actor.create_loan_request(amount, collateral_value, duration_days);
        const loan_id = MOCK_DB.nextLoanId;
        MOCK_DB.nextLoanId += 1;
        const newLoan = {
            id: loan_id,
            borrower: principalId,
            lender: null,
            amount,
            collateral_value,
            status: 'Pending',
            created_at: Date.now() * 1_000_000,
            funded_at: null,
            due_date: (Date.now() * 1_000_000) + (duration_days * 24 * 60 * 60 * 1_000_000_000),
            repayment_history: [],
            risk_factor: 1.2,
        };
        MOCK_DB.loans[loan_id] = newLoan;
        return newLoan;
    },
    fund_loan: async (principalId, loan_id) => {
        console.log("API: fund_loan called for loan", loan_id);
        // --- BACKEND INTEGRATION ---
        // const result = await actor.fund_loan(loan_id);
        const loan = MOCK_DB.loans[loan_id];
        if (!loan || loan.status !== 'Pending') {
            throw new Error("Loan not available for funding.");
        }
        loan.lender = principalId;
        loan.status = 'Active';
        loan.funded_at = Date.now() * 1_000_000;
        return loan;
    },

    // --- MODULE 6: ANALYTICS ENGINE ---
    get_platform_analytics: async () => {
        console.log("API: get_platform_analytics called");
        // --- BACKEND INTEGRATION ---
        // const result = await actor.get_platform_analytics();
        let total_borrowed = 0;
        let active_loans = 0;
        Object.values(MOCK_DB.loans).forEach(loan => {
            if (loan.status === 'Active' || loan.status === 'Repaid') {
                total_borrowed += loan.amount;
            }
            if (loan.status === 'Active') {
                active_loans += 1;
            }
        });
        return [total_borrowed, active_loans, 0]; // [total_borrowed, active_loans, defaulted_loans]
    },
    
    // Helper to get data for dashboards
    fetchDashboardData: async (role) => {
        if (role === 'Borrower') {
             const userLoans = Object.values(MOCK_DB.loans).filter(l => l.borrower === "ii-principal-123" || l.borrower === "plug-principal-456");
             return { loans: userLoans };
        }
        if (role === 'Lender') {
            const pendingLoans = Object.values(MOCK_DB.loans).filter(l => l.status === 'Pending');
            return { pendingLoans };
        }
        if (role === 'Admin') {
            const analytics = await api.get_platform_analytics();
            return { totalBorrowed: analytics[0], activeLoans: analytics[1] };
        }
    }
};

// --- UI COMPONENTS (src/components/) ---

const NeonButton = ({ children, onClick, className = '', disabled = false }) => (
  <button onClick={onClick} disabled={disabled} className={`neon-button ${className}`}>
    {children}
  </button>
);

const GlassCard = ({ children, className = '' }) => (
  <div className={`glass-card ${className}`}>{children}</div>
);

const Sidebar = ({ role, currentPage, setPage, onLogout, theme, toggleTheme }) => {
    const navItems = {
        borrower: [ { name: 'Home', icon: Home, page: 'borrower/dashboard' }, { name: 'Apply', icon: FileText, page: 'borrower/apply' }, { name: 'Loan Health', icon: ShieldCheck, page: 'borrower/health' }, { name: 'History', icon: Briefcase, page: 'profile' }, ],
        lender: [ { name: 'Home', icon: Home, page: 'lender/dashboard' }, { name: 'Invest', icon: TrendingUp, page: 'lender/invest' }, { name: 'Portfolio', icon: Briefcase, page: 'lender/portfolio' }, { name: 'Profile', icon: User, page: 'profile' }, ],
        admin: [ { name: 'Overview', icon: BarChart2, page: 'admin/dashboard' }, { name: 'Users', icon: Users, page: 'admin/users' }, { name: 'Loans', icon: DollarSign, page: 'admin/loans' }, { name: 'Wallets', icon: Wallet, page: 'admin/wallets' }, ],
    };
    const currentNav = navItems[role] || [];
    return (
        <aside className="sidebar">
            <div className="sidebar-header">Collatera</div>
            <nav className="flex-grow">
                <ul>
                    {currentNav.map(item => (
                        <li key={item.name}>
                            <a href="#" onClick={(e) => { e.preventDefault(); setPage(item.page); }} className={`sidebar-link ${currentPage === item.page ? 'active' : ''}`}>
                                <item.icon className="h-5 w-5 mr-3" />
                                <span>{item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="mt-auto">
                 <button onClick={toggleTheme} className="sidebar-link">
                    {theme === 'dark' ? <Sun className="h-5 w-5 mr-3" /> : <Moon className="h-5 w-5 mr-3" />}
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                <a href="#" onClick={(e) => { e.preventDefault(); setPage('profile'); }} className="sidebar-link">
                    <Settings className="h-5 w-5 mr-3" />
                    <span>Settings</span>
                </a>
                <a href="#" onClick={onLogout} className="sidebar-link">
                    <LogOut className="h-5 w-5 mr-3" />
                    <span>Logout</span>
                </a>
            </div>
        </aside>
    );
};

const MobileNav = ({ role, currentPage, setPage, onLogout }) => {
    const navItems = {
        borrower: [ { name: 'Home', icon: Home, page: 'borrower/dashboard' }, { name: 'Apply', icon: FileText, page: 'borrower/apply' }, { name: 'Health', icon: ShieldCheck, page: 'borrower/health' }],
        lender: [ { name: 'Home', icon: Home, page: 'lender/dashboard' }, { name: 'Invest', icon: TrendingUp, page: 'lender/invest' }, { name: 'Portfolio', icon: Briefcase, page: 'lender/portfolio' }],
        admin: [ { name: 'Overview', icon: BarChart2, page: 'admin/dashboard' }, { name: 'Users', icon: Users, page: 'admin/users' }, { name: 'Loans', icon: DollarSign, page: 'admin/loans' }],
    };
    const currentNav = navItems[role] || [];
    return (
        <nav className="mobile-nav">
            {currentNav.map(item => (
                <a key={item.name} href="#" onClick={(e) => { e.preventDefault(); setPage(item.page); }} className={`mobile-nav-link ${currentPage === item.page ? 'active' : ''}`}>
                    <item.icon className="h-6 w-6 mb-1" />
                    <span>{item.name}</span>
                </a>
            ))}
             <button onClick={onLogout} className="mobile-nav-link">
                <LogOut className="h-6 w-6 mb-1" />
                <span>Logout</span>
            </button>
        </nav>
    );
};

// ... other components like DashboardCard, LoanHealthMeter etc. would be here

// --- PAGE COMPONENTS (src/pages/) ---

const LandingPage = ({ onConnectWallet }) => {
    const [isLoading, setIsLoading] = useState(null);
    const handleConnect = async (walletType) => {
        setIsLoading(walletType);
        try {
            await onConnectWallet(walletType);
        } catch (error) {
            console.error("Connection failed:", error);
        } finally {
            setIsLoading(null);
        }
    };
    return (
        <div className="page-container">
            <div className="radial-background"></div>
            <header className="page-header">
                <h1>Collatera</h1>
                <p>Transparent DeFi Lending on ICP</p>
            </header>
            <main className="z-10">
                <GlassCard className="text-center w-full max-w-md animate-fade-in">
                     <h2 className="page-subheader">Connect your wallet to continue</h2>
                    <div className="space-y-4">
                        <NeonButton onClick={() => handleConnect('ii')} disabled={!!isLoading} className="w-full">
                            {isLoading === 'ii' ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <User className="mr-2 h-5 w-5" />}
                            {isLoading === 'ii' ? 'Connecting...' : 'Connect with Internet Identity'}
                        </NeonButton>
                        <NeonButton onClick={() => handleConnect('plug')} disabled={!!isLoading} className="w-full">
                             {isLoading === 'plug' ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wallet className="mr-2 h-5 w-5" />}
                             {isLoading === 'plug' ? 'Connecting...' : 'Connect with Plug Wallet'}
                        </NeonButton>
                    </div>
                </GlassCard>
            </main>
            <footer className="page-footer">
                <a href="#" className="footer-link"><Github size={16}/> GitHub</a>
            </footer>
        </div>
    );
};

const RoleSelectionPage = ({ onSelectRole }) => (
    <div className="page-container">
        <div className="radial-background"></div>
        <header className="page-header">
            <h1>Select Your Role</h1>
        </header>
        <main className="z-10">
            <GlassCard className="text-center w-full max-w-md animate-fade-in">
                <h2 className="page-subheader">How would you like to proceed?</h2>
                <div className="space-y-4">
                    <NeonButton onClick={() => onSelectRole('Borrower')} className="w-full">
                        <TrendingUp className="mr-2 h-5 w-5" /> Continue as Borrower
                    </NeonButton>
                    <NeonButton onClick={() => onSelectRole('Lender')} className="w-full">
                        <DollarSign className="mr-2 h-5 w-5" /> Continue as Lender
                    </NeonButton>
                    <NeonButton onClick={() => onSelectRole('Admin')} className="w-full">
                        <User className="mr-2 h-5 w-5" /> Continue as Admin
                    </NeonButton>
                </div>
            </GlassCard>
        </main>
    </div>
);

// A placeholder for actual dashboard pages
const DashboardPage = ({ currentPage, dashboardData }) => (
    <div className="dashboard-container">
        <h2 className="dashboard-header">{currentPage}</h2>
        <GlassCard>
            <h3 className="card-header">Data from Backend</h3>
            <pre>{JSON.stringify(dashboardData, null, 2)}</pre>
        </GlassCard>
    </div>
);


// --- MAIN APP COMPONENT (App.jsx) --- //

export default function App() {
  const [auth, setAuth] = useState({
      principal: null,
      isLoggedIn: false,
      role: null,
  });
  const [currentPage, setCurrentPage] = useState('landing');
  const [theme, setTheme] = useState('dark');
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const handleConnectWallet = async (walletType) => {
    const mockPrincipal = walletType === 'ii' ? "ii-principal-123" : "plug-principal-456";
    setAuth(prev => ({ ...prev, principal: mockPrincipal }));
    setCurrentPage('role-selection');
  };

  const handleSelectRole = async (role) => {
    await api.register_user(auth.principal, role);
    setAuth(prev => ({ ...prev, isLoggedIn: true, role }));
    const data = await api.fetchDashboardData(role);
    setDashboardData(data);
    setCurrentPage(`${role.toLowerCase()}/dashboard`);
  };

  const handleLogout = () => {
    setAuth({ principal: null, isLoggedIn: false, role: null });
    setCurrentPage('landing');
  };
  
  const renderContent = () => {
      if (currentPage === 'landing') {
          return <LandingPage onConnectWallet={handleConnectWallet} />;
      }
      if (currentPage === 'role-selection') {
          return <RoleSelectionPage onSelectRole={handleSelectRole} />;
      }
      if (auth.isLoggedIn) {
          return (
              <div className="app-container">
                  <Sidebar role={auth.role.toLowerCase()} currentPage={currentPage} setPage={setCurrentPage} onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme}/>
                  <main className="main-content">
                      <DashboardPage currentPage={currentPage} dashboardData={dashboardData} />
                  </main>
                  <MobileNav role={auth.role.toLowerCase()} currentPage={currentPage} setPage={setCurrentPage} onLogout={handleLogout} />
              </div>
          );
      }
      return <LandingPage onConnectWallet={handleConnectWallet} />;
  };

  return (
    <div className="font-inter">
        <style>{`
            /* --- IMPORTS & FONT-FACE --- */
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

            /* --- THEME VARIABLES & BASE STYLES --- */
            :root {
              --font-family: 'Inter', sans-serif;
              --bg-light: #f4f7f9;
              --bg-dark: #0d1117;
              --text-light: #1f2937;
              --text-dark: #e6edf3;
              --purple-light: #8b5cf6;
              --purple-dark: #a78bfa;
              --cyan-light: #06b6d4;
              --cyan-dark: #22d3ee;
            }

            html {
              scroll-behavior: smooth;
            }

            html.light {
              --bg-primary: var(--bg-light);
              --bg-secondary: #ffffff;
              --text-primary: var(--text-light);
              --text-secondary: #4b5563;
              --border-color: rgba(0, 0, 0, 0.08);
              --header-color: var(--purple-light);
            }

            html.dark {
              --bg-primary: var(--bg-dark);
              --bg-secondary: #161b22;
              --text-primary: var(--text-dark);
              --text-secondary: #8b949e;
              --border-color: rgba(139, 148, 158, 0.2);
              --header-color: var(--purple-dark);
            }

            body {
              font-family: var(--font-family);
              background-color: var(--bg-primary);
              color: var(--text-primary);
              transition: background-color 0.3s, color 0.3s;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }

            /* --- ANIMATIONS --- */
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }

            .animate-fade-in {
              animation: fade-in 0.7s ease-out forwards;
            }

            /* --- LAYOUT --- */
            .app-container {
              display: flex;
              min-height: 100vh;
            }

            .main-content {
              flex-grow: 1;
              overflow-y: auto;
              padding-bottom: 6rem;
              background-color: var(--bg-primary);
            }

            @media (min-width: 768px) {
              .main-content {
                padding-bottom: 0;
              }
            }


            /* --- COMPONENT STYLES --- */

            /* NeonButton.jsx */
            .neon-button {
              padding: 0.8rem 1.5rem;
              font-weight: 600;
              color: white;
              border-radius: 0.5rem;
              box-shadow: 0 0 12px rgba(34, 211, 238, 0.4), inset 0 0 6px rgba(34, 211, 238, 0.3);
              border: 1px solid var(--cyan-dark);
              background-color: rgba(6, 182, 212, 0.25);
              backdrop-filter: blur(4px);
              transition: all 0.3s ease-in-out;
              transform: scale(1);
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              cursor: pointer;
            }
            .neon-button:hover {
              background-color: rgba(6, 182, 212, 0.4);
              box-shadow: 0 0 24px rgba(34, 211, 238, 0.6);
              transform: scale(1.03);
            }
            .neon-button:disabled {
              opacity: 0.6;
              cursor: not-allowed;
              transform: scale(1);
              box-shadow: none;
            }

            /* GlassCard.jsx */
            .glass-card {
              backdrop-filter: blur(16px) saturate(180%);
              border-radius: 1rem;
              padding: 1.5rem;
              border: 1px solid var(--border-color);
              transition: background-color 0.3s, box-shadow 0.3s;
            }
            html.light .glass-card {
              background-color: rgba(255, 255, 255, 0.7);
              box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
            }
            html.dark .glass-card {
              background-color: rgba(22, 27, 34, 0.7);
              box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
            }

            /* Sidebar.jsx */
            .sidebar {
              width: 16rem;
              flex-shrink: 0;
              background-color: var(--bg-secondary);
              border-right: 1px solid var(--border-color);
              padding: 1.5rem 1rem;
              display: none;
              flex-direction: column;
              transition: background-color 0.3s, border-color 0.3s;
            }
            @media (min-width: 768px) {
              .sidebar {
                display: flex;
              }
            }
            .sidebar-header {
              font-size: 1.75rem;
              font-weight: 700;
              margin-bottom: 2.5rem;
              padding: 0 0.5rem;
              color: var(--header-color);
            }
            .sidebar-link {
              display: flex;
              align-items: center;
              padding: 0.75rem 1rem;
              margin: 0.25rem 0;
              border-radius: 0.5rem;
              transition: all 0.2s;
              color: var(--text-secondary);
              width: 100%;
              font-weight: 500;
            }
            .sidebar-link:hover {
              color: var(--text-primary);
              background-color: rgba(139, 92, 246, 0.08);
            }
            html.dark .sidebar-link:hover {
              background-color: rgba(167, 139, 250, 0.1);
            }
            .sidebar-link.active {
              background-color: rgba(139, 92, 246, 0.15);
              color: var(--header-color);
              font-weight: 600;
            }
            html.dark .sidebar-link.active {
              background-color: rgba(167, 139, 250, 0.2);
              color: var(--purple-dark);
            }


            /* MobileNav.jsx */
            .mobile-nav {
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              border-top: 1px solid var(--border-color);
              display: flex;
              justify-content: space-around;
              padding: 0.5rem;
              backdrop-filter: blur(16px) saturate(180%);
              background-color: rgba(255, 255, 255, 0.8);
            }
            html.dark .mobile-nav {
              background-color: rgba(22, 27, 34, 0.8);
            }
            @media (min-width: 768px) {
              .mobile-nav {
                display: none;
              }
            }
            .mobile-nav-link {
              display: flex;
              flex-direction: column;
              align-items: center;
              font-size: 0.75rem;
              color: var(--text-secondary);
              transition: color 0.2s;
              padding: 0.25rem 0.5rem;
              border-radius: 0.5rem;
            }
            .mobile-nav-link:hover {
              color: var(--text-primary);
            }
            .mobile-nav-link.active {
              color: var(--header-color);
            }

            /* ChartTooltip.jsx */
            .chart-tooltip {
              padding: 0.75rem;
              font-size: 0.875rem;
              backdrop-filter: blur(8px);
              border-radius: 0.5rem;
              border: 1px solid var(--border-color);
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            html.light .chart-tooltip {
              background-color: rgba(255, 255, 255, 0.8);
            }
            html.dark .chart-tooltip {
              background-color: rgba(31, 41, 55, 0.8);
            }
            .chart-tooltip .label {
              color: var(--text-secondary);
              font-weight: 600;
              margin-bottom: 0.25rem;
            }

            /* --- PAGE-SPECIFIC STYLES --- */
            .page-container {
              width: 100%;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 1rem;
            }
            .radial-background {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: -1;
            }
            html.light .radial-background {
              background-image: radial-gradient(circle at center, rgba(167, 139, 250, 0.05) 0%, transparent 40%);
            }
            html.dark .radial-background {
              background-image: radial-gradient(circle at center, rgba(167, 139, 250, 0.1) 0%, transparent 40%);
            }
            .page-header {
              text-align: center;
              z-index: 10;
              margin-bottom: 3rem;
            }
            .page-header h1 {
              font-size: 3.5rem;
              font-weight: 800;
              color: var(--header-color);
              letter-spacing: -0.025em;
            }
            .page-header p {
              font-size: 1.125rem;
              color: var(--text-secondary);
              margin-top: 1rem;
              max-width: 400px;
            }
            .page-subheader {
              font-size: 1.25rem;
              font-weight: 400;
              color: var(--text-secondary);
              margin-bottom: 2rem;
            }
            .page-footer {
              position: absolute;
              bottom: 1.5rem;
              text-align: center;
              z-index: 10;
            }
            .footer-link {
              color: var(--text-secondary);
              transition: color 0.3s;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 0.5rem;
            }
            .footer-link:hover {
              color: var(--cyan-dark);
            }

            .dashboard-container {
              padding: 1.5rem;
            }
            @media (min-width: 640px) {
              .dashboard-container {
                padding: 2.5rem;
              }
            }
            .dashboard-header {
              font-size: 2.25rem;
              font-weight: 700;
              color: var(--text-primary);
              margin-bottom: 2.5rem;
            }
            .card-header {
              font-size: 1.125rem;
              font-weight: 600;
              color: var(--text-primary);
              margin-bottom: 1rem;
            }

            .font-inter { font-family: 'Inter', sans-serif; }
            .w-full { width: 100%; }
            .max-w-md { max-width: 28rem; }
            .text-center { text-align: center; }
            .z-10 { z-index: 10; }
            .space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem; }
            .mr-2 { margin-right: 0.5rem; }
            .h-5 { height: 1.25rem; }
            .w-5 { width: 1.25rem; }
            .animate-spin { animation: spin 1s linear infinite; }
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
        {renderContent()}
    </div>
  );
}
