import React from 'react';
import GlassCard from '../components/GlassCard';

const transactionHistory = [
    { id: 't001', action: 'Loan Requested', amount: 10000, date: '2024-07-20', status: 'Pending' },
    { id: 't002', action: 'Loan Funded', amount: 8000, date: '2024-07-18', status: 'Complete' },
    { id: 't003', action: 'Repayment', amount: 500, date: '2024-07-15', status: 'Complete' },
    { id: 't004', action: 'Collateral Sold', amount: 12000, date: '2024-07-12', status: 'Liquidated' },
];

const ProfilePage = () => {
    return (
        <div className="p-4 sm:p-8 space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Profile & History</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">User Details</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">User ID:</span>
                            <span className="font-mono text-gray-800 dark:text-white">usr_...c4f3</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Linked Wallet:</span>
                            <span className="font-mono text-gray-800 dark:text-white">0x...aBcDeF</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 dark:text-gray-400">Notifications:</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" defaultChecked/>
                                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                            </label>
                        </div>
                    </div>
                </GlassCard>
                <GlassCard>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Account Security</h3>
                    <div className="space-y-3">
                         <button className="w-full text-left text-sm py-2 px-3 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-300/70 dark:hover:bg-gray-700/50 text-gray-800 dark:text-white">
                             Change Password
                         </button>
                         <button className="w-full text-left text-sm py-2 px-3 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-300/70 dark:hover:bg-gray-700/50 text-gray-800 dark:text-white">
                             Enable 2FA
                         </button>
                    </div>
                </GlassCard>
            </div>
            <GlassCard>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Transaction History</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-purple-500/20">
                                <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Action</th>
                                <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Amount</th>
                                <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Date</th>
                                <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionHistory.map(tx => (
                                <tr key={tx.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50">
                                    <td className="p-3 text-gray-800 dark:text-white">{tx.action}</td>
                                    <td className="p-3 text-gray-800 dark:text-white">${tx.amount.toLocaleString()}</td>
                                    <td className="p-3 text-gray-500 dark:text-gray-400">{tx.date}</td>
                                    <td className={`p-3 font-semibold ${tx.status === 'Complete' ? 'text-green-600 dark:text-green-400' : tx.status === 'Pending' ? 'text-orange-500 dark:text-orange-400' : 'text-red-500 dark:text-red-400'}`}>{tx.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
};

export default ProfilePage;