import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

interface Game {
  id: number;
  title: string;
  platform: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
  rating: number;
  release_year: number;
  discount?: number;
  isHot?: boolean;
  isNew?: boolean;
  region?: string;
}

interface GamesSectionProps {
  filteredGames: Game[];
  categories: string[];
  platformFilter: string;
  setPlatformFilter: (filter: string) => void;
  categoryFilter: string;
  setCategoryFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addToCart: (item: Game, type: 'game') => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

export default function GamesSection({
  filteredGames,
  categories,
  platformFilter,
  setPlatformFilter,
  categoryFilter,
  setCategoryFilter,
  searchQuery,
  setSearchQuery,
  addToCart,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
}: GamesSectionProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>(priceRange);
  const [onlyDiscounts, setOnlyDiscounts] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlyHot, setOnlyHot] = useState(false);

  return (
    <section id="games" className="py-16 bg-background">
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
          {filteredGames.map((game, idx) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <Card className="group overflow-hidden border-border bg-card hover:border-neon-green/50 transition-all duration-300 hover:glow-green h-full"
            >
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={game.image_url} 
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {game.discount && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-red-600 text-white font-bold text-sm px-3 py-1 animate-pulse">
                      -{game.discount}%
                    </Badge>
                  </div>
                )}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  {game.isNew && (
                    <Badge className="bg-neon-pink text-white font-semibold">
                      NEW
                    </Badge>
                  )}
                  {game.isHot && (
                    <Badge className="bg-orange-500 text-white font-semibold">
                      🔥 ХИТ
                    </Badge>
                  )}
                  <Badge 
                    className={
                      game.platform === 'Xbox' 
                        ? 'bg-xbox text-white' 
                        : game.platform === 'PlayStation'
                        ? 'bg-playstation text-white'
                        : 'bg-neon-purple text-white'
                    }
                  >
                    {game.platform}
                  </Badge>
                </div>
                {game.rating > 0 && (
                  <div className="absolute bottom-2 left-2">
                    <Badge className="bg-background/90 text-neon-green border-neon-green">
                      <Icon name="Star" size={12} className="mr-1" />
                      {game.rating}
                    </Badge>
                  </div>
                )}
                {game.region && (
                  <div className="absolute bottom-2 right-2">
                    <Badge className="bg-blue-600 text-white text-xs">
                      {game.region}
                    </Badge>
                  </div>
                )}
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-1">{game.title}</CardTitle>
                <CardDescription className="line-clamp-2 text-xs">{game.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between pt-0">
                <div className="flex flex-col">
                  {game.discount ? (
                    <>
                      <div className="text-sm text-muted-foreground line-through">{game.price}₽</div>
                      <div className="text-xl font-bold text-neon-green">
                        {Math.round(game.price * (1 - game.discount / 100))}₽
                      </div>
                    </>
                  ) : (
                    <div className="text-xl font-bold text-neon-green">
                      {game.price === 0 ? 'FREE' : `${game.price}₽`}
                    </div>
                  )}
                </div>
                <Button 
                  size="sm"
                  className="bg-neon-pink text-white hover:bg-neon-pink/90"
                  onClick={() => addToCart(game, 'game')}
                >
                  <Icon name="ShoppingCart" size={14} className="mr-1" />
                  Купить
                </Button>
              </CardFooter>
            </Card>
            </motion.div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Icon name="Search" size={48} className="mx-auto mb-4 opacity-50" />
            <p>Игры не найдены</p>
          </div>
        )}
      </div>
    </section>
  );
}