import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';

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
}: GamesSectionProps) {
  return (
    <section id="games" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <h3 className="text-4xl font-bold">Каталог игр</h3>
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
                <div className="absolute top-2 right-2">
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
                <div className="absolute top-2 left-2">
                  <Badge className="bg-background/90 text-neon-green border-neon-green">
                    <Icon name="Star" size={12} className="mr-1" />
                    {game.rating}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-1">{game.title}</CardTitle>
                <CardDescription className="line-clamp-2 text-xs">{game.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between pt-0">
                <div className="text-xl font-bold text-neon-green">{game.price}₽</div>
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