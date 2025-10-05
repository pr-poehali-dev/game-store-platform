import { MatchResult } from '@/types/ranking';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface MatchHistoryProps {
  matches: MatchResult[];
  formatTimeAgo: (timestamp: number) => string;
}

export default function MatchHistory({ matches, formatTimeAgo }: MatchHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Matches</CardTitle>
        <CardDescription>Your last {matches.length} ranked games</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-3">
            {matches.map((match) => (
              <div
                key={match.id}
                className={cn(
                  'p-4 rounded-lg border-2 transition-colors',
                  match.result === 'win' && 'border-green-500/20 bg-green-500/5',
                  match.result === 'loss' && 'border-red-500/20 bg-red-500/5',
                  match.result === 'draw' && 'border-yellow-500/20 bg-yellow-500/5'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'h-12 w-12 rounded-full flex items-center justify-center font-bold',
                      match.result === 'win' && 'bg-green-500 text-white',
                      match.result === 'loss' && 'bg-red-500 text-white',
                      match.result === 'draw' && 'bg-yellow-500 text-white'
                    )}>
                      {match.result === 'win' && 'W'}
                      {match.result === 'loss' && 'L'}
                      {match.result === 'draw' && 'D'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold capitalize">{match.result}</p>
                        {match.mvp && (
                          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500">
                            <Icon name="Star" className="h-3 w-3 mr-1" />
                            MVP
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatTimeAgo(match.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn(
                      'text-xl font-bold',
                      match.eloChange > 0 ? 'text-green-500' : 'text-red-500'
                    )}>
                      {match.eloChange > 0 ? '+' : ''}{match.eloChange}
                    </div>
                    {match.kda && (
                      <p className="text-sm text-muted-foreground">KDA: {match.kda}</p>
                    )}
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
