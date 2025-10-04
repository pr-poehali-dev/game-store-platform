import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface Tournament {
  id: number;
  name: string;
  description: string;
  game_title: string;
  prize_pool: number;
  start_date: string;
  end_date: string;
  max_participants: number;
  participants_count: number;
  status: string;
  rules: string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  email: string;
}

export default function TournamentsSection() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);

  useEffect(() => {
    loadTournaments();
    loadLeaderboard();
  }, []);

  const loadTournaments = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/44d0df50-6503-4edb-a8b4-a3fdcb5b8f26?action=list_tournaments');
      const data = await response.json();
      setTournaments(data.tournaments || []);
    } catch (error) {
      console.error('Failed to load tournaments');
    } finally {
      setLoading(false);
    }
  };

  const loadLeaderboard = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/44d0df50-6503-4edb-a8b4-a3fdcb5b8f26?action=leaderboard&category=total_spent');
      const data = await response.json();
      setLeaderboard(data.leaderboard || []);
    } catch (error) {
      console.error('Failed to load leaderboard');
    }
  };

  const joinTournament = async (tournamentId: number) => {
    try {
      const response = await fetch('https://functions.poehali.dev/44d0df50-6503-4edb-a8b4-a3fdcb5b8f26', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': '1'
        },
        body: JSON.stringify({
          action: 'join_tournament',
          tournament_id: tournamentId
        })
      });
      
      const data = await response.json();
      toast.success(data.message);
      loadTournaments();
    } catch (error) {
      toast.error('Не удалось присоединиться к турниру');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      active: { label: 'Активен', className: 'bg-neon-green' },
      upcoming: { label: 'Скоро', className: 'bg-neon-purple' },
      completed: { label: 'Завершён', className: 'bg-muted' },
    };
    const info = statusMap[status] || statusMap.upcoming;
    return <Badge className={`${info.className} text-white`}>{info.label}</Badge>;
  };

  return (
    <section id="tournaments" className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-neon-green via-neon-pink to-neon-purple bg-clip-text text-transparent">
            🏆 Турниры и Соревнования
          </h2>
          <p className="text-muted-foreground text-lg">
            Участвуйте в турнирах, зарабатывайте призы и попадайте в топ игроков!
          </p>
        </div>

        <Tabs defaultValue="tournaments" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="tournaments">
              <Icon name="Trophy" size={16} className="mr-2" />
              Турниры
            </TabsTrigger>
            <TabsTrigger value="leaderboard">
              <Icon name="Award" size={16} className="mr-2" />
              Лидерборд
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tournaments">
            {loading ? (
              <div className="flex justify-center py-12">
                <Icon name="Loader2" size={48} className="animate-spin text-primary" />
              </div>
            ) : tournaments.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Icon name="Trophy" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">Турниры скоро появятся!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tournaments.map((tournament, index) => (
                  <motion.div
                    key={tournament.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:border-neon-purple/50 transition-all">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-xl">{tournament.name}</CardTitle>
                          {getStatusBadge(tournament.status)}
                        </div>
                        <CardDescription>{tournament.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Призовой фонд</span>
                          <span className="font-bold text-neon-green text-lg">
                            {tournament.prize_pool.toLocaleString()}₽
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Участников</span>
                          <span className="font-semibold">
                            {tournament.participants_count} / {tournament.max_participants}
                          </span>
                        </div>

                        {tournament.game_title && (
                          <div className="flex items-center gap-2 text-sm">
                            <Icon name="Gamepad2" size={14} />
                            <span>{tournament.game_title}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="Calendar" size={14} />
                          <span>{new Date(tournament.start_date).toLocaleDateString('ru-RU')}</span>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => setSelectedTournament(tournament)}
                            >
                              Подробнее
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{tournament.name}</DialogTitle>
                              <DialogDescription>{tournament.description}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold mb-2">Правила:</h4>
                                <p className="text-sm text-muted-foreground whitespace-pre-line">
                                  {tournament.rules || 'Правила будут объявлены позже'}
                                </p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Старт</p>
                                  <p className="font-semibold">
                                    {new Date(tournament.start_date).toLocaleString('ru-RU')}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Окончание</p>
                                  <p className="font-semibold">
                                    {new Date(tournament.end_date).toLocaleString('ru-RU')}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {tournament.status === 'active' && (
                          <Button 
                            className="w-full bg-gradient-to-r from-neon-purple to-neon-pink"
                            onClick={() => joinTournament(tournament.id)}
                          >
                            <Icon name="Users" size={16} className="mr-2" />
                            Участвовать
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Award" size={24} className="text-neon-green" />
                  Топ игроков по покупкам
                </CardTitle>
                <CardDescription>Лучшие пользователи магазина</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  {leaderboard.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="Award" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">Лидеров пока нет</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {leaderboard.map((entry, index) => (
                        <motion.div
                          key={entry.rank}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex items-center gap-4 p-4 rounded-lg ${
                            entry.rank === 1 ? 'bg-gradient-to-r from-yellow-500/20 to-transparent' :
                            entry.rank === 2 ? 'bg-gradient-to-r from-gray-400/20 to-transparent' :
                            entry.rank === 3 ? 'bg-gradient-to-r from-orange-600/20 to-transparent' :
                            'bg-muted/50'
                          }`}
                        >
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center font-bold text-lg">
                            {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : entry.rank}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{entry.name}</p>
                            <p className="text-sm text-muted-foreground">{entry.email}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-neon-green">{entry.score.toLocaleString()}₽</p>
                            <p className="text-xs text-muted-foreground">Потрачено</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
