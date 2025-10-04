import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { CashbackBalance } from '@/types';

interface CashbackDisplayProps {
  userId: number;
}

export default function CashbackDisplay({ userId }: CashbackDisplayProps) {
  const [balance, setBalance] = useState<CashbackBalance | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch('https://functions.poehali.dev/4a283c69-5bfe-4d26-ab96-8ef99bbdcf0c', {
          headers: { 'X-User-Id': userId.toString() }
        });
        const data = await res.json();
        setBalance(data);
      } catch (error) {
        console.error('Failed to fetch cashback:', error);
      }
    };

    fetchBalance();
  }, [userId]);

  if (!balance) return null;

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="bg-gradient-to-br from-green-600/20 to-green-500/10 border-green-500/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Icon name="Wallet" size={16} className="text-green-500" />
            Кешбэк
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">
            {balance.cashback_balance.toLocaleString()} ₽
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Можно использовать при покупке
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border-purple-500/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Icon name="Star" size={16} className="text-purple-500" />
            Бонусы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-500">
            {balance.bonus_points.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Бонусные баллы
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
