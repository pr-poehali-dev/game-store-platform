import { useState } from 'react';
import { Heart, MessageCircle, Share2, Trophy, Star, ShoppingBag, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ActivityFeedItem } from '@/types/notifications';
import Icon from '@/components/ui/icon';

interface ActivityFeedProps {
  activities: ActivityFeedItem[];
  onLike?: (activityId: string) => void;
  onComment?: (activityId: string) => void;
  onShare?: (activityId: string) => void;
}

const activityIcons = {
  game_purchase: 'ShoppingBag',
  achievement: 'Trophy',
  review: 'Star',
  friend_added: 'UserPlus',
  tournament_win: 'Trophy',
  level_up: 'TrendingUp',
};

const activityColors = {
  game_purchase: 'text-green-500',
  achievement: 'text-yellow-500',
  review: 'text-blue-500',
  friend_added: 'text-purple-500',
  tournament_win: 'text-orange-500',
  level_up: 'text-pink-500',
};

export default function ActivityFeed({
  activities,
  onLike,
  onComment,
  onShare,
}: ActivityFeedProps) {
  const [likedActivities, setLikedActivities] = useState<Set<string>>(new Set());

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Только что';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} мин назад`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} ч назад`;
    return `${Math.floor(seconds / 86400)} дн назад`;
  };

  const handleLike = (activityId: string) => {
    setLikedActivities((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(activityId)) {
        newSet.delete(activityId);
      } else {
        newSet.add(activityId);
      }
      return newSet;
    });
    onLike?.(activityId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Лента активности</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Icon name="Filter" size={14} className="mr-2" />
            Фильтры
          </Button>
        </div>
      </div>

      {activities.length === 0 ? (
        <Card className="p-12 text-center">
          <Icon name="Users" size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-muted-foreground">
            Активность друзей появится здесь
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Добавьте друзей, чтобы следить за их достижениями
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            const isLiked = likedActivities.has(activity.id) || activity.isLiked;
            const likeCount = activity.likes + (likedActivities.has(activity.id) ? (activity.isLiked ? 0 : 1) : (activity.isLiked ? -1 : 0));

            return (
              <Card key={activity.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex gap-3">
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    <AvatarImage src={activity.avatar} alt={activity.username} />
                    <AvatarFallback>{activity.username[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{activity.username}</span>
                        <Icon
                          name={activityIcons[activity.type]}
                          size={16}
                          className={activityColors[activity.type]}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {getTimeAgo(activity.timestamp)}
                      </span>
                    </div>

                    <h4 className="font-medium mb-1">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {activity.description}
                    </p>

                    {activity.gameImage && (
                      <div className="relative rounded-lg overflow-hidden mb-3 group cursor-pointer">
                        <img
                          src={activity.gameImage}
                          alt={activity.gameName}
                          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                          <span className="text-white font-medium text-sm">
                            {activity.gameName}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4 pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleLike(activity.id)}
                      >
                        <Icon
                          name="Heart"
                          size={16}
                          className={isLiked ? 'fill-red-500 text-red-500' : ''}
                        />
                        <span className={isLiked ? 'text-red-500' : ''}>
                          {likeCount}
                        </span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                        onClick={() => onComment?.(activity.id)}
                      >
                        <Icon name="MessageCircle" size={16} />
                        <span>{activity.comments}</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                        onClick={() => onShare?.(activity.id)}
                      >
                        <Icon name="Share2" size={16} />
                        Поделиться
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
