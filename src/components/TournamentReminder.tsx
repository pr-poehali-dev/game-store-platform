import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { motion, AnimatePresence } from 'framer-motion';

interface Tournament {
  id: number;
  title: string;
  startDate: string;
  prizePool: number;
}

interface TournamentReminderProps {
  tournaments: Tournament[];
}

export default function TournamentReminder({ tournaments }: TournamentReminderProps) {
  const [upcomingTournament, setUpcomingTournament] = useState<Tournament | null>(null);
  const [timeUntilStart, setTimeUntilStart] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkUpcomingTournaments = () => {
      const now = new Date().getTime();
      const oneHourFromNow = now + (60 * 60 * 1000);

      const upcoming = tournaments.find(t => {
        const startTime = new Date(t.startDate).getTime();
        return startTime > now && startTime <= oneHourFromNow;
      });

      if (upcoming) {
        setUpcomingTournament(upcoming);
        setIsVisible(true);
      }
    };

    checkUpcomingTournaments();
    const interval = setInterval(checkUpcomingTournaments, 60000);

    return () => clearInterval(interval);
  }, [tournaments]);

  useEffect(() => {
    if (!upcomingTournament) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const startTime = new Date(upcomingTournament.startDate).getTime();
      const distance = startTime - now;

      if (distance < 0) {
        setIsVisible(false);
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeUntilStart(`${hours}ч ${minutes}м ${seconds}с`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [upcomingTournament]);

  if (!isVisible || !upcomingTournament) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-20 right-4 z-40 max-w-sm"
      >
        <Card className="bg-gradient-to-br from-orange-500/20 via-red-500/20 to-pink-500/20 backdrop-blur-xl border-2 border-orange-500/50 shadow-2xl shadow-orange-500/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Icon name="Bell" size={20} className="text-orange-500 animate-bounce" />
                Турнир скоро!
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setIsVisible(false)}
              >
                <Icon name="X" size={14} />
              </Button>
            </div>
            <CardDescription className="text-foreground/90">
              {upcomingTournament.title}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex items-center justify-between bg-background/50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} className="text-orange-500" />
                <span className="text-sm font-semibold">До старта:</span>
              </div>
              <Badge className="bg-orange-500 text-white text-sm font-mono">
                {timeUntilStart}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">💰 Призовой фонд:</span>
              <span className="font-bold text-primary">
                {upcomingTournament.prizePool.toLocaleString('ru-RU')}₽
              </span>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90"
              onClick={() => window.location.href = '/tournaments'}
            >
              <Icon name="Rocket" size={16} className="mr-2" />
              Перейти к турниру
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
