import { Trophy, Calendar, Users, Clock, Play } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tournament, Match } from '@/types/tournaments';
import Icon from '@/components/ui/icon';

interface TournamentBracketProps {
  tournament: Tournament;
  onJoinTournament?: () => void;
  onWatchMatch?: (matchId: string) => void;
}

export default function TournamentBracket({
  tournament,
  onJoinTournament,
  onWatchMatch,
}: TournamentBracketProps) {
  const statusColors = {
    upcoming: 'bg-blue-500',
    registration: 'bg-green-500',
    live: 'bg-red-500 animate-pulse',
    completed: 'bg-gray-500',
  };

  const statusLabels = {
    upcoming: 'Скоро',
    registration: 'Регистрация',
    live: 'LIVE',
    completed: 'Завершён',
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('ru', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrize = (amount: number, currency: string) => {
    if (currency === 'real') return `$${amount}`;
    if (currency === 'gems') return `${amount} 💎`;
    return `${amount} 🪙`;
  };

  const rounds = Array.from(new Set(tournament.matches.map((m) => m.round))).sort(
    (a, b) => a - b
  );

  const canJoin =
    tournament.status === 'registration' &&
    tournament.currentParticipants < tournament.maxParticipants &&
    Date.now() < tournament.registrationDeadline;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex gap-6">
          <img
            src={tournament.gameImage}
            alt={tournament.gameName}
            className="w-32 h-32 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold">{tournament.name}</h2>
                  <Badge className={`${statusColors[tournament.status]} text-white`}>
                    {statusLabels[tournament.status]}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{tournament.gameName}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">
                  {formatPrize(tournament.prizePool, tournament.currency)}
                </div>
                <p className="text-sm text-muted-foreground">Призовой фонд</p>
              </div>
            </div>

            <p className="text-sm mb-4">{tournament.description}</p>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Начало</p>
                  <p className="text-sm font-medium">{formatDate(tournament.startDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Users" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Участники</p>
                  <p className="text-sm font-medium">
                    {tournament.currentParticipants}/{tournament.maxParticipants}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Grid" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Формат</p>
                  <p className="text-sm font-medium capitalize">{tournament.format}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="DollarSign" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Взнос</p>
                  <p className="text-sm font-medium">
                    {tournament.entryFee
                      ? formatPrize(tournament.entryFee, tournament.currency)
                      : 'Бесплатно'}
                  </p>
                </div>
              </div>
            </div>

            {canJoin && (
              <Button size="lg" className="w-full" onClick={onJoinTournament}>
                <Icon name="Trophy" size={18} className="mr-2" />
                Зарегистрироваться на турнир
              </Button>
            )}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-4 gap-4">
        {tournament.prizes.slice(0, 4).map((prize) => (
          <Card key={prize.place} className="p-4 text-center">
            <div
              className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                prize.place === 1
                  ? 'bg-yellow-500'
                  : prize.place === 2
                  ? 'bg-gray-400'
                  : 'bg-orange-600'
              }`}
            >
              <Icon name="Trophy" size={24} className="text-white" />
            </div>
            <p className="font-bold mb-1">
              {prize.place === 1 ? '🥇' : prize.place === 2 ? '🥈' : '🥉'} Место {prize.place}
            </p>
            <p className="text-xl font-bold text-primary">
              {formatPrize(prize.reward, prize.currency)}
            </p>
            {prize.title && (
              <Badge variant="secondary" className="mt-2">
                {prize.title}
              </Badge>
            )}
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-2xl font-bold mb-6">Сетка турнира</h3>
        <div className="flex gap-8 overflow-x-auto pb-4">
          {rounds.map((round) => (
            <div key={round} className="flex-shrink-0 space-y-4" style={{ minWidth: '300px' }}>
              <h4 className="font-bold text-center mb-4">
                {round === Math.max(...rounds)
                  ? '🏆 Финал'
                  : round === Math.max(...rounds) - 1
                  ? 'Полуфинал'
                  : round === Math.max(...rounds) - 2
                  ? 'Четвертьфинал'
                  : `Раунд ${round}`}
              </h4>
              {tournament.matches
                .filter((m) => m.round === round)
                .map((match) => (
                  <MatchCard key={match.id} match={match} onWatch={onWatchMatch} />
                ))}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function MatchCard({ match, onWatch }: { match: Match; onWatch?: (matchId: string) => void }) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('ru', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className={`p-3 ${match.status === 'live' ? 'border-red-500 border-2' : ''}`}>
      {match.status === 'live' && (
        <Badge className="w-full mb-2 bg-red-500 text-white animate-pulse">
          <Icon name="Play" size={12} className="mr-1" />
          LIVE
        </Badge>
      )}

      <div className="space-y-2">
        <div
          className={`flex items-center justify-between p-2 rounded ${
            match.winner === match.participant1?.id ? 'bg-green-500/20' : ''
          }`}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Avatar className="w-8 h-8">
              <AvatarImage src={match.participant1?.avatar} />
              <AvatarFallback>{match.participant1?.name?.[0] || '?'}</AvatarFallback>
            </Avatar>
            <span className="font-medium truncate">{match.participant1?.name || 'TBD'}</span>
          </div>
          <span className="font-bold text-lg">{match.score1 ?? '-'}</span>
        </div>

        <div
          className={`flex items-center justify-between p-2 rounded ${
            match.winner === match.participant2?.id ? 'bg-green-500/20' : ''
          }`}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Avatar className="w-8 h-8">
              <AvatarImage src={match.participant2?.avatar} />
              <AvatarFallback>{match.participant2?.name?.[0] || '?'}</AvatarFallback>
            </Avatar>
            <span className="font-medium truncate">{match.participant2?.name || 'TBD'}</span>
          </div>
          <span className="font-bold text-lg">{match.score2 ?? '-'}</span>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t flex items-center justify-between text-xs text-muted-foreground">
        <span>
          <Icon name="Clock" size={12} className="inline mr-1" />
          {formatTime(match.scheduledTime)}
        </span>
        {match.status === 'live' && onWatch && (
          <Button size="sm" variant="ghost" onClick={() => onWatch(match.id)}>
            Смотреть
          </Button>
        )}
      </div>
    </Card>
  );
}
