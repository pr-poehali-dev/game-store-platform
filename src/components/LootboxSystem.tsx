import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lootbox, LootboxItem } from '@/types/lootbox';
import Icon from '@/components/ui/icon';

const rarityColors = {
  common: 'from-gray-500 to-gray-600',
  uncommon: 'from-green-500 to-green-600',
  rare: 'from-blue-500 to-blue-600',
  epic: 'from-purple-500 to-purple-600',
  legendary: 'from-orange-500 to-orange-600',
  mythic: 'from-red-500 to-red-600',
};

const rarityLabels = {
  common: 'Обычный',
  uncommon: 'Необычный',
  rare: 'Редкий',
  epic: 'Эпический',
  legendary: 'Легендарный',
  mythic: 'Мифический',
};

export default function LootboxSystem() {
  const [selectedBox, setSelectedBox] = useState<Lootbox | null>(null);
  const [opening, setOpening] = useState(false);
  const [wonItems, setWonItems] = useState<LootboxItem[]>([]);

  const lootboxes: Lootbox[] = [
    {
      id: '1',
      name: 'Обычный кейс',
      description: 'Базовые предметы и немного валюты',
      rarity: 'common',
      price: 100,
      currency: 'coins',
      image: '/api/placeholder/200/200',
      itemPool: [],
    },
    {
      id: '2',
      name: 'Редкий кейс',
      description: 'Шанс на редкие скины',
      rarity: 'rare',
      price: 500,
      currency: 'coins',
      image: '/api/placeholder/200/200',
      guaranteedRarity: 'rare',
      itemPool: [],
    },
    {
      id: '3',
      name: 'Эпический кейс',
      description: 'Гарантированный эпик или выше',
      rarity: 'epic',
      price: 50,
      currency: 'gems',
      image: '/api/placeholder/200/200',
      guaranteedRarity: 'epic',
      itemPool: [],
    },
    {
      id: '4',
      name: 'Легендарный кейс',
      description: 'Эксклюзивные легендарные предметы',
      rarity: 'legendary',
      price: 999,
      currency: 'real',
      image: '/api/placeholder/200/200',
      guaranteedRarity: 'legendary',
      itemPool: [],
    },
    {
      id: '5',
      name: 'Мифический кейс',
      description: 'Только мифические предметы!',
      rarity: 'mythic',
      price: 200,
      currency: 'gems',
      image: '/api/placeholder/200/200',
      guaranteedRarity: 'mythic',
      itemPool: [],
    },
  ];

  const handleOpenBox = (box: Lootbox) => {
    setSelectedBox(box);
    setOpening(true);

    const mockItems: LootboxItem[] = [
      {
        id: '1',
        name: 'Неоновый меч',
        type: 'item',
        rarity: box.guaranteedRarity || 'rare',
        image: '/api/placeholder/150/150',
        value: 500,
      },
      {
        id: '2',
        name: '1000 монет',
        type: 'currency',
        rarity: 'common',
        image: '/api/placeholder/150/150',
        value: 1000,
      },
      {
        id: '3',
        name: 'Легендарный скин',
        type: 'skin',
        rarity: 'legendary',
        image: '/api/placeholder/150/150',
        value: 5000,
      },
    ];

    setTimeout(() => {
      setWonItems(mockItems);
      setOpening(false);
    }, 3000);
  };

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'real') return `$${price}`;
    if (currency === 'gems') return `${price} 💎`;
    return `${price} 🪙`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">🎰 Система лутбоксов</h1>
        <p className="text-muted-foreground">Открывай кейсы и получай крутые предметы!</p>
      </div>

      {wonItems.length > 0 && (
        <Card className="p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500">
          <h3 className="text-xl font-bold mb-4 text-center">🎉 Вы получили:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {wonItems.map((item) => (
              <Card key={item.id} className={`p-4 bg-gradient-to-br ${rarityColors[item.rarity]}`}>
                <div className="aspect-square mb-3">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                </div>
                <Badge className="mb-2 bg-black/50">{rarityLabels[item.rarity]}</Badge>
                <h4 className="font-bold text-white">{item.name}</h4>
                <p className="text-sm text-white/80">Стоимость: {item.value} 🪙</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-4">
            <Button onClick={() => setWonItems([])} variant="outline" className="bg-white">
              Забрать награды
            </Button>
          </div>
        </Card>
      )}

      {opening && (
        <Card className="p-12 text-center">
          <div className="animate-spin mx-auto mb-4">
            <Icon name="Package" size={64} className="text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Открываем кейс...</h3>
          <p className="text-muted-foreground">Скрещивай пальцы! 🤞</p>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {lootboxes.map((box) => (
          <Card
            key={box.id}
            className={`overflow-hidden hover:scale-105 transition-all cursor-pointer bg-gradient-to-br ${rarityColors[box.rarity]}`}
          >
            <div className="aspect-square p-4">
              <img src={box.image} alt={box.name} className="w-full h-full object-cover rounded" />
            </div>
            <div className="p-4 bg-background">
              <Badge className="mb-2">{rarityLabels[box.rarity]}</Badge>
              <h3 className="font-bold mb-1">{box.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{box.description}</p>
              {box.guaranteedRarity && (
                <p className="text-xs text-green-500 mb-2">
                  ✓ Гарантия: {rarityLabels[box.guaranteedRarity]}+
                </p>
              )}
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold">{formatPrice(box.price, box.currency)}</span>
              </div>
              <Button
                className="w-full"
                onClick={() => handleOpenBox(box)}
                disabled={opening}
              >
                <Icon name="Package" size={16} className="mr-2" />
                Открыть
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">📊 История открытий</h3>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center gap-3">
                <img src="/api/placeholder/40/40" alt="Item" className="w-10 h-10 rounded" />
                <div>
                  <p className="font-medium">Легендарный скин #{i}</p>
                  <p className="text-sm text-muted-foreground">2 часа назад</p>
                </div>
              </div>
              <Badge className="bg-orange-500 text-white">Legendary</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
