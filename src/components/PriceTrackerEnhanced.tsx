import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Game } from '@/data/games';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface TrackedGame {
  game: Game;
  targetPrice: number;
  addedAt: number;
  currentPrice: number;
  lowestPrice: number;
  notified: boolean;
}

interface PriceTrackerEnhancedProps {
  games: Game[];
}

export const PriceTrackerEnhanced = ({ games }: PriceTrackerEnhancedProps) => {
  const { toast } = useToast();
  const [trackedGames, setTrackedGames] = useState<TrackedGame[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [targetPrice, setTargetPrice] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('price-tracker-enhanced');
    if (saved) {
      setTrackedGames(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('price-tracker-enhanced', JSON.stringify(trackedGames));
    checkPriceAlerts();
  }, [trackedGames]);

  const checkPriceAlerts = () => {
    trackedGames.forEach((tracked) => {
      const currentGame = games.find((g) => g.id === tracked.game.id);
      if (!currentGame || tracked.notified) return;

      const currentPrice = currentGame.discount
        ? Math.round(currentGame.price * (1 - currentGame.discount / 100))
        : currentGame.price;

      if (currentPrice <= tracked.targetPrice) {
        toast({
          title: '🎉 Цена достигнута!',
          description: `${tracked.game.title} теперь стоит ${currentPrice}₽!`,
          duration: 10000,
        });

        setTrackedGames((prev) =>
          prev.map((t) =>
            t.game.id === tracked.game.id ? { ...t, notified: true } : t
          )
        );
      }
    });
  };

  const addToTracker = (game: Game, target: number) => {
    const currentPrice = game.discount
      ? Math.round(game.price * (1 - game.discount / 100))
      : game.price;

    const newTracked: TrackedGame = {
      game,
      targetPrice: target,
      addedAt: Date.now(),
      currentPrice,
      lowestPrice: currentPrice,
      notified: false,
    };

    setTrackedGames((prev) => [...prev, newTracked]);
    toast({
      title: '✅ Игра добавлена в трекер',
      description: `Мы уведомим вас, когда цена достигнет ${target}₽`,
    });

    setShowAddDialog(false);
    setSelectedGame(null);
    setTargetPrice('');
  };

  const removeFromTracker = (gameId: number) => {
    setTrackedGames((prev) => prev.filter((t) => t.game.id !== gameId));
    toast({
      title: 'Удалено из трекера',
      description: 'Игра больше не отслеживается',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Icon name="TrendingDown" size={32} className="text-primary" />
            Трекер цен
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Отслеживай цены на любимые игры и получай уведомления
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(!showAddDialog)}>
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить игру
        </Button>
      </div>

      {showAddDialog && (
        <Card className="p-6">
          <h3 className="font-bold mb-4">Добавить игру в трекер</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Выберите игру</label>
              <select
                className="w-full p-2 rounded-md border bg-background"
                value={selectedGame?.id || ''}
                onChange={(e) => {
                  const game = games.find((g) => g.id === parseInt(e.target.value));
                  setSelectedGame(game || null);
                }}
              >
                <option value="">-- Выберите игру --</option>
                {games
                  .filter((g) => !trackedGames.some((t) => t.game.id === g.id))
                  .map((game) => (
                    <option key={game.id} value={game.id}>
                      {game.title} ({game.price}₽)
                    </option>
                  ))}
              </select>
            </div>

            {selectedGame && (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Целевая цена (текущая: {selectedGame.price}₽)
                </label>
                <input
                  type="number"
                  className="w-full p-2 rounded-md border bg-background"
                  placeholder="Введите желаемую цену"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  max={selectedGame.price}
                />
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={() => {
                  if (selectedGame && targetPrice) {
                    addToTracker(selectedGame, parseInt(targetPrice));
                  }
                }}
                disabled={!selectedGame || !targetPrice}
                className="flex-1"
              >
                Добавить
              </Button>
              <Button
                onClick={() => {
                  setShowAddDialog(false);
                  setSelectedGame(null);
                  setTargetPrice('');
                }}
                variant="outline"
              >
                Отмена
              </Button>
            </div>
          </div>
        </Card>
      )}

      {trackedGames.length === 0 ? (
        <Card className="p-12 text-center">
          <Icon name="TrendingDown" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Трекер пуст</h3>
          <p className="text-sm text-muted-foreground">
            Добавьте игры, чтобы отслеживать изменения цен
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {trackedGames.map((tracked) => {
            const game = games.find((g) => g.id === tracked.game.id);
            const currentPrice = game?.discount
              ? Math.round(game.price * (1 - game.discount / 100))
              : game?.price || tracked.currentPrice;

            const priceChange = currentPrice - tracked.currentPrice;
            const percentChange =
              ((currentPrice - tracked.currentPrice) / tracked.currentPrice) * 100;

            const isPriceReached = currentPrice <= tracked.targetPrice;

            return (
              <Card
                key={tracked.game.id}
                className={`p-4 ${isPriceReached ? 'border-green-500 bg-green-500/10' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={tracked.game.image_url || '/api/placeholder/96/96'}
                      alt={tracked.game.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{tracked.game.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Добавлено {new Date(tracked.addedAt).toLocaleDateString('ru')}
                        </p>
                      </div>
                      {isPriceReached && (
                        <Badge className="bg-green-500">
                          <Icon name="Check" size={14} className="mr-1" />
                          Цель достигнута!
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Текущая цена</p>
                        <p className="text-lg font-bold">{currentPrice}₽</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Целевая цена</p>
                        <p className="text-lg font-bold text-primary">
                          {tracked.targetPrice}₽
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Изменение</p>
                        <p
                          className={`text-lg font-bold ${
                            priceChange < 0 ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {priceChange > 0 ? '+' : ''}
                          {priceChange}₽
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">%</p>
                        <p
                          className={`text-lg font-bold ${
                            percentChange < 0 ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {percentChange > 0 ? '+' : ''}
                          {percentChange.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {isPriceReached && (
                      <Button size="sm" className="bg-green-500 hover:bg-green-600">
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        Купить
                      </Button>
                    )}
                    <Button
                      onClick={() => removeFromTracker(tracked.game.id)}
                      variant="outline"
                      size="sm"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PriceTrackerEnhanced;
