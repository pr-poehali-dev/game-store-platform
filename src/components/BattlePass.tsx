import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BattlePassReward, BattlePassChallenge, BattlePassProgress } from '@/types/battlepass';
import Icon from '@/components/ui/icon';

const rarityColors = {
  common: 'border-gray-500',
  uncommon: 'border-green-500',
  rare: 'border-blue-500',
  epic: 'border-purple-500',
  legendary: 'border-orange-500',
  mythic: 'border-red-500',
};

export default function BattlePass() {
  const [progress] = useState<BattlePassProgress>({
    currentLevel: 47,
    currentXP: 2340,
    xpForNextLevel: 5000,
    hasPremium: false,
    totalXPEarned: 235000,
  });

  const [rewards] = useState<BattlePassReward[]>(
    Array.from({ length: 100 }, (_, i) => ({
      id: `reward-${i}`,
      level: i + 1,
      type: i % 5 === 0 ? 'premium' : i % 2 === 0 ? 'free' : 'premium',
      rewardType: ['skin', 'emote', 'currency', 'item', 'badge'][i % 5] as any,
      name: `Награда уровня ${i + 1}`,
      image: `/api/placeholder/80/80`,
      rarity: ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'][Math.floor(i / 20)] as any,
      claimed: i < progress.currentLevel,
    }))
  );

  const [challenges] = useState<BattlePassChallenge[]>([
    {
      id: '1',
      title: 'Мастер побед',
      description: 'Выиграй 10 матчей в любой игре',
      progress: 7,
      target: 10,
      xpReward: 2500,
      completed: false,
    },
    {
      id: '2',
      title: 'Социальная бабочка',
      description: 'Добавь 5 новых друзей',
      progress: 5,
      target: 5,
      xpReward: 1000,
      completed: true,
    },
    {
      id: '3',
      title: 'Стример',
      description: 'Стримь 2 часа',
      progress: 1.3,
      target: 2,
      xpReward: 3000,
      completed: false,
    },
  ]);

  const daysLeft = 23;
  const xpProgress = (progress.currentXP / progress.xpForNextLevel) * 100;

  return (
    <div className="space-y-6">
      <div className="relative h-64 rounded-xl overflow-hidden">
        <img
          src="/api/placeholder/1200/300"
          alt="Battle Pass Season"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
          <h1 className="text-4xl font-bold text-white mb-2">Сезон 7: Киберпанк</h1>
          <p className="text-white/80 mb-4">100 уровней эксклюзивных наград</p>
          <div className="flex items-center gap-4">
            <Badge className="bg-red-500 text-white">
              <Icon name="Clock" size={14} className="mr-1" />
              {daysLeft} дней осталось
            </Badge>
            <Badge className="bg-blue-500 text-white">
              Уровень {progress.currentLevel}/100
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">Прогресс Battle Pass</h3>
              <p className="text-sm text-muted-foreground">
                {progress.currentXP.toLocaleString()} / {progress.xpForNextLevel.toLocaleString()} XP
              </p>
            </div>
            {!progress.hasPremium && (
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500">
                <Icon name="Crown" size={16} className="mr-2" />
                Купить Premium за $9.99
              </Button>
            )}
          </div>
          <Progress value={xpProgress} className="h-3 mb-4" />
          <div className="text-sm text-muted-foreground">
            До уровня {progress.currentLevel + 1}: {(progress.xpForNextLevel - progress.currentXP).toLocaleString()} XP
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Icon name="Zap" size={20} className="text-yellow-500" />
            XP Бустер
          </h3>
          <div className="space-y-3">
            <div className="p-3 border rounded">
              <p className="font-medium">+50% XP Weekend</p>
              <p className="text-sm text-muted-foreground">До конца выходных</p>
            </div>
            <Button className="w-full" variant="outline">
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              Купить XP бустер
            </Button>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="rewards">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rewards">Награды</TabsTrigger>
          <TabsTrigger value="challenges">Задания ({challenges.filter(c => !c.completed).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="rewards" className="mt-6">
          <div className="space-y-8">
            {[...Array(10)].map((_, rowIndex) => {
              const startLevel = rowIndex * 10 + 1;
              const endLevel = startLevel + 9;
              const rowRewards = rewards.filter(r => r.level >= startLevel && r.level <= endLevel);

              return (
                <div key={rowIndex} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">Уровни {startLevel}-{endLevel}</Badge>
                    <div className="h-px bg-border flex-1" />
                  </div>
                  <div className="grid grid-cols-5 lg:grid-cols-10 gap-3">
                    {rowRewards.map((reward) => (
                      <Card
                        key={reward.id}
                        className={`relative p-2 cursor-pointer hover:scale-105 transition-transform border-2 ${
                          rarityColors[reward.rarity]
                        } ${reward.type === 'premium' && !progress.hasPremium ? 'opacity-50' : ''}`}
                      >
                        {reward.type === 'premium' && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                            <Icon name="Crown" size={12} className="text-white" />
                          </div>
                        )}
                        <div className="aspect-square mb-2">
                          <img src={reward.image} alt={reward.name} className="w-full h-full object-cover rounded" />
                        </div>
                        <p className="text-xs font-bold text-center">{reward.level}</p>
                        {reward.claimed && (
                          <div className="absolute inset-0 bg-black/50 rounded flex items-center justify-center">
                            <Icon name="Check" size={24} className="text-green-500" />
                          </div>
                        )}
                        {reward.level === progress.currentLevel + 1 && (
                          <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className={`p-4 ${challenge.completed ? 'bg-green-500/10' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold mb-1">{challenge.title}</h4>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  </div>
                  {challenge.completed && (
                    <Icon name="CheckCircle" size={24} className="text-green-500" />
                  )}
                </div>
                <Progress value={(challenge.progress / challenge.target) * 100} className="mb-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {challenge.progress}/{challenge.target}
                  </span>
                  <span className="font-bold text-primary">+{challenge.xpReward} XP</span>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
