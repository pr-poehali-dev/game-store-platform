import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'sale' | 'new' | 'achievement' | 'tournament' | 'cashback';
  title: string;
  message: string;
  time: Date;
  read: boolean;
  action?: () => void;
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Генерируем начальные уведомления
    const initialNotifications: Notification[] = [
      {
        id: '1',
        type: 'sale',
        title: '🔥 Скидка 50% на GTA VI!',
        message: 'Успей купить хит года со скидкой до конца дня!',
        time: new Date(Date.now() - 5 * 60000),
        read: false,
        action: () => window.scrollTo({ top: 0, behavior: 'smooth' })
      },
      {
        id: '2',
        type: 'achievement',
        title: '🏆 Новое достижение!',
        message: 'Вы разблокировали "Коллекционер" - купили 10 игр',
        time: new Date(Date.now() - 15 * 60000),
        read: false
      },
      {
        id: '3',
        type: 'cashback',
        title: '💰 Начислен кешбэк!',
        message: 'На ваш счет зачислено 250₽ кешбэка',
        time: new Date(Date.now() - 30 * 60000),
        read: false
      },
      {
        id: '4',
        type: 'tournament',
        title: '🎮 Турнир через 2 часа!',
        message: 'FIFA 24 Championship начинается в 18:00',
        time: new Date(Date.now() - 45 * 60000),
        read: false
      }
    ];

    setNotifications(initialNotifications);

    // Симулируем новые уведомления каждые 30 секунд
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: ['sale', 'new', 'achievement', 'cashback'][Math.floor(Math.random() * 4)] as any,
        title: '🎁 Новое предложение!',
        message: 'Специальная акция только для вас!',
        time: new Date(),
        read: false
      };
      setNotifications(prev => [newNotification, ...prev].slice(0, 10));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'sale': return 'Tag';
      case 'new': return 'Sparkles';
      case 'achievement': return 'Trophy';
      case 'tournament': return 'Gamepad2';
      case 'cashback': return 'Coins';
    }
  };

  const getColor = (type: Notification['type']) => {
    switch (type) {
      case 'sale': return 'from-red-500 to-orange-500';
      case 'new': return 'from-blue-500 to-cyan-500';
      case 'achievement': return 'from-yellow-500 to-amber-500';
      case 'tournament': return 'from-purple-500 to-pink-500';
      case 'cashback': return 'from-green-500 to-emerald-500';
    }
  };

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'только что';
    if (minutes < 60) return `${minutes} мин назад`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ч назад`;
    return `${Math.floor(hours / 24)} д назад`;
  };

  return (
    <>
      <div className="fixed top-20 right-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-gradient-to-r from-primary to-secondary shadow-lg hover:scale-110 transition-transform"
          size="lg"
        >
          <Icon name="Bell" size={20} />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[20px] h-5 flex items-center justify-center rounded-full">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-32 right-4 z-50 w-96 max-h-[600px] overflow-hidden"
          >
            <Card className="bg-card/95 backdrop-blur-xl border-2 border-primary/20 shadow-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Bell" size={20} />
                    Уведомления
                    {unreadCount > 0 && (
                      <Badge className="bg-red-500">{unreadCount}</Badge>
                    )}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      onClick={markAllAsRead}
                      variant="ghost"
                      size="sm"
                    >
                      <Icon name="CheckCheck" size={16} />
                    </Button>
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant="ghost"
                      size="sm"
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="overflow-y-auto max-h-[500px] space-y-2">
                {notifications.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="Inbox" size={48} className="mx-auto mb-2 opacity-50" />
                    <p>Нет уведомлений</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all hover:scale-[1.02] ${
                          !notification.read
                            ? 'bg-primary/5 border-primary/30'
                            : 'bg-card/50'
                        }`}
                        onClick={() => {
                          markAsRead(notification.id);
                          notification.action?.();
                        }}
                      >
                        <CardContent className="p-3">
                          <div className="flex gap-3">
                            <div
                              className={`w-10 h-10 rounded-full bg-gradient-to-r ${getColor(
                                notification.type
                              )} flex items-center justify-center flex-shrink-0`}
                            >
                              <Icon
                                name={getIcon(notification.type)}
                                size={20}
                                className="text-white"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="font-semibold text-sm leading-tight">
                                  {notification.title}
                                </h4>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mb-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground/70">
                                {formatTime(notification.time)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
