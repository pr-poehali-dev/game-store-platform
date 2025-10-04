import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { motion, AnimatePresence } from 'framer-motion';
import { Game } from '@/types';

interface PriceTrackerProps {
  favorites: number[];
  games: Game[];
  onBuy: (game: Game) => void;
}

interface PriceAlert {
  gameId: number;
  oldPrice: number;
  newPrice: number;
  timestamp: Date;
}

export default function PriceTracker({ favorites, games, onBuy }: PriceTrackerProps) {
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const favoriteGames = games.filter(g => favorites.includes(g.id));
  const gamesWithDiscounts = favoriteGames.filter(g => g.discount && g.discount > 0);

  useEffect(() => {
    const checkPrices = () => {
      const newAlerts: PriceAlert[] = [];
      
      favoriteGames.forEach(game => {
        if (game.discount && game.discount > 0) {
          const discountedPrice = Math.round(game.price * (1 - game.discount / 100));
          const existingAlert = priceAlerts.find(a => a.gameId === game.id);
          
          if (!existingAlert) {
            newAlerts.push({
              gameId: game.id,
              oldPrice: game.price,
              newPrice: discountedPrice,
              timestamp: new Date()
            });
          }
        }
      });

      if (newAlerts.length > 0) {
        setPriceAlerts(prev => [...newAlerts, ...prev].slice(0, 10));
      }
    };

    if (favoriteGames.length > 0) {
      checkPrices();
    }
  }, [favorites, games]);

  if (favoriteGames.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-50 max-w-md"
    >
      <Card className="bg-card/95 backdrop-blur-xl border-neon-green/30 shadow-2xl shadow-neon-green/10">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg flex items-center gap-2">
                <Icon name="TrendingDown" size={20} className="text-neon-green" />
                Отслеживание цен
                {gamesWithDiscounts.length > 0 && (
                  <Badge className="bg-red-600 text-white animate-pulse">
                    {gamesWithDiscounts.length}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="text-xs mt-1">
                Отслеживаем {favoriteGames.length} {favoriteGames.length === 1 ? 'игру' : 'игр'} из избранного
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Icon name={isExpanded ? "ChevronDown" : "ChevronUp"} size={16} />
            </Button>
          </div>
        </CardHeader>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {gamesWithDiscounts.length > 0 ? (
                  <>
                    <div className="flex items-center gap-2 text-sm text-neon-green mb-3">
                      <Icon name="Bell" size={14} />
                      <span className="font-semibold">Снижение цены!</span>
                    </div>
                    {gamesWithDiscounts.map((game) => {
                      const discountedPrice = Math.round(game.price * (1 - (game.discount || 0) / 100));
                      const savings = game.price - discountedPrice;
                      
                      return (
                        <motion.div
                          key={game.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-3 rounded-lg bg-gradient-to-r from-neon-green/10 to-transparent border border-neon-green/30"
                        >
                          <div className="flex items-start gap-3">
                            <img
                              src={game.image_url}
                              alt={game.title}
                              className="w-16 h-16 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm line-clamp-1">{game.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-lg font-bold text-neon-green">{discountedPrice}₽</span>
                                <span className="text-xs text-muted-foreground line-through">{game.price}₽</span>
                                <Badge className="bg-red-600 text-white text-xs">-{game.discount}%</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Экономия {savings}₽
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="w-full mt-2 bg-gradient-to-r from-neon-purple to-neon-pink"
                            onClick={() => onBuy(game)}
                          >
                            <Icon name="ShoppingCart" size={14} className="mr-1" />
                            Купить
                          </Button>
                        </motion.div>
                      );
                    })}
                  </>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <Icon name="Bell" size={32} className="mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Пока нет скидок</p>
                    <p className="text-xs mt-1">Мы уведомим вас о снижении цен</p>
                  </div>
                )}

                {priceAlerts.length > 0 && gamesWithDiscounts.length === 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">История снижений:</p>
                    {priceAlerts.slice(0, 3).map((alert, idx) => {
                      const game = games.find(g => g.id === alert.gameId);
                      if (!game) return null;
                      
                      return (
                        <div key={idx} className="text-xs text-muted-foreground p-2 rounded bg-muted/50">
                          <p className="font-medium">{game.title}</p>
                          <p>{alert.oldPrice}₽ → {alert.newPrice}₽</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
