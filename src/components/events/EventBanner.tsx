import { GameEvent } from '@/types/events';
import { Card, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { getEventTypeIcon, getEventTypeBadge, formatTimeRemaining, formatNumber } from './eventsUtils';

interface EventBannerProps {
  events: GameEvent[];
  selectedEvent: GameEvent;
  onSelectEvent: (event: GameEvent) => void;
}

export default function EventBanner({ events, selectedEvent, onSelectEvent }: EventBannerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {events.map((event) => (
        <Card
          key={event.id}
          className={cn(
            'cursor-pointer transition-all overflow-hidden',
            selectedEvent.id === event.id && 'ring-2 ring-primary',
            !event.active && 'opacity-60'
          )}
          onClick={() => onSelectEvent(event)}
        >
          <div className="relative h-32 overflow-hidden">
            <img
              src={event.bannerImage}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg">{event.title}</h3>
                  <p className="text-white/80 text-sm">{event.gameName}</p>
                </div>
                <Badge variant="outline" className={cn('border-2', getEventTypeBadge(event.type))}>
                  <Icon name={getEventTypeIcon(event.type)} className="h-3 w-3 mr-1" />
                  {event.type}
                </Badge>
              </div>
            </div>
          </div>
          {event.active && (
            <CardFooter className="py-2 flex items-center justify-between bg-primary/5">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Users" className="h-4 w-4" />
                <span>{formatNumber(event.participants)} participants</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Icon name="Clock" className="h-4 w-4" />
                <span>{formatTimeRemaining(event.endDate)}</span>
              </div>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}
