import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Achievement } from '@/types/achievements';
import Icon from '@/components/ui/icon';

const rarityColors = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-orange-500',
  secret: 'bg-black',
};

const categoryIcons = {
  social: 'Users',
  gaming: 'Gamepad2',
  marketplace: 'ShoppingBag',
  streaming: 'Video',
  tournament: 'Trophy',
  clan: 'Shield',
  special: 'Star',
};

export default function AchievementSystem() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const achievements: Achievement[] = [
    {
      id: '1',
      name: 'Первый друг',
      description: 'Добавь первого друга',
      category: 'social',
      icon: '👥',
      rarity: 'common',
      points: 10,
      progress: 1,
      target: 1,
      unlocked: true,
      unlockedAt: Date.now() - 86400000,
      secret: false,
    },
    {
      id: '2',
      name: 'Популярный игрок',
      description: 'Получи 100 друзей',
      category: 'social',
      icon: '🌟',
      rarity: 'rare',
      points: 50,
      progress: 67,
      target: 100,
      unlocked: false,
      secret: false,
    },
    {
      id: '3',
      name: 'Первая победа',
      description: 'Выиграй свой первый матч',
      category: 'gaming',
      icon: '🏆',
      rarity: 'common',
      points: 10,
      progress: 1,
      target: 1,
      unlocked: true,
      unlockedAt: Date.now() - 172800000,
      secret: false,
    },
    {
      id: '4',
      name: 'Непобедимый',
      description: 'Выиграй 100 матчей подряд',
      category: 'gaming',
      icon: '⚡',
      rarity: 'legendary',
      points: 200,
      progress: 23,
      target: 100,
      unlocked: false,
      secret: false,
    },
    {
      id: '5',
      name: 'Торговец',
      description: 'Продай 50 предметов',
      category: 'marketplace',
      icon: '💰',
      rarity: 'rare',
      points: 50,
      progress: 12,
      target: 50,
      unlocked: false,
      secret: false,
    },
    {
      id: '6',
      name: 'Стример года',
      description: 'Стримь 500 часов',
      category: 'streaming',
      icon: '📺',
      rarity: 'epic',
      points: 100,
      progress: 87,
      target: 500,
      unlocked: false,
      secret: false,
    },
    {
      id: '7',
      name: 'Чемпион',
      description: 'Выиграй турнир',
      category: 'tournament',
      icon: '🥇',
      rarity: 'epic',
      points: 100,
      progress: 0,
      target: 1,
      unlocked: false,
      secret: false,
    },
    {
      id: '8',
      name: '???',
      description: 'Секретное достижение',
      category: 'special',
      icon: '❓',
      rarity: 'secret',
      points: 500,
      progress: 0,
      target: 1,
      unlocked: false,
      secret: true,
    },
  ];

  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
  const totalUnlocked = achievements.filter(a => a.unlocked).length;
  const completionPercentage = (totalUnlocked / achievements.length) * 100;

  const filteredAchievements = selectedCategory === 'all'
    ? achievements
    : achievements.filter(a => a.category === selectedCategory);

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Достижения</h2>
            <p className="text-white/80">Твой путь к славе!</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold">{totalPoints}</div>
            <div className="text-sm">Очков</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-lg p-3">
            <Icon name="Trophy" size={24} className="mb-2" />
            <div className="text-2xl font-bold">{totalUnlocked}</div>
            <div className="text-sm">Открыто</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <Icon name="Lock" size={24} className="mb-2" />
            <div className="text-2xl font-bold">{achievements.length - totalUnlocked}</div>
            <div className="text-sm">Заблокировано</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <Icon name="Percent" size={24} className="mb-2" />
            <div className="text-2xl font-bold">{completionPercentage.toFixed(0)}%</div>
            <div className="text-sm">Завершено</div>
          </div>
        </div>
        <Progress value={completionPercentage} className="mt-4 h-2" />
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">🏆 Витрина достижений</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements
            .filter(a => a.unlocked)
            .slice(0, 4)
            .map((achievement) => (
              <Card key={achievement.id} className="p-4 text-center hover:scale-105 transition-transform">
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <h4 className="font-bold text-sm mb-1">{achievement.name}</h4>
                <Badge className={`${rarityColors[achievement.rarity]} text-white text-xs`}>
                  {achievement.points} очков
                </Badge>
              </Card>
            ))}
        </div>
      </Card>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="social">Социальные</TabsTrigger>
          <TabsTrigger value="gaming">Игровые</TabsTrigger>
          <TabsTrigger value="marketplace">Торговля</TabsTrigger>
          <TabsTrigger value="streaming">Стриминг</TabsTrigger>
          <TabsTrigger value="tournament">Турниры</TabsTrigger>
          <TabsTrigger value="clan">Кланы</TabsTrigger>
          <TabsTrigger value="special">Особые</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAchievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`p-4 ${achievement.unlocked ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20' : 'opacity-75'}`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{achievement.secret && !achievement.unlocked ? '❓' : achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold">
                          {achievement.secret && !achievement.unlocked ? '???' : achievement.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.secret && !achievement.unlocked ? 'Секретное достижение' : achievement.description}
                        </p>
                      </div>
                      {achievement.unlocked && (
                        <Icon name="CheckCircle" size={24} className="text-green-500" />
                      )}
                    </div>
                    {!achievement.unlocked && !achievement.secret && (
                      <div className="space-y-1">
                        <Progress value={(achievement.progress / achievement.target) * 100} />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>
                            {achievement.progress}/{achievement.target}
                          </span>
                          <span>{achievement.points} очков</span>
                        </div>
                      </div>
                    )}
                    {achievement.unlocked && (
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={`${rarityColors[achievement.rarity]} text-white`}>
                          +{achievement.points}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(achievement.unlockedAt!).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
