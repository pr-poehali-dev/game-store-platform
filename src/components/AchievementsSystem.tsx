import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'purchases' | 'tournaments' | 'social' | 'special';
  progress: number;
  maxProgress: number;
  reward: string;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const mockAchievements: Achievement[] = [
  {
    id: 'first_purchase',
    title: '🎮 Первая покупка',
    description: 'Купите свою первую игру',
    icon: 'ShoppingBag',
    category: 'purchases',
    progress: 0,
    maxProgress: 1,
    reward: '100₽ кешбэка',
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 'big_spender',
    title: '💎 Крупный игрок',
    description: 'Потратьте 10 000₽',
    icon: 'Gem',
    category: 'purchases',
    progress: 3500,
    maxProgress: 10000,
    reward: '500₽ кешбэка',
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'tournament_winner',
    title: '🏆 Чемпион',
    description: 'Выиграйте турнир',
    icon: 'Trophy',
    category: 'tournaments',
    progress: 0,
    maxProgress: 1,
    reward: 'Эксклюзивный бейдж',
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: 'tournament_participant',
    title: '🎯 Участник',
    description: 'Участвуйте в 5 турнирах',
    icon: 'Target',
    category: 'tournaments',
    progress: 2,
    maxProgress: 5,
    reward: '200₽ кешбэка',
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 'social_butterfly',
    title: '🤝 Социальный',
    description: 'Пригласите 10 друзей',
    icon: 'Users',
    category: 'social',
    progress: 4,
    maxProgress: 10,
    reward: '1000₽ кешбэка',
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'collector',
    title: '📚 Коллекционер',
    description: 'Купите 50 игр',
    icon: 'Library',
    category: 'purchases',
    progress: 12,
    maxProgress: 50,
    reward: 'Бесплатная игра',
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: 'legendary_gamer',
    title: '⚡ Легендарный геймер',
    description: 'Разблокируйте все достижения',
    icon: 'Zap',
    category: 'special',
    progress: 0,
    maxProgress: 1,
    reward: '5000₽ + VIP статус',
    unlocked: false,
    rarity: 'legendary'
  }
];

interface AchievementsSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AchievementsSystem({ isOpen, onClose }: AchievementsSystemProps) {
  const [achievements, setAchievements] = useState(mockAchievements);
  const [filter, setFilter] = useState<'all' | Achievement['category']>('all');
  const [newUnlock, setNewUnlock] = useState<Achievement | null>(null);
  const { toast } = useToast();

  const filteredAchievements = filter === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === filter);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => {
    const rarityPoints = { common: 10, rare: 25, epic: 50, legendary: 100 };
    return sum + rarityPoints[a.rarity];
  }, 0);

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
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

  useEffect(() => {
    if (newUnlock) {
      toast({
        title: '🎉 Достижение разблокировано!',
        description: `${newUnlock.title} - ${newUnlock.reward}`,
      });
      const timer = setTimeout(() => setNewUnlock(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [newUnlock, toast]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-4 pb-20">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                🏆 Достижения
              </h1>
              <p className="text-muted-foreground mt-1">
                {unlockedCount}/{achievements.length} разблокировано • {totalPoints} очков
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-primary/20 to-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Прогресс</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">
                  {Math.round((unlockedCount / achievements.length) * 100)}%
                </div>
                <Progress value={(unlockedCount / achievements.length) * 100} className="h-2" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/20 to-secondary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Очки опыта</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">
                  {totalPoints}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  +{Math.floor(totalPoints / 10)} к уровню
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent/20 to-accent/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Награды</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">
                  {achievements.filter(a => a.unlocked).length * 100}₽
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Заработано кешбэка
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-2 flex-wrap">
            {(['all', 'purchases', 'tournaments', 'social', 'special'] as const).map((category) => (
              <Badge
                key={category}
                variant={filter === category ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setFilter(category)}
              >
                {category === 'all' && '🎯 Все'}
                {category === 'purchases' && '🛒 Покупки'}
                {category === 'tournaments' && '🏆 Турниры'}
                {category === 'social' && '🤝 Социальные'}
                {category === 'special' && '⚡ Особые'}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAchievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className={`h-full ${achievement.unlocked ? 'bg-gradient-to-br from-card to-primary/10' : 'bg-card/50 opacity-60'}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${achievement.unlocked ? 'bg-primary/20' : 'bg-muted'}`}>
                          <Icon 
                            name={achievement.icon as any} 
                            size={24} 
                            className={achievement.unlocked ? 'text-primary' : 'text-muted-foreground'} 
                          />
                        </div>
                        <div>
                          <CardTitle className="text-base">{achievement.title}</CardTitle>
                          <Badge className={`${getRarityColor(achievement.rarity)} text-white mt-1 text-xs`}>
                            {getRarityLabel(achievement.rarity)}
                          </Badge>
                        </div>
                      </div>
                      {achievement.unlocked && (
                        <Icon name="Check" size={20} className="text-primary" />
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <CardDescription>
                      {achievement.description}
                    </CardDescription>

                    {!achievement.unlocked && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Прогресс</span>
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

                    <div className="flex items-center gap-2 text-sm bg-muted/50 p-2 rounded-lg">
                      <Icon name="Gift" size={14} className="text-primary" />
                      <span className="font-semibold">{achievement.reward}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {newUnlock && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Card className="bg-gradient-to-br from-primary to-secondary border-2 border-primary shadow-2xl shadow-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Icon name="Trophy" size={24} />
                  Достижение разблокировано!
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white">
                <p className="font-bold text-lg">{newUnlock.title}</p>
                <p className="text-sm opacity-90">{newUnlock.reward}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
