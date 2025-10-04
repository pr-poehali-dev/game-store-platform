import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { motion, AnimatePresence } from 'framer-motion';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  reward: string;
}

const mockAchievements: Achievement[] = [
  {
    id: 1,
    title: 'Первая покупка',
    description: 'Купите свою первую игру',
    icon: 'ShoppingBag',
    rarity: 'common',
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    reward: '+100 бонусов'
  },
  {
    id: 2,
    title: 'Коллекционер',
    description: 'Купите 10 игр',
    icon: 'Library',
    rarity: 'rare',
    progress: 7,
    maxProgress: 10,
    unlocked: false,
    reward: '+500 бонусов'
  },
  {
    id: 3,
    title: 'Ветеран платформы',
    description: 'Зарегистрируйтесь 30 дней назад',
    icon: 'Calendar',
    rarity: 'epic',
    progress: 15,
    maxProgress: 30,
    unlocked: false,
    reward: '+1000 бонусов'
  },
  {
    id: 4,
    title: 'Мастер скидок',
    description: 'Купите 5 игр со скидкой',
    icon: 'Tag',
    rarity: 'rare',
    progress: 3,
    maxProgress: 5,
    unlocked: false,
    reward: '+300 бонусов'
  },
  {
    id: 5,
    title: 'Легенда магазина',
    description: 'Потратьте 50000₽',
    icon: 'Crown',
    rarity: 'legendary',
    progress: 12500,
    maxProgress: 50000,
    unlocked: false,
    reward: '+5000 бонусов + VIP статус'
  },
  {
    id: 6,
    title: 'Социальная бабочка',
    description: 'Добавьте 10 друзей',
    icon: 'Users',
    rarity: 'common',
    progress: 4,
    maxProgress: 10,
    unlocked: false,
    reward: '+200 бонусов'
  },
  {
    id: 7,
    title: 'Ранняя пташка',
    description: 'Купите пре-ордер',
    icon: 'Clock',
    rarity: 'epic',
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    reward: '+800 бонусов'
  },
  {
    id: 8,
    title: 'Обзорщик',
    description: 'Оставьте 20 отзывов',
    icon: 'MessageSquare',
    rarity: 'rare',
    progress: 12,
    maxProgress: 20,
    unlocked: false,
    reward: '+400 бонусов'
  }
];

export default function AchievementsShowcase() {
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
  const [showUnlocked, setShowUnlocked] = useState(false);
  const [newUnlock, setNewUnlock] = useState<Achievement | null>(null);

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'from-gray-500 to-gray-600';
      case 'rare': return 'from-blue-500 to-blue-600';
      case 'epic': return 'from-purple-500 to-purple-600';
      case 'legendary': return 'from-yellow-500 to-orange-500';
    }
  };

  const getRarityLabel = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'Обычное';
      case 'rare': return 'Редкое';
      case 'epic': return 'Эпическое';
      case 'legendary': return 'Легендарное';
    }
  };

  const getRarityIcon = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return '⚪';
      case 'rare': return '🔵';
      case 'epic': return '🟣';
      case 'legendary': return '🟡';
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progressPercent = (unlockedCount / totalCount) * 100;

  // Симуляция разблокировки достижения
  useEffect(() => {
    const timer = setTimeout(() => {
      const achievement = achievements.find(a => a.id === 2 && !a.unlocked);
      if (achievement) {
        setNewUnlock(achievement);
        setTimeout(() => setNewUnlock(null), 5000);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const filteredAchievements = showUnlocked
    ? achievements.filter(a => a.unlocked)
    : achievements;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
          🏆 Достижения
        </h2>
        <p className="text-muted-foreground">
          Выполняйте задания и получайте награды
        </p>
      </div>

      <Card className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Общий прогресс</span>
            <Badge className="bg-primary text-primary-foreground">
              {unlockedCount}/{totalCount}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercent} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">
            {progressPercent.toFixed(0)}% достижений разблокировано
          </p>
        </CardContent>
      </Card>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowUnlocked(false)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            !showUnlocked
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          Все достижения
        </button>
        <button
          onClick={() => setShowUnlocked(true)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            showUnlocked
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          Разблокированные ({unlockedCount})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <Card
                className={`relative overflow-hidden transition-all ${
                  achievement.unlocked
                    ? 'border-2 bg-gradient-to-br from-card to-primary/5'
                    : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100'
                }`}
              >
                {achievement.unlocked && (
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getRarityColor(achievement.rarity)}`} />
                )}

                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${getRarityColor(
                        achievement.rarity
                      )} flex items-center justify-center mb-3 ${
                        achievement.unlocked ? 'animate-pulse' : ''
                      }`}
                    >
                      <Icon
                        name={achievement.icon as any}
                        size={32}
                        className="text-white"
                      />
                    </div>

                    <Badge
                      className={`mb-2 bg-gradient-to-r ${getRarityColor(
                        achievement.rarity
                      )}`}
                    >
                      {getRarityIcon(achievement.rarity)} {getRarityLabel(achievement.rarity)}
                    </Badge>

                    <h3 className="font-bold mb-1">{achievement.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {achievement.description}
                    </p>

                    {!achievement.unlocked && (
                      <div className="w-full">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Прогресс</span>
                          <span className="font-semibold">
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <Progress
                          value={(achievement.progress / achievement.maxProgress) * 100}
                          className="h-2"
                        />
                      </div>
                    )}

                    {achievement.unlocked && (
                      <div className="w-full mt-2 p-2 bg-green-500/10 rounded-lg">
                        <p className="text-xs font-semibold text-green-500">
                          ✓ Разблокировано!
                        </p>
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t w-full">
                      <p className="text-xs text-muted-foreground">Награда:</p>
                      <p className="text-sm font-semibold text-primary">
                        {achievement.reward}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Попап разблокировки достижения */}
      <AnimatePresence>
        {newUnlock && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100]"
          >
            <Card className={`border-2 bg-gradient-to-r ${getRarityColor(newUnlock.rarity)} text-white shadow-2xl`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Icon name={newUnlock.icon as any} size={32} />
                  </div>
                  <div>
                    <p className="text-xs opacity-90 mb-1">Достижение разблокировано!</p>
                    <h3 className="text-xl font-bold">{newUnlock.title}</h3>
                    <p className="text-sm opacity-90">{newUnlock.reward}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
