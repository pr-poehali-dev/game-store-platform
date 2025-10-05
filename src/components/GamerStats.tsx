import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';

interface StatItem {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  progress?: number;
}

interface GamerStatsProps {
  stats: {
    gamesOwned: number;
    totalPlayTime: number;
    achievementsUnlocked: number;
    totalSpent: number;
    reviewsWritten: number;
    tournamentsWon: number;
    winRate: number;
  };
}

export default function GamerStats({ stats }: GamerStatsProps) {
  const statItems: StatItem[] = [
    {
      label: 'Игр в библиотеке',
      value: stats.gamesOwned,
      icon: 'Library',
      color: 'text-blue-500',
      progress: (stats.gamesOwned / 200) * 100
    },
    {
      label: 'Часов в играх',
      value: `${Math.floor(stats.totalPlayTime / 60)}ч`,
      icon: 'Clock',
      color: 'text-purple-500',
      progress: (stats.totalPlayTime / 5000) * 100
    },
    {
      label: 'Достижений открыто',
      value: stats.achievementsUnlocked,
      icon: 'Award',
      color: 'text-yellow-500',
      progress: (stats.achievementsUnlocked / 500) * 100
    },
    {
      label: 'Потрачено',
      value: `${stats.totalSpent.toLocaleString()}₽`,
      icon: 'Wallet',
      color: 'text-green-500'
    },
    {
      label: 'Отзывов написано',
      value: stats.reviewsWritten,
      icon: 'MessageSquare',
      color: 'text-pink-500'
    },
    {
      label: 'Турниров выиграно',
      value: stats.tournamentsWon,
      icon: 'Trophy',
      color: 'text-orange-500'
    },
    {
      label: 'Процент побед',
      value: `${stats.winRate}%`,
      icon: 'TrendingUp',
      color: 'text-cyan-500',
      progress: stats.winRate
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="overflow-hidden hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Icon name={item.icon as any} className={`${item.color} w-8 h-8`} />
                <div className="text-right">
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              </div>
            </CardHeader>
            {item.progress !== undefined && (
              <CardContent className="pt-0">
                <Progress value={Math.min(item.progress, 100)} className="h-2" />
              </CardContent>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
