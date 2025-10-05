import { PlayerRanking } from '@/types/ranking';
import { Card, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface StatsGridProps {
  player: PlayerRanking;
}

export default function StatsGrid({ player }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Wins</CardDescription>
          <CardTitle className="text-2xl text-green-500">{player.wins}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Losses</CardDescription>
          <CardTitle className="text-2xl text-red-500">{player.losses}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Win Rate</CardDescription>
          <CardTitle className="text-2xl">{player.winRate.toFixed(1)}%</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Current Streak</CardDescription>
          <CardTitle className={cn(
            'text-2xl flex items-center gap-1',
            player.streak > 0 ? 'text-green-500' : 'text-red-500'
          )}>
            {player.streak > 0 ? (
              <Icon name="TrendingUp" className="h-5 w-5" />
            ) : (
              <Icon name="TrendingDown" className="h-5 w-5" />
            )}
            {Math.abs(player.streak)}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
