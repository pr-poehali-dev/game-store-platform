import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Currency, Transaction } from '@/types/economy';
import { useState } from 'react';
import { Button } from './ui/button';

interface CurrencyDisplayProps {
  currency: Currency;
  transactions: Transaction[];
  onOpenShop: () => void;
}

export const CurrencyDisplay = ({ currency, transactions, onOpenShop }: CurrencyDisplayProps) => {
  const [showHistory, setShowHistory] = useState(false);

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">GCoins</p>
              <p className="text-3xl font-bold flex items-center gap-2">
                <Icon name="Coins" size={32} className="text-yellow-500" />
                {currency.coins.toLocaleString()}
              </p>
            </div>
            <Button onClick={onOpenShop} variant="outline" size="sm">
              <Icon name="ShoppingBag" size={16} className="mr-2" />
              Магазин
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Гемы</p>
              <p className="text-3xl font-bold flex items-center gap-2">
                <Icon name="Gem" size={32} className="text-purple-500" />
                {currency.gems.toLocaleString()}
              </p>
            </div>
            <div className="text-xs text-muted-foreground text-right">
              <p>Премиум валюта</p>
              <p>за достижения</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">История транзакций</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? 'Скрыть' : 'Показать всё'}
        </Button>
      </div>

      {showHistory && (
        <Card className="p-4">
          {recentTransactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Пока нет транзакций
            </p>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        transaction.type === 'earn'
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-red-500/20 text-red-500'
                      }`}
                    >
                      <Icon
                        name={transaction.type === 'earn' ? 'TrendingUp' : 'TrendingDown'}
                        size={16}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{transaction.reason}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.timestamp).toLocaleString('ru')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-lg font-bold ${
                        transaction.type === 'earn' ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {transaction.type === 'earn' ? '+' : '-'}
                      {transaction.amount}
                    </span>
                    <Icon
                      name={transaction.currency === 'coins' ? 'Coins' : 'Gem'}
                      size={20}
                      className={
                        transaction.currency === 'coins' ? 'text-yellow-500' : 'text-purple-500'
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
