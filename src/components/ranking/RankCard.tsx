import { PlayerRanking, RankTier, RANK_THRESHOLDS } from '@/types/ranking';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface RankCardProps {
  player: PlayerRanking;
  getRankIcon: (tier: RankTier) => string;
  getRankGradient: (tier: RankTier) => string;
  getNextTier: (currentTier: RankTier) => RankTier | null;
  calculateProgress: (currentElo: number, currentTier: RankTier) => number;
}

export default function RankCard({
  player,
  getRankIcon,
  getRankGradient,
  getNextTier,
  calculateProgress,
}: RankCardProps) {
  const progress = calculateProgress(player.elo, player.tier);
  const nextTier = getNextTier(player.tier);

  return (
    <Card className="overflow-hidden">
      <div className={cn('h-32 bg-gradient-to-br', getRankGradient(player.tier))} />
      <CardContent className="relative -mt-16 pb-6">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
          <div className={cn(
            'h-32 w-32 rounded-full border-4 border-background flex items-center justify-center',
            'bg-gradient-to-br shadow-lg',
            getRankGradient(player.tier)
          )}>
            <Icon name={getRankIcon(player.tier)} className="h-16 w-16 text-white" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h3 className="text-3xl font-bold capitalize">{player.tier}</h3>
              <Badge variant="secondary" className="text-lg">
                Division {player.division}
              </Badge>
            </div>
            <p className="text-xl text-muted-foreground mt-1">
              {player.elo} ELO
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-sm">
              <span className="flex items-center gap-1">
                <Icon name="TrendingUp" className="h-4 w-4 text-green-500" />
                Peak: {player.peakElo}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="MapPin" className="h-4 w-4" />
                Rank #{player.rank}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Globe" className="h-4 w-4" />
                {player.region}
              </span>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {nextTier && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Progress to {nextTier}</span>
              <span className="text-muted-foreground">
                {player.elo} / {RANK_THRESHOLDS[nextTier]} ELO
              </span>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-xs text-muted-foreground">
              {RANK_THRESHOLDS[nextTier] - player.elo} ELO needed for promotion
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
