import { GameEvent } from '@/types/events';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { getRarityColor, getRarityGradient } from './eventsUtils';

interface RewardsTabProps {
  event: GameEvent;
}

export default function RewardsTab({ event }: RewardsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Rewards</CardTitle>
        <CardDescription>Exclusive items available during this event</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {event.rewards.map((reward) => (
            <Card
              key={reward.id}
              className={cn(
                'overflow-hidden border-2 bg-gradient-to-br',
                getRarityGradient(reward.rarity)
              )}
            >
              <div className="flex gap-4 p-4">
                <div className="relative h-24 w-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                  <img
                    src={reward.image}
                    alt={reward.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    variant="outline"
                    className={cn(
                      'absolute top-1 right-1 text-xs border-2',
                      getRarityColor(reward.rarity)
                    )}
                  >
                    {reward.rarity}
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold truncate">{reward.name}</h4>
                    <Badge variant="secondary" className="flex-shrink-0">
                      {reward.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {reward.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs">
                    <Icon name="Target" className="h-3 w-3" />
                    <span className="text-muted-foreground">{reward.requirement}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
