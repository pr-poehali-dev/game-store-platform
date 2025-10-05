import { useState } from 'react';
import { Trophy, Calendar, Users, DollarSign, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tournament } from '@/types/tournaments';
import Icon from '@/components/ui/icon';

interface TournamentsListProps {
  tournaments: Tournament[];
  onSelectTournament: (tournamentId: string) => void;
  onCreateTournament?: () => void;
}

export default function TournamentsList({
  tournaments,
  onSelectTournament,
  onCreateTournament,
}: TournamentsListProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredTournaments = tournaments.filter((t) =>
    selectedStatus === 'all' ? true : t.status === selectedStatus
  );

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('ru', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrize = (amount: number, currency: string) => {
    if (currency === 'real') return `$${amount}`;
    if (currency === 'gems') return `${amount} 💎`;
    return `${amount} 🪙`;
  };

  const statusColors = {
    upcoming: 'bg-blue-500',
    registration: 'bg-green-500',
    live: 'bg-red-500',
    completed: 'bg-gray-500',
  };

  const statusLabels = {
    upcoming: 'Скоро',
    registration: 'Регистрация',
    live: 'LIVE',
    completed: 'Завершён',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Турниры</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Icon name="Filter" size={14} className="mr-2" />
            Фильтры
          </Button>
          {onCreateTournament && (
            <Button size="sm" onClick={onCreateTournament}>
              <Icon name="Plus" size={14} className="mr-2" />
              Создать турнир
            </Button>
          )}
        </div>
      </div>

      <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="registration">Регистрация</TabsTrigger>
          <TabsTrigger value="upcoming">Скоро</TabsTrigger>
          <TabsTrigger value="completed">Завершённые</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedStatus} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTournaments.map((tournament) => (
              <Card
                key={tournament.id}
                className="overflow-hidden cursor-pointer hover:shadow-xl transition-all group"
                onClick={() => onSelectTournament(tournament.id)}
              >
                <div className="relative">
                  <img
                    src={tournament.gameImage}
                    alt={tournament.gameName}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                  />
                  <Badge
                    className={`absolute top-2 left-2 ${statusColors[tournament.status]} text-white`}
                  >
                    {statusLabels[tournament.status]}
                  </Badge>
                  {tournament.status === 'live' && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded animate-pulse text-xs font-bold">
                      LIVE
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 line-clamp-1">{tournament.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {tournament.gameName}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Trophy" size={14} />
                        <span>Призовой фонд</span>
                      </div>
                      <span className="font-bold text-primary">
                        {formatPrize(tournament.prizePool, tournament.currency)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Users" size={14} />
                        <span>Участники</span>
                      </div>
                      <span className="font-medium">
                        {tournament.currentParticipants}/{tournament.maxParticipants}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Calendar" size={14} />
                        <span>Начало</span>
                      </div>
                      <span className="font-medium">{formatDate(tournament.startDate)}</span>
                    </div>

                    {tournament.entryFee && (
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Icon name="DollarSign" size={14} />
                          <span>Взнос</span>
                        </div>
                        <span className="font-medium">
                          {formatPrize(tournament.entryFee, tournament.currency)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {tournament.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    className="w-full"
                    variant={tournament.status === 'registration' ? 'default' : 'outline'}
                  >
                    {tournament.status === 'registration'
                      ? 'Зарегистрироваться'
                      : tournament.status === 'live'
                      ? 'Смотреть'
                      : 'Подробнее'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredTournaments.length === 0 && (
            <Card className="p-12 text-center">
              <Icon name="Trophy" size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-muted-foreground">Нет турниров в этой категории</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
