import React, { useState, useEffect } from 'react';
import DashboardCard from './DashboardCard';
import { Clock } from 'lucide-react';

export default function RepaymentTimer({ dueDate }) {
  const [timeLeft, setTimeLeft] = useState('');
  useEffect(() => {
    if (!dueDate) return;
    const interval = setInterval(() => {
      const now = new Date();
      const diff = new Date(dueDate).getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft('Overdue');
        clearInterval(interval);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${days}d ${hours}h ${minutes}m left`);
    }, 1000);
    return () => clearInterval(interval);
  }, [dueDate]);
  const isUrgent = dueDate ? (new Date(dueDate).getTime() - new Date().getTime()) < 3 * 24 * 60 * 60 * 1000 : false;
  return (
    <DashboardCard
      icon={Clock}
      title="Repayment Due In"
      value={timeLeft || '...'}
      subtext={dueDate ? `Due on ${new Date(dueDate).toLocaleDateString()}` : '...'}
      colorClass={isUrgent ? 'text-red-500 dark:text-red-400' : 'text-cyan-500 dark:text-cyan-400'}
    />
  );
}