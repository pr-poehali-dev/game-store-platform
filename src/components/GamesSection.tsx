import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';
import { useState } from 'react';
import GameCard from './GameCard';
import { Game } from '@/types';

interface GamesSectionProps {
  filteredGames: Game[];
  categories: string[];
  franchises: string[];
  platformFilter: string;
  setPlatformFilter: (filter: string) => void;
  categoryFilter: string;
  setCategoryFilter: (filter: string) => void;
  franchiseFilter: string;
  setFranchiseFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addToCart: (item: Game, type: 'game') => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  favorites: number[];
  onToggleFavorite: (gameId: number) => void;
  onViewGame: (game: Game) => void;
}

export default function GamesSection({
  filteredGames,
  categories,
  franchises,
  platformFilter,
  setPlatformFilter,
  categoryFilter,
  setCategoryFilter,
  franchiseFilter,
  setFranchiseFilter,
  searchQuery,
  setSearchQuery,
  addToCart,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  favorites,
  onToggleFavorite,
  onViewGame,
}: GamesSectionProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>(priceRange);
  const [onlyDiscounts, setOnlyDiscounts] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlyHot, setOnlyHot] = useState(false);
  const [onlyWithReviews, setOnlyWithReviews] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);

  return (
    <section id="games" className="py-0 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-4xl font-bold">Каталог игр</h3>
            <p className="text-muted-foreground mt-1">
              {filteredGames.length} {filteredGames.length === 1 ? 'игра' : 'игр'} найдено
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <Input 
              placeholder="Поиск игр..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="md:w-64"
            />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="md:w-40">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={franchiseFilter} onValueChange={setFranchiseFilter}>
              <SelectTrigger className="md:w-44">
                <SelectValue placeholder="Франшиза" />
              </SelectTrigger>
              <SelectContent>
                {franchises.map(franchise => (
                  <SelectItem key={franchise} value={franchise}>{franchise}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="md:w-44">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">По умолчанию</SelectItem>
                <SelectItem value="price-asc">Цена ↑</SelectItem>
                <SelectItem value="price-desc">Цена ↓</SelectItem>
                <SelectItem value="rating">Рейтинг ↓</SelectItem>
                <SelectItem value="year">Новые ↓</SelectItem>
                <SelectItem value="discount">Скидки ↓</SelectItem>
                <SelectItem value="name">По названию</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="border-neon-purple/30">
                  <Icon name="Filter" size={16} className="mr-2" />
                  Фильтры
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-card border-border">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold mb-3 flex items-center justify-between">
                      Диапазон цен: {priceRange[0]}-{priceRange[1]}₽
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 text-xs"
                        onClick={() => setPriceRange([0, 10000])}
                      >
                        Сбросить
                      </Button>
                    </Label>
                    <Slider
                      min={0}
                      max={5000}
                      step={100}
                      value={tempPriceRange}
                      onValueChange={(value) => setTempPriceRange(value as [number, number])}
                      onValueCommit={(value) => setPriceRange(value as [number, number])}
                      className="mt-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Дополнительно</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="only-discounts" 
                        checked={onlyDiscounts}
                        onCheckedChange={(checked) => setOnlyDiscounts(checked as boolean)}
                      />
                      <label htmlFor="only-discounts" className="text-sm cursor-pointer">
                        Только со скидками
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="only-new" 
                        checked={onlyNew}
                        onCheckedChange={(checked) => setOnlyNew(checked as boolean)}
                      />
                      <label htmlFor="only-new" className="text-sm cursor-pointer">
                        Только новинки
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="only-hot" 
                        checked={onlyHot}
                        onCheckedChange={(checked) => setOnlyHot(checked as boolean)}
                      />
                      <label htmlFor="only-hot" className="text-sm cursor-pointer">
                        Только хиты
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="only-reviews" 
                        checked={onlyWithReviews}
                        onCheckedChange={(checked) => setOnlyWithReviews(checked as boolean)}
                      />
                      <label htmlFor="only-reviews" className="text-sm cursor-pointer">
                        Только с отзывами
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Минимальный рейтинг</Label>
                    <Select value={minRating.toString()} onValueChange={(val) => setMinRating(Number(val))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Любой</SelectItem>
                        <SelectItem value="7">7+ ⭐</SelectItem>
                        <SelectItem value="8">8+ ⭐⭐</SelectItem>
                        <SelectItem value="9">9+ ⭐⭐⭐</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Tabs value={platformFilter} onValueChange={setPlatformFilter} className="mb-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="All">Все платформы</TabsTrigger>
            <TabsTrigger value="Xbox" className="data-[state=active]:bg-xbox data-[state=active]:text-white">
              <Icon name="Gamepad2" size={16} className="mr-2" />
              Xbox
            </TabsTrigger>
            <TabsTrigger value="PlayStation" className="data-[state=active]:bg-playstation data-[state=active]:text-white">
              <Icon name="Gamepad" size={16} className="mr-2" />
              PlayStation
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGames
            .filter(game => {
              if (onlyDiscounts && !game.discount) return false;
              if (onlyNew && !game.isNew) return false;
              if (onlyHot && !game.isHot) return false;
              if (onlyWithReviews && (!game.reviewCount || game.reviewCount === 0)) return false;
              if (minRating > 0 && game.rating < minRating) return false;
              return true;
            })
            .map((game, idx) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <GameCard 
                game={game}
                onBuy={(g) => addToCart(g, 'game')}
                isFavorite={favorites.includes(game.id)}
                onToggleFavorite={onToggleFavorite}
                onView={onViewGame}
              />
            </motion.div>
          ))}
        </div>

        {filteredGames
            .filter(game => {
              if (onlyDiscounts && !game.discount) return false;
              if (onlyNew && !game.isNew) return false;
              if (onlyHot && !game.isHot) return false;
              if (onlyWithReviews && (!game.reviewCount || game.reviewCount === 0)) return false;
              if (minRating > 0 && game.rating < minRating) return false;
              return true;
            }).length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Icon name="Search" size={48} className="mx-auto mb-4 opacity-50" />
            <p>Игры не найдены</p>
          </div>
        )}
      </div>
    </section>
  );
}