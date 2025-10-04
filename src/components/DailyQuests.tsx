import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Quest {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  reward: string;
  rewardAmount: number;
  completed: boolean;
  type: 'daily' | 'weekly' | 'special';
  expiresAt?: string;
}

const generateDailyQuests = (): Quest[] => {
  const today = new Date().toDateString();
  const saved = localStorage.getItem(`quests_${today}`);
  
  if (saved) {
    return JSON.parse(saved);
  }

  const newQuests: Quest[] = [
    {
      id: 'daily_login',
      title: '☀️ Ежедневный вход',
      description: 'Зайдите на сайт',
      icon: 'LogIn',
      progress: 1,
      maxProgress: 1,
      reward: 'кешбэк',
      rewardAmount: 50,
      completed: false,
      type: 'daily'
    },
    {
      id: 'daily_view',
      title: '👀 Просмотр игр',
      description: 'Откройте 5 страниц игр',
      icon: 'Eye',
      progress: 0,
      maxProgress: 5,
      reward: 'кешбэк',
      rewardAmount: 100,
      completed: false,
      type: 'daily'
    },
    {
      id: 'daily_wishlist',
      title: '❤️ Вишлист',
      description: 'Добавьте 3 игры в желаемое',
      icon: 'Heart',
      progress: 0,
      maxProgress: 3,
      reward: 'кешбэк',
      rewardAmount: 75,
      completed: false,
      type: 'daily'
    },
    {
      id: 'daily_compare',
      title: '⚖️ Сравнение',
      description: 'Сравните 2 игры',
      icon: 'Scale',
      progress: 0,
      maxProgress: 2,
      reward: 'кешбэк',
      rewardAmount: 100,
      completed: false,
      type: 'daily'
    },
    {
      id: 'weekly_purchase',
      title: '🛒 Покупка недели',
      description: 'Купите любую игру',
      icon: 'ShoppingCart',
      progress: 0,
      maxProgress: 1,
      reward: 'скидка',
      rewardAmount: 10,
      completed: false,
      type: 'weekly',
      expiresAt: getWeekEnd()
    },
    {
      id: 'weekly_tournament',
      title: '🏆 Турнирный боец',
      description: 'Участвуйте в турнире',
      icon: 'Trophy',
      progress: 0,
      maxProgress: 1,
      reward: 'кешбэк',
      rewardAmount: 500,
      completed: false,
      type: 'weekly',
      expiresAt: getWeekEnd()
    }
  ];

  localStorage.setItem(`quests_${today}`, JSON.stringify(newQuests));
  return newQuests;
};

function getWeekEnd(): string {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilSunday = 7 - dayOfWeek;
  const sunday = new Date(now);
  sunday.setDate(now.getDate() + daysUntilSunday);
  sunday.setHours(23, 59, 59);
  return sunday.toISOString();
}

interface DailyQuestsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DailyQuests({ isOpen, onClose }: DailyQuestsProps) {
  const [quests, setQuests] = useState<Quest[]>(generateDailyQuests());
  const [claimedRewards, setClaimedRewards] = useState<Quest[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem(`quests_${today}`);
    if (saved) {
      setQuests(JSON.parse(saved));
    }
  }, [isOpen]);

  const updateQuest = (questId: string, newProgress: number) => {
    const today = new Date().toDateString();
    const updatedQuests = quests.map(q => {
      if (q.id === questId && !q.completed) {
        const progress = Math.min(newProgress, q.maxProgress);
        const completed = progress >= q.maxProgress;
        return { ...q, progress, completed };
      }
      return q;
    });
    
    setQuests(updatedQuests);
    localStorage.setItem(`quests_${today}`, JSON.stringify(updatedQuests));
  };

  const claimReward = (quest: Quest) => {
    if (!quest.completed || claimedRewards.find(q => q.id === quest.id)) return;

    setClaimedRewards([...claimedRewards, quest]);
    
    toast({
      title: '🎉 Награда получена!',
      description: `${quest.reward === 'кешбэк' ? `${quest.rewardAmount}₽ кешбэка` : `${quest.rewardAmount}% скидка`}`,
    });
  };

  const dailyQuests = quests.filter(q => q.type === 'daily');
  const weeklyQuests = quests.filter(q => q.type === 'weekly');
  
  const completedDaily = dailyQuests.filter(q => q.completed).length;
  const completedWeekly = weeklyQuests.filter(q => q.completed).length;
  
  const totalRewards = claimedRewards.reduce((sum, q) => {
    return sum + (q.reward === 'кешбэк' ? q.rewardAmount : 0);
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-4 pb-20">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                🎯 Квесты и задания
              </h1>
              <p className="text-muted-foreground mt-1">
                Выполняйте задания и получайте награды!
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
                <CardTitle className="text-lg">Дневные квесты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">
                  {completedDaily}/{dailyQuests.length}
                </div>
                <Progress value={(completedDaily / dailyQuests.length) * 100} className="h-2" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/20 to-secondary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Недельные квесты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary mb-2">
                  {completedWeekly}/{weeklyQuests.length}
                </div>
                <Progress value={(completedWeekly / weeklyQuests.length) * 100} className="h-2" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent/20 to-accent/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Получено наград</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">
                  {totalRewards}₽
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Кешбэк в этой сессии
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-4">📅 Ежедневные квесты</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dailyQuests.map((quest) => (
                  <motion.div
                    key={quest.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className={quest.completed ? 'bg-gradient-to-br from-card to-primary/10' : 'bg-card/50'}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-xl ${quest.completed ? 'bg-primary/20' : 'bg-muted'}`}>
                              <Icon 
                                name={quest.icon as any} 
                                size={24} 
                                className={quest.completed ? 'text-primary' : 'text-muted-foreground'} 
                              />
                            </div>
                            <div>
                              <CardTitle className="text-base">{quest.title}</CardTitle>
                              <CardDescription>{quest.description}</CardDescription>
                            </div>
                          </div>
                          {quest.completed && (
                            <Icon name="CheckCircle2" size={20} className="text-primary" />
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Прогресс</span>
                            <span className="font-semibold">
                              {quest.progress}/{quest.maxProgress}
                            </span>
                          </div>
                          <Progress 
                            value={(quest.progress / quest.maxProgress) * 100} 
                            className="h-2"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm">
                            <Icon name="Gift" size={14} className="text-primary" />
                            <span className="font-semibold">
                              {quest.reward === 'кешбэк' ? `${quest.rewardAmount}₽` : `${quest.rewardAmount}%`}
                            </span>
                          </div>

                          {quest.completed && (
                            <Button
                              size="sm"
                              onClick={() => claimReward(quest)}
                              disabled={claimedRewards.find(q => q.id === quest.id) !== undefined}
                              className="bg-gradient-to-r from-primary to-secondary"
                            >
                              {claimedRewards.find(q => q.id === quest.id) ? (
                                <>
                                  <Icon name="Check" size={14} className="mr-1" />
                                  Получено
                                </>
                              ) : (
                                <>
                                  <Icon name="Gift" size={14} className="mr-1" />
                                  Забрать
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">📆 Недельные квесты</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {weeklyQuests.map((quest) => (
                  <motion.div
                    key={quest.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className={quest.completed ? 'bg-gradient-to-br from-card to-secondary/10 border-secondary' : 'bg-card/50'}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-xl ${quest.completed ? 'bg-secondary/20' : 'bg-muted'}`}>
                              <Icon 
                                name={quest.icon as any} 
                                size={24} 
                                className={quest.completed ? 'text-secondary' : 'text-muted-foreground'} 
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <CardTitle className="text-base">{quest.title}</CardTitle>
                                <Badge variant="secondary" className="text-xs">Неделя</Badge>
                              </div>
                              <CardDescription>{quest.description}</CardDescription>
                            </div>
                          </div>
                          {quest.completed && (
                            <Icon name="CheckCircle2" size={20} className="text-secondary" />
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Прогресс</span>
                            <span className="font-semibold">
                              {quest.progress}/{quest.maxProgress}
                            </span>
                          </div>
                          <Progress 
                            value={(quest.progress / quest.maxProgress) * 100} 
                            className="h-2"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm">
                            <Icon name="Sparkles" size={14} className="text-secondary" />
                            <span className="font-semibold">
                              {quest.reward === 'кешбэк' ? `${quest.rewardAmount}₽` : `${quest.rewardAmount}% скидка`}
                            </span>
                          </div>

                          {quest.completed && (
                            <Button
                              size="sm"
                              onClick={() => claimReward(quest)}
                              disabled={claimedRewards.find(q => q.id === quest.id) !== undefined}
                              className="bg-gradient-to-r from-secondary to-accent"
                            >
                              {claimedRewards.find(q => q.id === quest.id) ? (
                                <>
                                  <Icon name="Check" size={14} className="mr-1" />
                                  Получено
                                </>
                              ) : (
                                <>
                                  <Icon name="Sparkles" size={14} className="mr-1" />
                                  Забрать
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
