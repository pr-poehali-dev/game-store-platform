import { useState } from 'react';
import { ShoppingCart, TrendingUp, Search, Filter, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MarketplaceListing, ItemRarity } from '@/types/marketplace';
import Icon from '@/components/ui/icon';

interface MarketplaceProps {
  listings: MarketplaceListing[];
  onBuyItem: (listingId: string) => void;
  onViewItem: (listingId: string) => void;
}

const rarityColors: Record<ItemRarity, string> = {
  common: 'bg-gray-500',
  uncommon: 'bg-green-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-orange-500',
  mythic: 'bg-red-500',
};

const rarityLabels: Record<ItemRarity, string> = {
  common: 'Обычный',
  uncommon: 'Необычный',
  rare: 'Редкий',
  epic: 'Эпический',
  legendary: 'Легендарный',
  mythic: 'Мифический',
};

export default function Marketplace({ listings, onBuyItem, onViewItem }: MarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'real') return `$${price}`;
    if (currency === 'gems') return `${price} 💎`;
    return `${price} 🪙`;
  };

  const filteredListings = listings
    .filter((listing) => {
      if (searchQuery && !listing.item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (selectedGame !== 'all' && listing.item.gameId.toString() !== selectedGame) {
        return false;
      }
      if (selectedRarity !== 'all' && listing.item.rarity !== selectedRarity) {
        return false;
      }
      return listing.status === 'active';
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerUnit - b.pricePerUnit;
      if (sortBy === 'price-high') return b.pricePerUnit - a.pricePerUnit;
      if (sortBy === 'popular') return b.views - a.views;
      return b.createdAt - a.createdAt;
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Маркетплейс предметов</h2>
        <Button>
          <Icon name="Package" size={16} className="mr-2" />
          Продать предмет
        </Button>
      </div>

      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск предметов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedGame} onValueChange={setSelectedGame}>
            <SelectTrigger>
              <SelectValue placeholder="Все игры" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все игры</SelectItem>
              <SelectItem value="1">Cyberpunk 2077</SelectItem>
              <SelectItem value="2">Valorant</SelectItem>
              <SelectItem value="3">CS:GO</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedRarity} onValueChange={setSelectedRarity}>
            <SelectTrigger>
              <SelectValue placeholder="Редкость" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все редкости</SelectItem>
              {Object.entries(rarityLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Новые</SelectItem>
              <SelectItem value="popular">Популярные</SelectItem>
              <SelectItem value="price-low">Цена: низкая</SelectItem>
              <SelectItem value="price-high">Цена: высокая</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Tabs defaultValue="buy">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="buy">Купить</TabsTrigger>
          <TabsTrigger value="sell">Мои лоты</TabsTrigger>
          <TabsTrigger value="history">История</TabsTrigger>
        </TabsList>

        <TabsContent value="buy" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredListings.map((listing) => (
              <Card
                key={listing.id}
                className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => onViewItem(listing.id)}
              >
                <div className="relative aspect-square">
                  <img
                    src={listing.item.image}
                    alt={listing.item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                  <Badge
                    className={`absolute top-2 left-2 ${rarityColors[listing.item.rarity]} text-white`}
                  >
                    {rarityLabels[listing.item.rarity]}
                  </Badge>
                  {listing.favorites > 0 && (
                    <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                      <Icon name="Star" size={12} className="mr-1" />
                      {listing.favorites}
                    </Badge>
                  )}
                </div>

                <div className="p-3">
                  <h4 className="font-bold text-sm mb-1 line-clamp-1">{listing.item.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{listing.item.gameName}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xl font-bold text-primary">
                      {formatPrice(listing.pricePerUnit, listing.currency)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      x{listing.quantity}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Icon name="Eye" size={12} />
                    <span>{listing.views}</span>
                    <span>•</span>
                    <span>{listing.sellerName}</span>
                  </div>

                  <Button
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onBuyItem(listing.id);
                    }}
                  >
                    <Icon name="ShoppingCart" size={14} className="mr-2" />
                    Купить
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredListings.length === 0 && (
            <Card className="p-12 text-center">
              <Icon name="Package" size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-muted-foreground">Предметы не найдены</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="sell" className="mt-6">
          <Card className="p-12 text-center">
            <Icon name="Package" size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-muted-foreground">У вас пока нет активных лотов</p>
            <Button className="mt-4">
              <Icon name="Plus" size={16} className="mr-2" />
              Выставить предмет
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card className="p-12 text-center">
            <Icon name="History" size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-muted-foreground">История покупок пуста</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
