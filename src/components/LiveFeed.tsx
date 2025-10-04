import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { motion, AnimatePresence } from 'framer-motion';

interface Activity {
  id: string;
  type: 'purchase' | 'review' | 'achievement' | 'wishlist';
  user: {
    name: string;
    avatar: string;
    country: string;
    flag: string;
  };
  game: string;
  timestamp: Date;
  details?: string;
  rating?: number;
}

const countries = [
  { name: 'Россия', flag: '🇷🇺' },
  { name: 'США', flag: '🇺🇸' },
  { name: 'Турция', flag: '🇹🇷' },
  { name: 'Украина', flag: '🇺🇦' },
  { name: 'Китай', flag: '🇨🇳' },
  { name: 'Европа', flag: '🇪🇺' },
];

const games = [
  'Cyberpunk 2077',
  'The Witcher 3',
  'GTA V',
  'Red Dead Redemption 2',
  'Elden Ring',
  'God of War',
  'Horizon Zero Dawn',
  'Spider-Man',
  'The Last of Us',
  'Uncharted 4',
];

const names = [
  'Александр', 'Мария', 'Дмитрий', 'Анна', 'Иван',
  'John', 'Emily', 'Michael', 'Sarah', 'David',
  'Mehmet', 'Ayşe', 'Ahmet', 'Fatma', 'Ali',
  '李明', '王芳', '张伟', '刘洋', '陈静',
];

const generateRandomActivity = (): Activity => {
  const types: Activity['type'][] = ['purchase', 'review', 'achievement', 'wishlist'];
  const type = types[Math.floor(Math.random() * types.length)];
  const country = countries[Math.floor(Math.random() * countries.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  const game = games[Math.floor(Math.random() * games.length)];

  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    user: {
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      country: country.name,
      flag: country.flag,
    },
    game,
    timestamp: new Date(),
    rating: type === 'review' ? Math.floor(Math.random() * 5) + 6 : undefined,
    details: type === 'achievement' ? 'Разблокировал достижение "Легенда"' : undefined,
  };
};

export default function LiveFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const initialActivities = Array.from({ length: 8 }, generateRandomActivity);
    setActivities(initialActivities);

    const interval = setInterval(() => {
      const newActivity = generateRandomActivity();
      setActivities((prev) => [newActivity, ...prev.slice(0, 9)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'purchase':
        return 'ShoppingCart';
      case 'review':
        return 'Star';
      case 'achievement':
        return 'Trophy';
      case 'wishlist':
        return 'Heart';
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'purchase':
        return 'купил(а)';
      case 'review':
        return `оценил(а) на ${activity.rating}/10`;
      case 'achievement':
        return 'получил(а) достижение в';
      case 'wishlist':
        return 'добавил(а) в желаемое';
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'purchase':
        return 'bg-green-500/10 text-green-500';
      case 'review':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'achievement':
        return 'bg-purple-500/10 text-purple-500';
      case 'wishlist':
        return 'bg-pink-500/10 text-pink-500';
    }
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'только что';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} мин назад`;
    const hours = Math.floor(minutes / 60);
    return `${hours} ч назад`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Radio" size={24} className="text-primary animate-pulse" />
          Активность прямо сейчас
        </CardTitle>
        <CardDescription>
          Пользователи со всего мира покупают и играют
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          <AnimatePresence mode="popLayout">
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-all hover:bg-accent/30"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm truncate">
                      {activity.user.name}
                    </span>
                    <span className="text-xs">{activity.user.flag}</span>
                    <Badge variant="outline" className={`text-xs ${getActivityColor(activity.type)}`}>
                      <Icon name={getActivityIcon(activity.type)} size={10} className="mr-1" />
                      {getActivityText(activity)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {activity.game}
                  </p>
                  {activity.details && (
                    <p className="text-xs text-primary mt-1">{activity.details}</p>
                  )}
                </div>

                <span className="text-xs text-muted-foreground shrink-0">
                  {getTimeAgo(activity.timestamp)}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
