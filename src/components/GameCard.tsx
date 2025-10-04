import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';
import { Game } from '@/types';
import PriceComparison from './PriceComparison';

interface GameCardProps {
  game: Game;
  onBuy: (game: Game) => void;
  isFavorite: boolean;
  onToggleFavorite: (gameId: number) => void;
  onView: (game: Game) => void;
}

export default function GameCard({ game, onBuy, isFavorite, onToggleFavorite, onView }: GameCardProps) {
  const isNew = new Date().getFullYear() - game.release_year <= 1;
  const isHot = game.rating >= 8.5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      onClick={() => onView(game)}
      className="cursor-pointer"
    >
      <Card className="h-full bg-card/50 backdrop-blur-sm border-border hover:border-neon-purple/50 transition-all duration-300 overflow-hidden group">
        <div className="relative overflow-hidden">
          <img 
            src={game.image_url} 
            alt={game.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {game.discount && game.discount > 0 && (
              <Badge className="bg-red-600 text-white border-0">-{game.discount}%</Badge>
            )}
            {isNew && (
              <Badge className="bg-neon-green text-background border-0">NEW</Badge>
            )}
            {isHot && (
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">🔥 ХИТ</Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-background/80 hover:bg-background backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(game.id);
            }}
          >
            <Icon 
              name={isFavorite ? "Heart" : "Heart"} 
              size={16} 
              className={isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"} 
            />
          </Button>

          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md">
              <Icon name="Star" size={14} className="text-yellow-500" />
              <span className="text-xs font-semibold">{game.rating}/10</span>
            </div>
            <div className="flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md">
              <Icon name="Calendar" size={14} className="text-muted-foreground" />
              <span className="text-xs">{game.release_year}</span>
            </div>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg line-clamp-1">{game.title}</CardTitle>
            <Badge variant="outline" className="shrink-0 text-xs">
              {game.platform === 'Both' ? '🎮 All' : game.platform === 'Xbox' ? '🟢 Xbox' : '🔵 PS'}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2 text-sm">
            {game.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              {game.discount && game.discount > 0 ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-neon-green">
                    {Math.round(game.price * (1 - game.discount / 100))}₽
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    {game.price}₽
                  </span>
                </div>
              ) : (
                <span className="text-lg font-bold text-neon-green">{game.price}₽</span>
              )}
            </div>
            <Badge variant="secondary" className="text-xs">
              {game.category}
            </Badge>
          </div>
          
          {game.competitorPrices && game.competitorPrices.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Icon name="TrendingDown" size={12} className="text-neon-green" />
                <span>Выгоднее на {Math.round(game.competitorPrices[0].price - (game.discount ? Math.round(game.price * (1 - game.discount / 100)) : game.price))}₽</span>
              </div>
              <div className="flex items-center gap-1 text-xs opacity-60">
                <Icon name="Store" size={10} />
                <span>чем в {game.competitorPrices[0].store}</span>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0">
          <Button 
            className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 transition-all group-hover:shadow-lg group-hover:shadow-neon-purple/50"
            onClick={(e) => {
              e.stopPropagation();
              onBuy(game);
            }}
          >
            <Icon name="ShoppingCart" size={16} className="mr-2" />
            Купить сейчас
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}