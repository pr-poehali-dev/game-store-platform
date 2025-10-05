import { GameEvent } from '@/types/events';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface ChallengesTabProps {
  event: GameEvent;
}

export default function ChallengesTab({ event }: ChallengesTabProps) {
  const totalPoints = event.challenges.reduce((sum, c) => sum + (c.completed ? c.points : 0), 0);
  const completedChallenges = event.challenges.filter((c) => c.completed).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Event Challenges</CardTitle>
            <CardDescription>
              {completedChallenges} of {event.challenges.length} completed
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{totalPoints}</p>
            <p className="text-sm text-muted-foreground">Total Points</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {event.challenges.map((challenge) => (
              <div
                key={challenge.id}
                className={cn(
                  'p-4 rounded-lg border-2 transition-colors',
                  challenge.completed
                    ? 'border-green-500/30 bg-green-500/5'
                    : 'border-border hover:bg-muted'
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{challenge.title}</h4>
                      {challenge.completed && (
                        <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/30">
                          <Icon name="CheckCircle" className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {challenge.description}
                    </p>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    <Icon name="Star" className="h-3 w-3 mr-1" />
                    {challenge.points}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      {challenge.progress} / {challenge.target}
                    </span>
                  </div>
                  <Progress
                    value={(challenge.progress / challenge.target) * 100}
                    className={cn('h-2', challenge.completed && 'bg-green-500/20')}
                  />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
