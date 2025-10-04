import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Game } from '@/types';
import GameCard from './GameCard';
import Icon from '@/components/ui/icon';

interface RecommendedGamesProps {
  games: Game[];
  favorites: number[];
  viewHistory: number[];
  onBuy: (game: Game) => void;
  onToggleFavorite: (gameId: number) => void;
  onViewGame: (game: Game) => void;
}

export default function RecommendedGames({
  games,
  favorites,
  viewHistory,
  onBuy,
  onToggleFavorite,
  onViewGame,
}: RecommendedGamesProps) {
  const recommendedGames = useMemo(() => {
    if (favorites.length === 0 && viewHistory.length === 0) {
      return games
        .filter(g => g.rating >= 8.5 || g.discount && g.discount >= 30)
        .slice(0, 4);
    }

    const userGames = [...new Set([...favorites, ...viewHistory])]
      .map(id => games.find(g => g.id === id))
      .filter(Boolean) as Game[];

    if (userGames.length === 0) {
      return games.slice(0, 4);
    }

    const userCategories = new Set(userGames.map(g => g.category));
    const userPlatforms = new Set(userGames.map(g => g.platform));
    const avgRating = userGames.reduce((sum, g) => sum + g.rating, 0) / userGames.length;

    const scored = games
      .filter(g => !favorites.includes(g.id) && !viewHistory.slice(0, 5).includes(g.id))
      .map(game => {
        let score = 0;

        if (userCategories.has(game.category)) score += 3;
        if (userPlatforms.has(game.platform) || game.platform === 'Both') score += 2;
        if (Math.abs(game.rating - avgRating) <= 1) score += 2;
        if (game.rating >= 8.5) score += 1;
        if (game.discount && game.discount >= 30) score += 1;

        const recentYears = userGames.filter(g => g.release_year >= 2022).length;
        if (recentYears > userGames.length / 2 && game.release_year >= 2022) {
          score += 1;
        }

        return { game, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map(item => item.game);

    return scored.length > 0 ? scored : games.slice(0, 4);
  }, [games, favorites, viewHistory]);

  if (recommendedGames.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-background to-neon-purple/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Sparkles" className="text-neon-pink h-8 w-8" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
              Рекомендуем для вас
            </h2>
            <Icon name="Sparkles" className="text-neon-pink h-8 w-8" />
          </div>
          <p className="text-muted-foreground">
            {favorites.length > 0 || viewHistory.length > 0
              ? 'На основе ваших предпочтений и просмотров'
              : 'Топовые игры с высоким рейтингом и скидками'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedGames.map((game, idx) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <GameCard
                game={game}
                onBuy={onBuy}
                isFavorite={favorites.includes(game.id)}
                onToggleFavorite={onToggleFavorite}
                onView={onViewGame}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
