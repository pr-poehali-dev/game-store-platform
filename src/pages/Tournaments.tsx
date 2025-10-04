import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import DiscordNotificationForm from '@/components/DiscordNotificationForm';

interface Tournament {
  id: number;
  title: string;
  game: string;
  platform: 'Xbox' | 'PlayStation' | 'Both';
  prizePool: number;
  participants: number;
  maxParticipants: number;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'finished';
  image: string;
  format: string;
  rules: string[];
}

const mockTournaments: Tournament[] = [
  {
    id: 1,
    title: 'FIFA 24 Championship',
    game: 'FIFA 24',
    platform: 'Both',
    prizePool: 50000,
    participants: 145,
    maxParticipants: 256,
    startDate: '2025-10-15',
    endDate: '2025-10-20',
    status: 'upcoming',
    image: '/img/07b31484-fafc-4615-a8a0-3f3514bc568a.jpg',
    format: 'Single Elimination',
    rules: ['Возраст 16+', 'Без читов', 'Максимум 3 замены']
  },
  {
    id: 2,
    title: 'Call of Duty Warzone Battle',
    game: 'Call of Duty: Warzone',
    platform: 'Xbox',
    prizePool: 100000,
    participants: 64,
    maxParticipants: 128,
    startDate: '2025-10-08',
    endDate: '2025-10-12',
    status: 'active',
    image: '/img/07b31484-fafc-4615-a8a0-3f3514bc568a.jpg',
    format: 'Battle Royale',
    rules: ['Только соло', 'Запрещены взрывчатки', 'Убийства = очки']
  },
  {
    id: 3,
    title: 'Rocket League Pro League',
    game: 'Rocket League',
    platform: 'PlayStation',
    prizePool: 75000,
    participants: 32,
    maxParticipants: 64,
    startDate: '2025-10-10',
    endDate: '2025-10-14',
    status: 'upcoming',
    image: '/img/07b31484-fafc-4615-a8a0-3f3514bc568a.jpg',
    format: '3v3 Teams',
    rules: ['Командная игра', 'Без модификаций', 'Стандартные арены']
  },
  {
    id: 4,
    title: 'Elden Ring Speedrun',
    game: 'Elden Ring',
    platform: 'Both',
    prizePool: 25000,
    participants: 89,
    maxParticipants: 100,
    startDate: '2025-09-25',
    endDate: '2025-09-30',
    status: 'finished',
    image: '/img/07b31484-fafc-4615-a8a0-3f3514bc568a.jpg',
    format: 'Any% Speedrun',
    rules: ['Любые глитчи разрешены', 'Без модов', 'Таймер обязателен']
  }
];

export default function Tournaments() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'active' | 'finished'>('all');
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tournaments, setTournaments] = useState(mockTournaments);
  const { toast } = useToast();

  const filteredTournaments = filter === 'all' 
    ? tournaments 
    : tournaments.filter(t => t.status === filter);

  const handleRegister = (tournament: Tournament) => {
    if (tournament.participants >= tournament.maxParticipants) {
      toast({
        title: '❌ Регистрация закрыта',
        description: 'Турнир переполнен. Попробуйте другие турниры.',
        variant: 'destructive'
      });
      return;
    }

    setSelectedTournament(tournament);
    setIsFormOpen(true);
  };

  const handleRegistrationSuccess = () => {
    if (selectedTournament) {
      setTournaments(prev => prev.map(t => 
        t.id === selectedTournament.id 
          ? { ...t, participants: t.participants + 1 }
          : t
      ));
    }
  };

  const getStatusBadge = (status: Tournament['status']) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-600 text-white">📅 Скоро</Badge>;
      case 'active':
        return <Badge className="bg-green-600 text-white animate-pulse">🎮 Идет</Badge>;
      case 'finished':
        return <Badge className="bg-gray-600 text-white">✅ Завершен</Badge>;
    }
  };

  const getPlatformIcon = (platform: Tournament['platform']) => {
    if (platform === 'Both') return '🎮';
    if (platform === 'Xbox') return '🟢';
    return '🔵';
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            🏆 Киберспортивные Турниры
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Участвуйте в соревнованиях, выигрывайте призы и становитесь чемпионом!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-3 flex-wrap"
        >
          {(['all', 'upcoming', 'active', 'finished'] as const).map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              onClick={() => setFilter(status)}
              className={filter === status ? 'bg-primary text-primary-foreground' : ''}
            >
              {status === 'all' && '🎯 Все'}
              {status === 'upcoming' && '📅 Скоро'}
              {status === 'active' && '🎮 Идут'}
              {status === 'finished' && '✅ Завершенные'}
            </Button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament, index) => (
            <motion.div
              key={tournament.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="h-full bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-xl border-2 border-border/50 hover:border-primary/80 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 overflow-hidden group">
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={tournament.image} 
                    alt={tournament.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex gap-2">
                    {getStatusBadge(tournament.status)}
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                      {getPlatformIcon(tournament.platform)} {tournament.platform}
                    </Badge>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                      {tournament.title}
                    </h3>
                    <p className="text-sm text-gray-200 drop-shadow-md">
                      {tournament.game}
                    </p>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon name="Trophy" size={20} className="text-yellow-500" />
                      <span className="text-2xl font-bold text-primary">
                        {tournament.prizePool.toLocaleString('ru-RU')}₽
                      </span>
                    </div>
                    <Badge variant="secondary">{tournament.format}</Badge>
                  </div>
                  <CardDescription className="space-y-2 mt-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Users" size={16} className="text-muted-foreground" />
                      <span>
                        {tournament.participants}/{tournament.maxParticipants} участников
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Calendar" size={16} className="text-muted-foreground" />
                      <span>
                        {new Date(tournament.startDate).toLocaleDateString('ru-RU')} - {new Date(tournament.endDate).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Icon name="FileText" size={14} />
                      Правила:
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1 ml-6">
                      {tournament.rules.map((rule, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-full">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Заполнено</span>
                      <span className="font-semibold">
                        {Math.round((tournament.participants / tournament.maxParticipants) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                        style={{ width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }}
                      />
                    </div>
                  </div>

                  {tournament.status !== 'finished' && (
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
                      onClick={() => handleRegister(tournament)}
                      disabled={tournament.participants >= tournament.maxParticipants}
                    >
                      <Icon name="UserPlus" size={16} className="mr-2" />
                      {tournament.participants >= tournament.maxParticipants 
                        ? 'Мест нет' 
                        : tournament.status === 'active' 
                          ? 'Присоединиться сейчас' 
                          : 'Зарегистрироваться'}
                    </Button>
                  )}

                  {tournament.status === 'finished' && (
                    <Button 
                      className="w-full"
                      variant="outline"
                    >
                      <Icon name="Award" size={16} className="mr-2" />
                      Смотреть результаты
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredTournaments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Icon name="Trophy" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-bold mb-2">Турниры не найдены</h3>
            <p className="text-muted-foreground">
              Попробуйте изменить фильтр или вернитесь позже
            </p>
          </motion.div>
        )}
      </div>

      {selectedTournament && (
        <DiscordNotificationForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          tournament={selectedTournament}
          onSuccess={handleRegistrationSuccess}
        />
      )}
    </div>
  );
}