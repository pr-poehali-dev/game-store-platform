import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CraftingMaterial, CraftingRecipe, CraftingQueue } from '@/types/crafting';
import Icon from '@/components/ui/icon';

const rarityColors = {
  common: 'border-gray-500',
  uncommon: 'border-green-500',
  rare: 'border-blue-500',
  epic: 'border-purple-500',
  legendary: 'border-orange-500',
  mythic: 'border-red-500',
};

export default function CraftingSystem() {
  const [materials] = useState<CraftingMaterial[]>([
    { id: '1', name: 'Железная руда', rarity: 'common', icon: '⚙️', owned: 145 },
    { id: '2', name: 'Кристалл маны', rarity: 'uncommon', icon: '💠', owned: 67 },
    { id: '3', name: 'Драконья чешуя', rarity: 'rare', icon: '🐉', owned: 23 },
    { id: '4', name: 'Звёздная пыль', rarity: 'epic', icon: '✨', owned: 8 },
    { id: '5', name: 'Осколок времени', rarity: 'legendary', icon: '⏳', owned: 2 },
  ]);

  const [recipes] = useState<CraftingRecipe[]>([
    {
      id: '1',
      name: 'Меч новичка',
      description: 'Базовое оружие для начинающих',
      resultItem: {
        name: 'Железный меч',
        type: 'weapon',
        rarity: 'common',
        image: '/api/placeholder/120/120',
      },
      materials: [
        { materialId: '1', amount: 10 },
        { materialId: '2', amount: 5 },
      ],
      craftingTime: 60,
      successRate: 100,
    },
    {
      id: '2',
      name: 'Редкий скин',
      description: 'Красивый скин для персонажа',
      resultItem: {
        name: 'Драконий доспех',
        type: 'skin',
        rarity: 'rare',
        image: '/api/placeholder/120/120',
      },
      materials: [
        { materialId: '1', amount: 50 },
        { materialId: '3', amount: 15 },
      ],
      craftingTime: 300,
      successRate: 85,
    },
    {
      id: '3',
      name: 'Легендарное оружие',
      description: 'Мощное оружие с особыми эффектами',
      resultItem: {
        name: 'Клинок Вечности',
        type: 'weapon',
        rarity: 'legendary',
        image: '/api/placeholder/120/120',
      },
      materials: [
        { materialId: '3', amount: 20 },
        { materialId: '4', amount: 10 },
        { materialId: '5', amount: 3 },
      ],
      craftingTime: 1800,
      successRate: 60,
    },
  ]);

  const [queue] = useState<CraftingQueue[]>([
    {
      id: '1',
      recipeId: '1',
      recipeName: 'Меч новичка',
      startedAt: Date.now() - 30000,
      completesAt: Date.now() + 30000,
      status: 'crafting',
    },
  ]);

  const canCraft = (recipe: CraftingRecipe) => {
    return recipe.materials.every((req) => {
      const material = materials.find((m) => m.id === req.materialId);
      return material && material.owned >= req.amount;
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}м ${secs}с`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">⚒️ Система крафта</h1>
        <p className="text-muted-foreground">Создавай легендарные предметы из материалов!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <Tabs defaultValue="recipes">
            <div className="border-b p-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="recipes">Рецепты</TabsTrigger>
                <TabsTrigger value="queue">
                  Очередь ({queue.filter((q) => q.status === 'crafting').length})
                </TabsTrigger>
                <TabsTrigger value="completed">Готово</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="recipes" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recipes.map((recipe) => {
                  const craftable = canCraft(recipe);
                  return (
                    <Card
                      key={recipe.id}
                      className={`p-4 border-2 ${rarityColors[recipe.resultItem.rarity]} ${
                        !craftable ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex gap-4 mb-4">
                        <img
                          src={recipe.resultItem.image}
                          alt={recipe.resultItem.name}
                          className="w-24 h-24 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold mb-1">{recipe.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{recipe.description}</p>
                          <div className="flex gap-2">
                            <Badge className="text-xs">{recipe.resultItem.rarity}</Badge>
                            <Badge variant="outline" className="text-xs">
                              <Icon name="Clock" size={12} className="mr-1" />
                              {formatTime(recipe.craftingTime)}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                recipe.successRate >= 80 ? 'border-green-500' : 'border-orange-500'
                              }`}
                            >
                              {recipe.successRate}% успех
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-medium">Требуется:</p>
                        {recipe.materials.map((req) => {
                          const material = materials.find((m) => m.id === req.materialId)!;
                          const hasEnough = material.owned >= req.amount;
                          return (
                            <div
                              key={req.materialId}
                              className={`flex items-center justify-between p-2 border rounded ${
                                hasEnough ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">{material.icon}</span>
                                <span className="text-sm">{material.name}</span>
                              </div>
                              <span
                                className={`text-sm font-medium ${
                                  hasEnough ? 'text-green-500' : 'text-red-500'
                                }`}
                              >
                                {material.owned}/{req.amount}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <Button className="w-full" disabled={!craftable}>
                        <Icon name="Hammer" size={16} className="mr-2" />
                        Создать
                      </Button>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="queue" className="p-6">
              <div className="space-y-4">
                {queue
                  .filter((q) => q.status === 'crafting')
                  .map((item) => {
                    const progress =
                      ((Date.now() - item.startedAt) / (item.completesAt - item.startedAt)) * 100;
                    const remaining = Math.max(0, Math.floor((item.completesAt - Date.now()) / 1000));

                    return (
                      <Card key={item.id} className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold">{item.recipeName}</h4>
                          <Badge className="bg-blue-500 text-white">
                            <Icon name="Clock" size={12} className="mr-1" />
                            {formatTime(remaining)}
                          </Badge>
                        </div>
                        <Progress value={Math.min(100, progress)} className="h-3 mb-2" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Крафтится...</span>
                          <span>{Math.floor(progress)}%</span>
                        </div>
                      </Card>
                    );
                  })}

                {queue.filter((q) => q.status === 'crafting').length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Package" size={48} className="mx-auto mb-4 opacity-30" />
                    <p className="text-muted-foreground">Очередь крафта пуста</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="p-6">
              <div className="text-center py-12">
                <Icon name="CheckCircle" size={48} className="mx-auto mb-4 opacity-30" />
                <p className="text-muted-foreground">Нет готовых предметов</p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">💎 Материалы</h3>
          <div className="space-y-3">
            {materials.map((material) => (
              <Card key={material.id} className={`p-3 border-2 ${rarityColors[material.rarity]}`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{material.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{material.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{material.rarity}</p>
                  </div>
                  <Badge className="bg-primary text-white">{material.owned}</Badge>
                </div>
              </Card>
            ))}
          </div>

          <Button className="w-full mt-4" variant="outline">
            <Icon name="ShoppingCart" size={16} className="mr-2" />
            Купить материалы
          </Button>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="flex items-center gap-4">
          <Icon name="Sparkles" size={48} />
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">🎯 Ежедневный крафт</h3>
            <p className="text-white/80">Крафти каждый день и получай бонусные материалы!</p>
          </div>
          <Button variant="secondary" size="lg">
            Забрать награду
          </Button>
        </div>
      </Card>
    </div>
  );
}
