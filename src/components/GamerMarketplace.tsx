import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface MarketItem {
  id: number;
  title: string;
  game: string;
  description: string;
  price: number;
  seller: string;
  sellerAvatar: string;
  sellerRating: number;
  image: string;
  category: 'account' | 'item' | 'currency' | 'boost';
  isVerified?: boolean;
}

const mockItems: MarketItem[] = [
  {
    id: 1,
    title: 'Аккаунт CS2 — Global Elite',
    game: 'Counter-Strike 2',
    description: '5000 часов игры, все операции, 500+ скинов',
    price: 15000,
    seller: 'ProTrader',
    sellerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Trader',
    sellerRating: 4.9,
    image: 'https://picsum.photos/seed/market1/400/300',
    category: 'account',
    isVerified: true
  },
  {
    id: 2,
    title: 'Valorant Points — 11000 VP',
    game: 'Valorant',
    description: 'Моментальная доставка на ваш аккаунт',
    price: 7500,
    seller: 'GamerShop',
    sellerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shop',
    sellerRating: 5.0,
    image: 'https://picsum.photos/seed/market2/400/300',
    category: 'currency',
    isVerified: true
  },
  {
    id: 3,
    title: 'Буст в рейтинге Dota 2',
    game: 'Dota 2',
    description: 'От Herald до Immortal за 3 дня',
    price: 5000,
    seller: 'BoostMaster',
    sellerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Boost',
    sellerRating: 4.8,
    image: 'https://picsum.photos/seed/market3/400/300',
    category: 'boost'
  },
  {
    id: 4,
    title: 'Dragon Lore AWP — Factory New',
    game: 'CS2',
    description: 'Легендарный скин в идеальном состоянии',
    price: 89000,
    seller: 'SkinTrader',
    sellerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Skin',
    sellerRating: 4.9,
    image: 'https://picsum.photos/seed/market4/400/300',
    category: 'item',
    isVerified: true
  }
];

const categoryConfig = {
  account: { label: 'Аккаунты', icon: 'User', color: 'bg-blue-500' },
  item: { label: 'Предметы', icon: 'Package', color: 'bg-purple-500' },
  currency: { label: 'Валюта', icon: 'Coins', color: 'bg-yellow-500' },
  boost: { label: 'Буст', icon: 'TrendingUp', color: 'bg-green-500' }
};

export default function GamerMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const filteredItems = mockItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.game.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBuy = (item: MarketItem) => {
    toast({
      title: '🛒 Товар добавлен в корзину!',
      description: `${item.title} — ${item.price}₽`
    });
  };

  return (
    <div className="container mx-auto px-4 py-12" data-section="marketplace">
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
          🏪 Торговая площадка геймеров
        </h2>
        <p className="text-muted-foreground">
          Покупайте и продавайте аккаунты, предметы и услуги
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Label htmlFor="search" className="sr-only">Поиск</Label>
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            size="sm"
          >
            Все
          </Button>
          {Object.entries(categoryConfig).map(([key, config]) => (
            <Button
              key={key}
              variant={selectedCategory === key ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(key)}
              size="sm"
            >
              <Icon name={config.icon as any} size={16} className="mr-2" />
              {config.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="overflow-hidden hover:border-primary/50 transition-all group">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
                <Badge 
                  className={`absolute top-2 left-2 ${categoryConfig[item.category].color} text-white`}
                >
                  <Icon name={categoryConfig[item.category].icon as any} size={12} className="mr-1" />
                  {categoryConfig[item.category].label}
                </Badge>
                {item.isVerified && (
                  <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                    <Icon name="ShieldCheck" size={12} className="mr-1" />
                    Проверено
                  </Badge>
                )}
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-base line-clamp-1">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-xs">{item.game}</CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="w-6 h-6">
                    <img src={item.sellerAvatar} alt={item.seller} />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate">{item.seller}</div>
                    <div className="flex items-center gap-1 text-xs text-yellow-500">
                      <Icon name="Star" size={10} className="fill-yellow-500" />
                      {item.sellerRating}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="text-2xl font-bold text-primary">
                    {item.price.toLocaleString()}₽
                  </div>
                  <Button 
                    onClick={() => handleBuy(item)}
                    size="sm"
                    className="bg-gradient-to-r from-primary to-secondary"
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-1" />
                    Купить
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="TrendingUp" size={20} />
            Хотите продать свои товары?
          </CardTitle>
          <CardDescription>
            Зарабатывайте на продаже игровых предметов, аккаунтов и услуг
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
            <Icon name="Plus" size={20} className="mr-2" />
            Создать объявление
          </Button>
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>🔒 Все сделки защищены системой безопасности</p>
        <p>⚡ Гарантия возврата средств при проблемах с товаром</p>
      </div>
    </div>
  );
}
