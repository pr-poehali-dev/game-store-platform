import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DailyStreak, WheelSegment, DailyChallenge } from '@/types/dailyrewards';
import Icon from '@/components/ui/icon';

export default function DailyRewardsSystem() {
  const [spinning, setSpinning] = useState(false);
  const [wonSegment, setWonSegment] = useState<WheelSegment | null>(null);

  const [streak] = useState<DailyStreak>({
    currentStreak: 7,
    longestStreak: 23,
    lastClaimDate: Date.now() - 86400000,
    nextRewardDay: 8,
    rewards: [
      { day: 1, type: 'coins', amount: 100, name: '100 монет', claimed: true },
      { day: 2, type: 'coins', amount: 200, name: '200 монет', claimed: true },
      { day: 3, type: 'gems', amount: 10, name: '10 💎', claimed: true },
      { day: 4, type: 'coins', amount: 300, name: '300 монет', claimed: true },
      { day: 5, type: 'xp', amount: 1000, name: '1000 XP', claimed: true },
      { day: 6, type: 'gems', amount: 20, name: '20 💎', claimed: true },
      { day: 7, type: 'lootbox', amount: 1, name: 'Редкий кейс', image: '/api/placeholder/60/60', claimed: true },
    ],
  });

  const wheelSegments: WheelSegment[] = [
    { id: '1', type: 'coins', value: 100, label: '100 🪙', color: 'bg-yellow-500', probability: 30 },
    { id: '2', type: 'gems', value: 10, label: '10 💎', color: 'bg-blue-500', probability: 20 },
    { id: '3', type: 'coins', value: 500, label: '500 🪙', color: 'bg-yellow-600', probability: 15 },
    { id: '4', type: 'nothing', value: 0, label: 'Мимо 😢', color: 'bg-gray-500', probability: 10 },
    { id: '5', type: 'lootbox', value: 1, label: 'Кейс 📦', color: 'bg-purple-500', probability: 10 },
    { id: '6', type: 'xp', value: 1000, label: '1000 XP', color: 'bg-green-500', probability: 10 },
    { id: '7', type: 'gems', value: 50, label: '50 💎', color: 'bg-blue-600', probability: 4 },
    { id: '8', type: 'coins', value: 2000, label: '2000 🪙', color: 'bg-orange-500', probability: 1 },
  ];

  const [challenges] = useState<DailyChallenge[]>([
    {
      id: '1',
      title: 'Первая победа дня',
      description: 'Выиграй 1 матч в любой игре',
      rewardType: 'coins',
      rewardAmount: 500,
      progress: 0,
      target: 1,
      completed: false,
    },
    {
      id: '2',
      title: 'Социальный день',
      description: 'Добавь 3 друзей',
      rewardType: 'xp',
      rewardAmount: 1000,
      progress: 1,
      target: 3,
      completed: false,
    },
    {
      id: '3',
      title: 'Активный игрок',
      description: 'Играй 2 часа',
      rewardType: 'gems',
      rewardAmount: 25,
      progress: 0.5,
      target: 2,
      completed: false,
    },
  ]);

  const handleSpinWheel = () => {
    setSpinning(true);
    setTimeout(() => {
      const won = wheelSegments[Math.floor(Math.random() * wheelSegments.length)];
      setWonSegment(won);
      setSpinning(false);
    }, 3000);
  };

  const nextWeekRewards = [
    { day: 8, type: 'coins', amount: 400, name: '400 монет' },
    { day: 9, type: 'gems', amount: 25, name: '25 💎' },
    { day: 10, type: 'lootbox', amount: 1, name: 'Эпический кейс', image: '/api/placeholder/60/60' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">🎁 Ежедневные награды</h1>
        <p className="text-muted-foreground">Заходи каждый день и получай бонусы!</p>
      </div>

      <Card className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">🔥 Серия дней: {streak.currentStreak}</h3>
            <p className="text-white/80">Рекорд: {streak.longestStreak} дней</p>
          </div>
          <div className="text-center">
            <Icon name="Flame" size={64} className="mb-2" />
            <p className="text-sm">Не пропускай!</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">📅 Награды за вход</h3>
        <div className="grid grid-cols-7 gap-3 mb-6">
          {streak.rewards.map((reward) => (
            <Card
              key={reward.day}
              className={`p-3 text-center ${
                reward.claimed ? 'bg-green-500/20 border-green-500' : 'border-primary'
              }`}
            >
              <div className="text-sm font-bold mb-2">День {reward.day}</div>
              {reward.image && (
                <img src={reward.image} alt={reward.name} className="w-12 h-12 mx-auto mb-2" />
              )}
              <div className="text-xs font-medium">{reward.name}</div>
              {reward.claimed && (
                <Icon name="Check" size={16} className="mx-auto mt-2 text-green-500" />
              )}
            </Card>
          ))}
        </div>

        <div className="border-t pt-4">
          <p className="text-sm font-medium mb-3">Следующие награды:</p>
          <div className="flex gap-3">
            {nextWeekRewards.map((reward) => (
              <Card key={reward.day} className="p-3 flex-1 text-center border-dashed">
                <div className="text-xs text-muted-foreground mb-1">День {reward.day}</div>
                {reward.image && (
                  <img src={reward.image} alt={reward.name} className="w-10 h-10 mx-auto mb-1" />
                )}
                <div className="text-xs font-medium">{reward.name}</div>
              </Card>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 text-center">🎰 Колесо фортуны</h3>
          
          {wonSegment && (
            <div className="mb-4 p-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg text-white text-center">
              <h4 className="text-2xl font-bold mb-2">Вы выиграли!</h4>
              <p className="text-3xl">{wonSegment.label}</p>
            </div>
          )}

          <div className="relative w-64 h-64 mx-auto mb-6">
            <div className={`w-full h-full rounded-full border-8 border-primary ${spinning ? 'animate-spin' : ''}`}>
              {wheelSegments.map((segment, index) => (
                <div
                  key={segment.id}
                  className={`absolute inset-0 ${segment.color} opacity-80`}
                  style={{
                    clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((index * 2 * Math.PI) / 8)}% ${
                      50 + 50 * Math.sin((index * 2 * Math.PI) / 8)
                    }%, ${50 + 50 * Math.cos(((index + 1) * 2 * Math.PI) / 8)}% ${
                      50 + 50 * Math.sin(((index + 1) * 2 * Math.PI) / 8)
                    }%)`,
                  }}
                />
              ))}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full border-4 border-primary flex items-center justify-center">
              <Icon name="Play" size={24} className="text-primary" />
            </div>
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={handleSpinWheel}
            disabled={spinning}
          >
            {spinning ? 'Крутим...' : 'Крутить колесо (1 раз в день)'}
          </Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">✨ Ежедневные задания</h3>
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className={`p-4 ${challenge.completed ? 'bg-green-500/10' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold">{challenge.title}</h4>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  </div>
                  {challenge.completed && (
                    <Icon name="CheckCircle" size={24} className="text-green-500" />
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {challenge.progress}/{challenge.target}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-500 text-white">
                    +{challenge.rewardAmount}{' '}
                    {challenge.rewardType === 'coins' ? '🪙' : challenge.rewardType === 'gems' ? '💎' : 'XP'}
                  </Badge>
                  {!challenge.completed && (
                    <Button size="sm" variant="outline">
                      В бой!
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
