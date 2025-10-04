import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface SaleCountdownProps {
  endDate: string;
  className?: string;
}

export default function SaleCountdown({ endDate, className = '' }: SaleCountdownProps) {
  const [timeLeft, setTimeLeft] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const end = new Date(endDate).getTime();
      const now = new Date().getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft('Скидка закончилась');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setIsUrgent(hours < 24);

      if (hours >= 24) {
        const days = Math.floor(hours / 24);
        setTimeLeft(`${days}д ${hours % 24}ч`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}ч ${minutes}м`);
      } else {
        setTimeLeft(`${minutes}м ${seconds}с`);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  if (!timeLeft || timeLeft === 'Скидка закончилась') {
    return null;
  }

  return (
    <Badge
      className={`${
        isUrgent
          ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white animate-pulse'
          : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
      } ${className}`}
    >
      <Icon name="Clock" size={12} className="mr-1" />
      {timeLeft}
    </Badge>
  );
}
