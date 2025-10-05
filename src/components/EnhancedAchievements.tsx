import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { motion, AnimatePresence } from 'framer-motion';
import { ACHIEVEMENTS, checkAchievements } from '@/data/achievements';
import { Achievement, ACHIEVEMENT_COLORS, UserStats } from '@/types/achievements';
import { toast } from 'sonner';

export default function EnhancedAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [stats, setStats] = useState<UserStats>({
    totalPurchases: 1,
    totalSpent: 2500,
    gamesOwned: 3,
    wishlistSize: 5,
    friendsCount: 2,
    reviewsWritten: 0,
    tournamentsParticipated: 0,
    level: 3,
    xp: 450,
    nextLevelXp: 1000,
    totalAchievements: ACHIEVEMENTS.length,
    unlockedAchievements: 1
  });

  useEffect(() => {
    const savedStats = localStorage.getItem('godstore-user-stats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
    updateAchievements();
  }, []);

  const updateAchievements = () => {
    const updated = checkAchievements(stats);
    setAchievements(updated);
    
    const unlocked = updated.filter(a => a.unlocked).length;
    setStats(prev => ({ ...prev, unlockedAchievements: unlocked }));
  };

  const filteredAchievements = achievements.filter(a => {
    if (filter === 'all') return true;
    if (filter === 'unlocked') return a.unlocked;
    if (filter === 'locked') return !a.unlocked;
    return a.category === filter;
  });

  const progressPercent = (stats.unlockedAchievements / stats.totalAchievements) * 100;

  return (
    <section id="achievements" className="py-16 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            🏆 Достижения и награды
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Открывайте новые достижения, получайте награды и прокачивайте свой профиль геймера
          </p>
        </motion.div>

        <Card className="mb-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-2">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="TrendingUp" className="text-primary" />
                  Уровень {stats.level}
                </CardTitle>
                <CardDescription>
                  {stats.xp} / {stats.nextLevelXp} XP до следующего уровня
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">
                  {stats.unlockedAchievements}/{stats.totalAchievements}
                </div>
                <div className="text-sm text-muted-foreground">Открыто достижений</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Прогресс уровня</span>
                  <span className="text-primary font-semibold">
                    {Math.round((stats.xp / stats.nextLevelXp) * 100)}%
                  </span>
                </div>
                <Progress value={(stats.xp / stats.nextLevelXp) * 100} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Открыто достижений</span>
                  <span className="text-secondary font-semibold">
                    {Math.round(progressPercent)}%
                  </span>
                </div>
                <Progress value={progressPercent} className="h-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
          <TabsList className="grid grid-cols-3 lg:grid-cols-7 mb-8">
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="unlocked">Открытые</TabsTrigger>
            <TabsTrigger value="locked">Закрытые</TabsTrigger>
            <TabsTrigger value="purchase">Покупки</TabsTrigger>
            <TabsTrigger value="collection">Коллекция</TabsTrigger>
            <TabsTrigger value="social">Социальные</TabsTrigger>
            <TabsTrigger value="special">Особые</TabsTrigger>
          </TabsList>

          <TabsContent value={filter}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={`relative overflow-hidden transition-all hover:shadow-xl ${
                        achievement.unlocked
                          ? 'border-primary/50 bg-gradient-to-br from-primary/5 to-transparent'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      {achievement.unlocked && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-primary text-primary-foreground">
                            ✓ Открыто
                          </Badge>
                        </div>
                      )}
                      
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-xl bg-gradient-to-br ${
                              ACHIEVEMENT_COLORS[achievement.rarity]
                            } text-white shrink-0`}
                          >
                            <Icon name={achievement.icon as any} size={28} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <CardTitle className="text-lg truncate">
                                {achievement.title}
                              </CardTitle>
                              <span className="text-2xl shrink-0">
                                {achievement.reward.badge}
                              </span>
                            </div>
                            <Badge
                              variant="outline"
                              className={`text-xs bg-gradient-to-r ${
                                ACHIEVEMENT_COLORS[achievement.rarity]
                              } text-white border-0`}
                            >
                              {achievement.rarity.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                        
                        {!achievement.unlocked && (
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Прогресс</span>
                              <span className="font-semibold">
                                {achievement.progress} / {achievement.maxProgress}
                              </span>
                            </div>
                            <Progress
                              value={(achievement.progress / achievement.maxProgress) * 100}
                              className="h-2"
                            />
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Award" size={16} className="text-primary" />
                          <span className="font-semibold text-primary">
                            +{achievement.reward.points} XP
                          </span>
                          {achievement.reward.title && (
                            <Badge variant="secondary" className="ml-auto">
                              {achievement.reward.title}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
