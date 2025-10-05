import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LeaderboardEntry } from '@/types/tournaments';
import Icon from '@/components/ui/icon';

interface TournamentLeaderboardProps {
  entries: LeaderboardEntry[];
  title?: string;
  highlightUserId?: string;
}

export default function TournamentLeaderboard({ entries, title = 'Таблица лидеров', highlightUserId }: TournamentLeaderboardProps) {
  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'same') => {
    if (trend === 'up') return <Icon name="TrendingUp" size={14} className="text-green-500" />;
    if (trend === 'down') return <Icon name="TrendingDown" size={14} className="text-red-500" />;
    return <Icon name="Minus" size={14} className="text-gray-500" />;
  };

  const formatPrize = (reward: number, currency: string) => {
    if (currency === 'real') return `$${reward}`;
    if (currency === 'gems') return `${reward} 💎`;
    return `${reward} 🪙`;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Icon name="Trophy" size={24} className="text-yellow-500" />
          {title}
        </h3>
        <Badge variant="secondary">
          {entries.length} {entries.length === 1 ? 'участник' : 'участников'}
        </Badge>
      </div>

      <div className="space-y-2">
        {entries.map((entry) => (
          <div
            key={entry.participantId}
            className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
              entry.participantId === highlightUserId
                ? 'bg-primary/10 border-2 border-primary'
                : 'hover:bg-accent'
            } ${entry.rank <= 3 ? 'bg-gradient-to-r from-yellow-500/5 to-transparent' : ''}`}
          >
            <div
              className={`w-12 h-12 flex items-center justify-center font-bold text-lg rounded-full ${
                entry.rank === 1
                  ? 'bg-yellow-500 text-white'
                  : entry.rank === 2
                  ? 'bg-gray-400 text-white'
                  : entry.rank === 3
                  ? 'bg-orange-600 text-white'
                  : 'bg-accent'
              }`}
            >
              {getMedalEmoji(entry.rank)}
            </div>

            <Avatar className="w-12 h-12 border-2 border-primary/20">
              <AvatarImage src={entry.participantAvatar} alt={entry.participantName} />
              <AvatarFallback>{entry.participantName[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-bold truncate">{entry.participantName}</h4>
                {entry.trend && getTrendIcon(entry.trend)}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>
                  <Icon name="Award" size={12} className="inline mr-1" />
                  {entry.wins}W - {entry.losses}L
                </span>
                <span>
                  <Icon name="Target" size={12} className="inline mr-1" />
                  {entry.points} очков
                </span>
              </div>
            </div>

            {entry.prize && (
              <div className="text-right">
                <div className="font-bold text-primary">
                  {formatPrize(entry.prize.reward, entry.prize.currency)}
                </div>
                {entry.prize.title && (
                  <Badge variant="secondary" className="text-xs mt-1">
                    {entry.prize.title}
                  </Badge>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {entries.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Icon name="Trophy" size={48} className="mx-auto mb-4 opacity-30" />
          <p>Таблица лидеров пока пуста</p>
        </div>
      )}
    </Card>
  );
}
