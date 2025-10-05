import { PlayerRanking, RankTier } from '@/types/ranking';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface LeaderboardProps {
  players: PlayerRanking[];
  region: string;
  getRankIcon: (tier: RankTier) => string;
  getRankColor: (tier: RankTier) => string;
}

export default function Leaderboard({ players, region, getRankIcon, getRankColor }: LeaderboardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Players</CardTitle>
        <CardDescription>Highest ranked players in {region}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-3">
            {players.map((player) => (
              <div
                key={player.userId}
                className={cn(
                  'p-4 rounded-lg border transition-colors hover:bg-muted',
                  player.rank <= 3 && 'bg-gradient-to-r border-2',
                  player.rank === 1 && 'from-yellow-500/10 to-transparent border-yellow-500/30',
                  player.rank === 2 && 'from-gray-400/10 to-transparent border-gray-400/30',
                  player.rank === 3 && 'from-orange-600/10 to-transparent border-orange-600/30'
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg',
                    player.rank === 1 && 'bg-yellow-500 text-white',
                    player.rank === 2 && 'bg-gray-400 text-white',
                    player.rank === 3 && 'bg-orange-600 text-white',
                    player.rank > 3 && 'bg-muted text-muted-foreground'
                  )}>
                    {player.rank}
                  </div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={player.avatar} alt={player.username} />
                    <AvatarFallback>{player.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{player.username}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Icon
                        name={getRankIcon(player.tier)}
                        className={cn('h-4 w-4', getRankColor(player.tier))}
                      />
                      <span className="text-sm capitalize">
                        {player.tier} {player.division}
                      </span>
                      {player.streak > 0 && (
                        <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500">
                          <Icon name="Flame" className="h-2.5 w-2.5 mr-1" />
                          {player.streak}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{player.elo}</p>
                    <p className="text-xs text-muted-foreground">
                      {player.wins}W / {player.losses}L
                    </p>
                    <p className="text-xs text-green-500">{player.winRate.toFixed(1)}% WR</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
