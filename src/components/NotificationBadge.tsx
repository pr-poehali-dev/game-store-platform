import { useState, forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'sale' | 'achievement' | 'cashback' | 'tournament';
  title: string;
  message: string;
  time: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'sale',
    title: '🔥 Скидка 50% на GTA VI!',
    message: 'Успей купить хит года со скидкой',
    time: '5 мин назад'
  },
  {
    id: '2',
    type: 'achievement',
    title: '🏆 Новое достижение!',
    message: 'Вы разблокировали "Коллекционер"',
    time: '15 мин назад'
  },
  {
    id: '3',
    type: 'cashback',
    title: '💰 Начислен кешбэк!',
    message: 'На ваш счет зачислено 250₽',
    time: '30 мин назад'
  },
  {
    id: '4',
    type: 'tournament',
    title: '🎮 Турнир через 2 часа!',
    message: 'FIFA 24 Championship начинается в 18:00',
    time: '45 мин назад'
  }
];

const NotificationBadge = forwardRef<HTMLButtonElement>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'sale': return 'Tag';
      case 'achievement': return 'Trophy';
      case 'tournament': return 'Gamepad2';
      case 'cashback': return 'Coins';
    }
  };

  const getColor = (type: Notification['type']) => {
    switch (type) {
      case 'sale': return 'from-red-500 to-orange-500';
      case 'achievement': return 'from-yellow-500 to-amber-500';
      case 'tournament': return 'from-purple-500 to-pink-500';
      case 'cashback': return 'from-green-500 to-emerald-500';
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-20 right-4 z-50 w-96"
            >
              <Card className="bg-card/95 backdrop-blur-xl border-2 border-primary/20 shadow-2xl">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Bell" size={20} />
                      Уведомления
                      <Badge className="bg-red-500">{mockNotifications.length}</Badge>
                    </CardTitle>
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant="ghost"
                      size="sm"
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                </CardHeader>
                <ScrollArea className="h-[400px]">
                  <CardContent className="space-y-2">
                    {mockNotifications.map((notification) => (
                      <Card
                        key={notification.id}
                        className="cursor-pointer transition-all hover:scale-[1.02] bg-primary/5 border-primary/30"
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
                              <h4 className="font-semibold text-sm leading-tight mb-1">
                                {notification.title}
                              </h4>
                              <p className="text-xs text-muted-foreground mb-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground/70">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </ScrollArea>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Button 
        ref={ref}
        {...props}
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost" 
        size="sm" 
        className="relative border border-purple-500/30 bg-gradient-to-r from-green-500/10 to-purple-500/10"
      >
        <Icon name="Bell" size={18} className="text-green-500" />
        {mockNotifications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </Button>
    </>
  );
});

NotificationBadge.displayName = 'NotificationBadge';

export default NotificationBadge;