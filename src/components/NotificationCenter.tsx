import { useState } from 'react';
import { Bell, X, Check, Gift, Users, Trophy, MessageSquare, TrendingUp, Gamepad2, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Notification, NotificationType } from '@/types/notifications';
import Icon from '@/components/ui/icon';

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onNotificationClick?: (notification: Notification) => void;
}

const notificationIcons: Record<NotificationType, string> = {
  friend_request: 'UserPlus',
  friend_accepted: 'UserCheck',
  game_invite: 'Gamepad2',
  team_invite: 'Users',
  new_game: 'Package',
  game_discount: 'Tag',
  achievement: 'Trophy',
  message: 'MessageSquare',
  tournament: 'Trophy',
  friend_online: 'CircleDot',
  stream_started: 'Video',
};

const priorityColors = {
  low: 'bg-gray-500',
  medium: 'bg-blue-500',
  high: 'bg-red-500',
};

export default function NotificationCenter({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onNotificationClick,
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Только что';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} мин назад`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} ч назад`;
    return `${Math.floor(seconds / 86400)} дн назад`;
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
    onNotificationClick?.(notification);
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-96 bg-background border rounded-lg shadow-xl z-50">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Уведомления</h3>
              {unreadCount > 0 && (
                <Badge variant="secondary">{unreadCount} новых</Badge>
              )}
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onMarkAllAsRead}
                disabled={unreadCount === 0}
              >
                <Icon name="Check" size={14} className="mr-1" />
                Прочитать всё
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[500px]">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Icon name="Bell" size={48} className="mx-auto mb-3 opacity-30" />
                <p>Нет уведомлений</p>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 cursor-pointer transition-all hover:bg-accent/50 ${
                      !notification.read ? 'bg-primary/5' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${priorityColors[notification.priority]}/20`}>
                        <Icon
                          name={notificationIcons[notification.type]}
                          size={20}
                          className={priorityColors[notification.priority].replace('bg-', 'text-')}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        {notification.image && (
                          <img
                            src={notification.image}
                            alt=""
                            className="mt-2 rounded w-full h-32 object-cover"
                          />
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            {getTimeAgo(notification.timestamp)}
                          </span>
                          {notification.actionText && (
                            <span className="text-xs font-medium text-primary">
                              {notification.actionText}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {notifications.length > 0 && (
            <div className="p-3 border-t">
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={onClearAll}
              >
                Очистить всё
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
