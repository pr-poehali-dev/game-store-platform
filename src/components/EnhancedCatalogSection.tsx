import { useState, useMemo } from 'react';
import { AdvancedFilters, FilterState } from './AdvancedFilters';
import { SmartSearch } from './SmartSearch';
import { Game } from '@/data/games';
import GameCard from './GameCard';

interface EnhancedCatalogSectionProps {
  games: Game[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onViewGame: (game: Game) => void;
  onAddToCart: (item: any, type: 'game' | 'subscription') => void;
}

export const EnhancedCatalogSection = ({
  games,
  favorites,
  onToggleFavorite,
  onViewGame,
  onAddToCart,
}: EnhancedCatalogSectionProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    platforms: [],
    priceRange: [0, 10000],
    minRating: 0,
    releaseYears: [],
    sortBy: 'popularity',
  });

  const filteredAndSortedGames = useMemo(() => {
    const result = games.filter((game) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          game.title.toLowerCase().includes(query) ||
          game.category.toLowerCase().includes(query) ||
          game.description?.toLowerCase().includes(query) ||
          game.developer?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      if (filters.categories.length > 0 && !filters.categories.includes(game.category)) {
        return false;
      }

      if (filters.platforms.length > 0 && !filters.platforms.includes(game.platform)) {
        return false;
      }

      if (game.price < filters.priceRange[0] || game.price > filters.priceRange[1]) {
        return false;
      }

      if (filters.minRating > 0 && game.rating < filters.minRating) {
        return false;
      }

      if (filters.releaseYears.length > 0 && !filters.releaseYears.includes(game.release_year)) {
        return false;
      }

      return true;
    });

    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.release_year - a.release_year);
        break;
      case 'popularity':
      default:
        result.sort((a, b) => {
          const aScore = (a.isHot ? 100 : 0) + (a.isNew ? 50 : 0) + a.rating * 10;
          const bScore = (b.isHot ? 100 : 0) + (b.isNew ? 50 : 0) + b.rating * 10;
          return bScore - aScore;
        });
    }

    return result;
  }, [games, searchQuery, filters]);

  const handleResetFilters = () => {
    setFilters({
      categories: [],
      platforms: [],
      priceRange: [0, 10000],
      minRating: 0,
      releaseYears: [],
      sortBy: 'popularity',
    });
    setSearchQuery('');
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6" id="games">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Каталог игр</h2>
        
        <SmartSearch
          games={games}
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />

        <AdvancedFilters
          filters={filters}
          onFiltersChange={setFilters}
          onReset={handleResetFilters}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Найдено игр: {filteredAndSortedGames.length}
        </p>
      </div>

      {filteredAndSortedGames.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🎮</div>
          <h3 className="text-xl font-semibold mb-2">Игры не найдены</h3>
          <p className="text-muted-foreground mb-4">
            Попробуйте изменить фильтры или поисковый запрос
          </p>
          <button
            onClick={handleResetFilters}
            className="text-primary hover:underline"
          >
            Сбросить все фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredAndSortedGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isFavorite={favorites.includes(game.id)}
              onToggleFavorite={onToggleFavorite}
              onView={() => onViewGame(game)}
              onBuy={() => onAddToCart(game, 'game')}
            />
          ))}
        </div>
      )}
    </div>
  );
};