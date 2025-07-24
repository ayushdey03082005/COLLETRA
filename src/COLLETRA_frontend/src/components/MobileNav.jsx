import React from 'react';
import { Home, FileText, ShieldCheck, TrendingUp, Briefcase, BarChart2, Users, DollarSign, LogOut } from 'lucide-react';

const MobileNav = ({ role, currentPage, setPage, onLogout }) => {
    const navItems = {
        borrower: [
            { name: 'Home', icon: Home, page: 'borrower/dashboard' },
            { name: 'Apply', icon: FileText, page: 'borrower/apply' },
            { name: 'Health', icon: ShieldCheck, page: 'borrower/health' }
        ],
        lender: [
            { name: 'Home', icon: Home, page: 'lender/dashboard' },
            { name: 'Invest', icon: TrendingUp, page: 'lender/invest' },
            { name: 'Portfolio', icon: Briefcase, page: 'lender/portfolio' }
        ],
        admin: [
            { name: 'Overview', icon: BarChart2, page: 'admin/dashboard' },
            { name: 'Users', icon: Users, page: 'admin/users' },
            { name: 'Loans', icon: DollarSign, page: 'admin/loans' }
        ],
    };

    const currentNav = navItems[role] || [];

    return (
        <nav className="mobile-nav md:hidden fixed bottom-0 left-0 right-0 flex justify-around p-2 text-gray-600 dark:text-gray-300">
            {currentNav.map(item => (
                <a 
                    key={item.name} 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); setPage(item.page); }} 
                    className={`mobile-nav-item flex flex-col items-center text-xs transition-colors duration-200 ${
                        currentPage === item.page ? 'active' : ''
                    }`}
                >
                    <item.icon className="h-6 w-6 mb-1" />
                    <span>{item.name}</span>
                </a>
            ))}
            <button 
                onClick={onLogout} 
                className="mobile-nav-item flex flex-col items-center text-xs"
            >
                <LogOut className="h-6 w-6 mb-1" />
                <span>Logout</span>
            </button>
        </nav>
    );
};

export default MobileNav;