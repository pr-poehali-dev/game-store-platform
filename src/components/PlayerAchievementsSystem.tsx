import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  total: number;
  reward: string;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_purchase',
    title: 'Первая покупка',
    description: 'Купи свою первую игру',
    icon: 'ShoppingBag',
    progress: 0,
    total: 1,
    reward: '+100 баллов',
    unlocked: false,
    rarity: 'common',
  },
  {
    id: 'collector_10',
    title: 'Коллекционер',
    description: 'Купи 10 игр',
    icon: 'Library',
    progress: 0,
    total: 10,
    reward: '+500 баллов',
    unlocked: false,
    rarity: 'rare',
  },
  {
    id: 'tournament_winner',
    title: 'Чемпион',
    description: 'Выиграй турнир',
    icon: 'Trophy',
    progress: 0,
    total: 1,
    reward: '+1000 баллов',
    unlocked: false,
    rarity: 'epic',
  },
  {
    id: 'daily_streak_7',
    title: 'Преданный фанат',
    description: 'Заходи на сайт 7 дней подряд',
    icon: 'Calendar',
    progress: 0,
    total: 7,
    reward: '+300 баллов',
    unlocked: false,
    rarity: 'common',
  },
  {
    id: 'refer_friend',
    title: 'Пригласи друга',
    description: 'Пригласи друга по реферальной ссылке',
    icon: 'Users',
    progress: 0,
    total: 1,
    reward: '+500 баллов',
    unlocked: false,
    rarity: 'rare',
  },
  {
    id: 'legendary_buyer',
    title: 'Легенда',
    description: 'Потрать более 50,000₽',
    icon: 'Crown',
    progress: 0,
    total: 50000,
    reward: 'VIP статус',
    unlocked: false,
    rarity: 'legendary',
  },
];

const PLAYER_LEVELS = [
  { level: 1, title: 'Новичок', xpRequired: 0, icon: '🌱' },
  { level: 2, title: 'Игрок', xpRequired: 500, icon: '🎮' },
  { level: 3, title: 'Знаток', xpRequired: 1500, icon: '⭐' },
  { level: 4, title: 'Профи', xpRequired: 3000, icon: '🔥' },
  { level: 5, title: 'Мастер', xpRequired: 6000, icon: '💎' },
  { level: 6, title: 'Легенда', xpRequired: 12000, icon: '👑' },
];

export const PlayerAchievementsSystem = () => {
  const [currentXP] = useState(1200);
  const [achievements] = useState<Achievement[]>(ACHIEVEMENTS);

  const currentLevel =
    PLAYER_LEVELS.filter((l) => currentXP >= l.xpRequired).pop() ||
    PLAYER_LEVELS[0];
  const nextLevel =
    PLAYER_LEVELS.find((l) => l.level === currentLevel.level + 1) ||
    currentLevel;
  const progressToNextLevel =
    ((currentXP - currentLevel.xpRequired) /
      (nextLevel.xpRequired - currentLevel.xpRequired)) *
    100;

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'text-gray-400 border-gray-400';
      case 'rare':
        return 'text-blue-400 border-blue-400';
      case 'epic':
        return 'text-purple-400 border-purple-400';
      case 'legendary':
        return 'text-yellow-400 border-yellow-400';
    }
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{currentLevel.icon}</span>
              <div>
                <h3 className="text-2xl font-bold">{currentLevel.title}</h3>
                <p className="text-muted-foreground">
                  Уровень {currentLevel.level}
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">
              {currentXP.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">XP</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>До уровня {nextLevel.level}</span>
            <span className="text-muted-foreground">
              {currentXP} / {nextLevel.xpRequired} XP
            </span>
          </div>
          <Progress value={progressToNextLevel} className="h-3" />
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Достижения</h3>
          <Badge>
            {unlockedCount} / {achievements.length}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`border-2 rounded-lg p-4 transition-all ${
                achievement.unlocked
                  ? 'bg-primary/5 border-primary'
                  : 'opacity-60 grayscale'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${getRarityColor(
                    achievement.rarity
                  )}`}
                >
                  <Icon name={achievement.icon as any} size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{achievement.title}</h4>
                    {achievement.unlocked && (
                      <Icon
                        name="Check"
                        size={16}
                        className="text-green-500"
                      />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {achievement.description}
                  </p>

                  <div className="space-y-2">
                    <Progress
                      value={(achievement.progress / achievement.total) * 100}
                      className="h-2"
                    />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {achievement.progress} / {achievement.total}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {achievement.reward}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Icon name="Target" size={24} className="text-blue-500" />
          <h3 className="text-lg font-semibold">Ежедневные задания</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-card rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="Check" size={16} className="text-green-500" />
              <span>Зайти на сайт</span>
            </div>
            <Badge>+50 XP</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-card rounded-lg opacity-50">
            <div className="flex items-center gap-2">
              <Icon name="Circle" size={16} className="text-muted-foreground" />
              <span>Купить игру</span>
            </div>
            <Badge variant="outline">+200 XP</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-card rounded-lg opacity-50">
            <div className="flex items-center gap-2">
              <Icon name="Circle" size={16} className="text-muted-foreground" />
              <span>Оставить отзыв</span>
            </div>
            <Badge variant="outline">+100 XP</Badge>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button variant="outline">
          <Icon name="Award" size={18} className="mr-2" />
          Посмотреть рейтинг игроков
        </Button>
      </div>
    </div>
  );
};
