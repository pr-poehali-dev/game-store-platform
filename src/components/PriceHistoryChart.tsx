import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { PriceHistory } from '@/types';

interface PriceHistoryChartProps {
  gameId: number;
}

export default function PriceHistoryChart({ gameId }: PriceHistoryChartProps) {
  const [history, setHistory] = useState<PriceHistory[]>([]);
  const [stats, setStats] = useState<{ min_price: number; max_price: number; avg_price: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`https://functions.poehali.dev/a75f78fa-3d8f-49c2-8bb7-d71e8446f46f?game_id=${gameId}`);
        const data = await res.json();
        setHistory(data.history || []);
        setStats(data.stats);
      } catch (error) {
        console.error('Failed to fetch price history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [gameId]);

  if (loading) {
    return (
      <Card className="bg-card/80 border-border">
        <CardHeader>
          <CardTitle className="text-sm">История цен</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">Загрузка...</div>
        </CardContent>
      </Card>
    );
  }

  if (history.length === 0) {
    return (
      <Card className="bg-card/80 border-border">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Icon name="TrendingDown" size={16} className="text-neon-purple" />
            История цен
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            История цен пока не доступна
          </div>
        </CardContent>
      </Card>
    );
  }

  const maxPrice = Math.max(...history.map(h => h.price));

  return (
    <Card className="bg-card/80 border-border">
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Icon name="TrendingDown" size={16} className="text-neon-purple" />
          История цен (30 дней)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-32 relative">
          <div className="absolute inset-0 flex items-end justify-between gap-1">
            {history.map((item, idx) => {
              const height = (item.price / maxPrice) * 100;
              return (
                <div
                  key={idx}
                  className="flex-1 bg-gradient-to-t from-neon-purple to-neon-purple/50 rounded-t group relative"
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-background border border-border rounded px-2 py-1 text-xs whitespace-nowrap z-10">
                    <div className="font-bold">{item.price} ₽</div>
                    <div className="text-muted-foreground">{new Date(item.date).toLocaleDateString('ru-RU')}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {stats && (
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center p-2 bg-background/50 rounded">
              <div className="text-green-500 font-bold">{stats.min_price} ₽</div>
              <div className="text-muted-foreground">Минимум</div>
            </div>
            <div className="text-center p-2 bg-background/50 rounded">
              <div className="text-blue-500 font-bold">{stats.avg_price.toFixed(0)} ₽</div>
              <div className="text-muted-foreground">Средняя</div>
            </div>
            <div className="text-center p-2 bg-background/50 rounded">
              <div className="text-red-500 font-bold">{stats.max_price} ₽</div>
              <div className="text-muted-foreground">Максимум</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
