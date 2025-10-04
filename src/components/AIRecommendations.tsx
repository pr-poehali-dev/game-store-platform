import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';

interface Game {
  id: number;
  title: string;
  price: number;
  discount?: number;
  genre: string;
  rating?: number;
  imageUrl?: string;
}

interface AIRecommendationsProps {
  games: Game[];
}

interface UserPreferences {
  favoriteGenres: string[];
  priceRange: { min: number; max: number };
  viewedGames: number[];
  purchasedGames: number[];
  wishlist: number[];
}

function getUserPreferences(): UserPreferences {
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const viewHistory = JSON.parse(localStorage.getItem('viewHistory') || '[]');
  const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
  
  return {
    favoriteGenres: [],
    priceRange: { min: 0, max: 10000 },
    viewedGames: viewHistory,
    purchasedGames: purchaseHistory.map((p: any) => p.gameId),
    wishlist: wishlist
  };
}

function calculateRecommendationScore(game: Game, preferences: UserPreferences): number {
  let score = 0;
  
  if (preferences.wishlist.includes(game.id)) {
    score += 50;
  }
  
  if (preferences.viewedGames.includes(game.id)) {
    score += 20;
  }
  
  if (game.rating) {
    score += game.rating * 10;
  }
  
  if (game.discount && game.discount > 0) {
    score += game.discount / 2;
  }
  
  const effectivePrice = game.price * (1 - (game.discount || 0) / 100);
  if (effectivePrice <= preferences.priceRange.max) {
    score += 15;
  }
  
  if (preferences.favoriteGenres.includes(game.genre)) {
    score += 30;
  }
  
  if (!preferences.purchasedGames.includes(game.id)) {
    score += 10;
  } else {
    score = 0;
  }
  
  return score;
}

function getRecommendationReason(game: Game, preferences: UserPreferences): string {
  const reasons: string[] = [];
  
  if (preferences.wishlist.includes(game.id)) {
    reasons.push('В вашем wishlist');
  }
  
  if (game.discount && game.discount >= 50) {
    reasons.push(`Скидка ${game.discount}%`);
  } else if (game.discount && game.discount >= 20) {
    reasons.push('Выгодная цена');
  }
  
  if (game.rating && game.rating >= 4.5) {
    reasons.push('Высокий рейтинг');
  }
  
  if (preferences.viewedGames.includes(game.id)) {
    reasons.push('Вы смотрели');
  }
  
  if (reasons.length === 0) {
    reasons.push('Популярная игра');
  }
  
  return reasons.slice(0, 2).join(' • ');
}

export default function AIRecommendations({ games }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Array<{ game: Game; score: number; reason: string }>>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const preferences = getUserPreferences();
    
    const scored = games
      .map(game => ({
        game,
        score: calculateRecommendationScore(game, preferences),
        reason: getRecommendationReason(game, preferences)
      }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
    
    setRecommendations(scored);
  }, [games]);

  if (recommendations.length === 0) return null;

  const displayedRecs = showAll ? recommendations : recommendations.slice(0, 6);

  return (
    <div className="space-y-4 mb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            🤖 AI рекомендации для вас
          </h2>
          <p className="text-muted-foreground mt-1">
            Персональные предложения на основе ваших предпочтений
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Sparkles" size={16} className="text-accent" />
          <span>Умный подбор</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedRecs.map(({ game, score, reason }, index) => {
          const effectivePrice = Math.round(game.price * (1 - (game.discount || 0) / 100));
          
          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a href={`/game/${game.id}`}>
                <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 hover:border-primary/50 bg-card/80 backdrop-blur-sm overflow-hidden relative">
                  <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                      <Icon name="Sparkles" size={12} className="mr-1" />
                      AI выбор
                    </Badge>
                    {game.discount && game.discount > 0 && (
                      <Badge variant="destructive" className="animate-pulse">
                        -{game.discount}%
                      </Badge>
                    )}
                  </div>
                  
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                    {game.imageUrl ? (
                      <img
                        src={game.imageUrl}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon name="Gamepad2" size={64} className="text-muted-foreground/30" />
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
                      {game.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-xs">
                      <Icon name="Tag" size={12} />
                      {game.genre}
                      {game.rating && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Icon name="Star" size={12} className="text-yellow-500 fill-yellow-500" />
                            <span>{game.rating}</span>
                          </div>
                        </>
                      )}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Lightbulb" size={12} className="text-accent" />
                      <span>{reason}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        {game.discount && game.discount > 0 ? (
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground line-through">
                              {game.price}₽
                            </span>
                            <span className="text-2xl font-bold text-primary">
                              {effectivePrice}₽
                            </span>
                          </div>
                        ) : (
                          <span className="text-2xl font-bold text-foreground">
                            {game.price}₽
                          </span>
                        )}
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-primary to-secondary hover:scale-110 transition-transform"
                      >
                        <Icon name="ShoppingCart" size={14} className="mr-1" />
                        Купить
                      </Button>
                    </div>

                    <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
                      Рейтинг совпадения: {Math.round(score)}%
                    </div>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          );
        })}
      </div>

      {recommendations.length > 6 && (
        <div className="flex justify-center pt-4">
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            size="lg"
            className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/50 hover:scale-105 transition-transform"
          >
            {showAll ? (
              <>
                <Icon name="ChevronUp" size={18} className="mr-2" />
                Скрыть
              </>
            ) : (
              <>
                <Icon name="ChevronDown" size={18} className="mr-2" />
                Показать все ({recommendations.length - 6} ещё)
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
