import { GameEvent } from '@/types/events';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { formatNumber } from './eventsUtils';

interface LeaderboardTabProps {
  event: GameEvent;
}

export default function LeaderboardTab({ event }: LeaderboardTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Leaderboard</CardTitle>
        <CardDescription>Top players competing in {event.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {event.leaderboard.map((entry) => (
              <div
                key={entry.userId}
                className={cn(
                  'p-4 rounded-lg border transition-colors hover:bg-muted',
                  entry.rank <= 3 && 'bg-gradient-to-r border-2',
                  entry.rank === 1 && 'from-yellow-500/20 to-transparent border-yellow-500/40',
                  entry.rank === 2 && 'from-gray-400/20 to-transparent border-gray-400/40',
                  entry.rank === 3 && 'from-orange-600/20 to-transparent border-orange-600/40'
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0',
                    entry.rank === 1 && 'bg-yellow-500 text-white',
                    entry.rank === 2 && 'bg-gray-400 text-white',
                    entry.rank === 3 && 'bg-orange-600 text-white',
                    entry.rank > 3 && 'bg-muted text-muted-foreground'
                  )}>
                    {entry.rank}
                  </div>
                  <Avatar className="h-12 w-12 flex-shrink-0">
                    <AvatarImage src={entry.avatar} alt={entry.username} />
                    <AvatarFallback>{entry.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{entry.username}</p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Icon name="CheckCircle2" className="h-3 w-3" />
                      <span>{entry.completedChallenges} challenges</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xl font-bold">{formatNumber(entry.points)}</p>
                    <p className="text-xs text-muted-foreground">points</p>
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
