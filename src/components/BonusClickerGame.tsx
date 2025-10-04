import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface ClickEffect {
  id: number;
  x: number;
  y: number;
  value: number;
}

export default function BonusClickerGame() {
  const [coins, setCoins] = useState(() => {
    return parseInt(localStorage.getItem('clicker_coins') || '0');
  });
  const [clickPower, setClickPower] = useState(() => {
    return parseInt(localStorage.getItem('clicker_power') || '1');
  });
  const [autoClicker, setAutoClicker] = useState(() => {
    return parseInt(localStorage.getItem('clicker_auto') || '0');
  });
  const [level, setLevel] = useState(1);
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const [dailyClicks, setDailyClicks] = useState(0);
  const [maxDailyClicks] = useState(100);
  const { toast } = useToast();

  useEffect(() => {
    const today = new Date().toDateString();
    const lastPlayDate = localStorage.getItem('clicker_last_play');
    
    if (lastPlayDate !== today) {
      setDailyClicks(0);
      localStorage.setItem('clicker_last_play', today);
    } else {
      const saved = localStorage.getItem('clicker_daily_clicks');
      if (saved) setDailyClicks(parseInt(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('clicker_coins', coins.toString());
    localStorage.setItem('clicker_power', clickPower.toString());
    localStorage.setItem('clicker_auto', autoClicker.toString());
    localStorage.setItem('clicker_daily_clicks', dailyClicks.toString());
  }, [coins, clickPower, autoClicker, dailyClicks]);

  useEffect(() => {
    if (autoClicker > 0) {
      const interval = setInterval(() => {
        setCoins(prev => prev + autoClicker);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoClicker]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dailyClicks >= maxDailyClicks) {
      toast({
        title: '⏰ Лимит достигнут',
        description: 'Приходите завтра за новыми бонусами!',
        variant: 'destructive'
      });
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const bonus = Math.random() > 0.9 ? clickPower * 5 : clickPower;
    const newEffect: ClickEffect = {
      id: Date.now() + Math.random(),
      x,
      y,
      value: bonus
    };

    setClickEffects(prev => [...prev, newEffect]);
    setCoins(prev => prev + bonus);
    setDailyClicks(prev => prev + 1);

    setTimeout(() => {
      setClickEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
    }, 1000);

    const newLevel = Math.floor(coins / 1000) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      toast({
        title: '🎉 Новый уровень!',
        description: `Вы достигли ${newLevel} уровня!`,
      });
    }
  };

  const buyUpgrade = (type: 'power' | 'auto') => {
    const costs = {
      power: clickPower * 100,
      auto: (autoClicker + 1) * 500
    };

    const cost = costs[type];

    if (coins >= cost) {
      setCoins(prev => prev - cost);
      
      if (type === 'power') {
        setClickPower(prev => prev + 1);
        toast({
          title: '⚡ Улучшение куплено!',
          description: `Сила клика: ${clickPower + 1}`,
        });
      } else {
        setAutoClicker(prev => prev + 1);
        toast({
          title: '🤖 Автокликер куплен!',
          description: `+${autoClicker + 1} монет/сек`,
        });
      }
    } else {
      toast({
        title: '💰 Недостаточно монет',
        description: `Нужно еще ${cost - coins} монет`,
        variant: 'destructive'
      });
    }
  };

  const convertToBonus = () => {
    if (coins >= 1000) {
      const bonus = Math.floor(coins / 100);
      setCoins(0);
      toast({
        title: '🎁 Конвертация завершена!',
        description: `Вы получили ${bonus}₽ бонусов на счёт!`,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto bg-gradient-to-br from-card via-card/95 to-primary/5 border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                🎮 Кликер бонусов
              </CardTitle>
              <CardDescription>Кликайте и зарабатывайте реальные бонусы!</CardDescription>
            </div>
            <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-primary to-secondary">
              LVL {level}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-primary/20 to-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icon name="Coins" size={20} className="text-primary" />
                  Монеты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {coins.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/20 to-secondary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icon name="Zap" size={20} className="text-secondary" />
                  Сила клика
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">
                  +{clickPower}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Кликов сегодня</span>
              <span className="font-semibold">{dailyClicks}/{maxDailyClicks}</span>
            </div>
            <Progress value={(dailyClicks / maxDailyClicks) * 100} className="h-2" />
          </div>

          <div
            onClick={handleClick}
            className="relative h-64 rounded-2xl bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 border-4 border-primary/50 cursor-pointer hover:scale-105 transition-transform active:scale-95 flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.1),transparent)]" />
            
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-8xl"
            >
              💰
            </motion.div>

            <AnimatePresence>
              {clickEffects.map(effect => (
                <motion.div
                  key={effect.id}
                  initial={{ opacity: 1, y: 0, scale: 1 }}
                  animate={{ opacity: 0, y: -100, scale: 1.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute text-2xl font-bold text-primary pointer-events-none"
                  style={{ left: effect.x, top: effect.y }}
                >
                  +{effect.value}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => buyUpgrade('power')}
              className="bg-gradient-to-r from-primary to-secondary h-auto py-4 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon name="Zap" size={18} />
                <span>Сила клика</span>
              </div>
              <span className="text-xs opacity-80">
                💰 {clickPower * 100} монет
              </span>
            </Button>

            <Button
              onClick={() => buyUpgrade('auto')}
              className="bg-gradient-to-r from-secondary to-accent h-auto py-4 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon name="Bot" size={18} />
                <span>Автокликер</span>
              </div>
              <span className="text-xs opacity-80">
                💰 {(autoClicker + 1) * 500} монет
              </span>
            </Button>
          </div>

          {autoClicker > 0 && (
            <Card className="bg-gradient-to-r from-accent/20 to-accent/5 border-accent/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="Bot" size={20} className="text-accent" />
                    <span className="font-semibold">Автофарм активен</span>
                  </div>
                  <Badge variant="secondary">+{autoClicker}/сек</Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {coins >= 1000 && (
            <Button
              onClick={convertToBonus}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white h-auto py-6 text-lg"
            >
              <Icon name="Gift" size={24} className="mr-2" />
              Обменять на {Math.floor(coins / 100)}₽ бонусов
            </Button>
          )}

          <div className="text-xs text-center text-muted-foreground space-y-1">
            <p>💡 Совет: за каждые 1000 монет можно получить 10₽ бонусов</p>
            <p>🎲 5% шанс получить x5 монет за клик</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
