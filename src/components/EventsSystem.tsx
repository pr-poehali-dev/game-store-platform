import { useState } from 'react';
import { GameEvent } from '@/types/events';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import EventBanner from '@/components/events/EventBanner';
import ChallengesTab from '@/components/events/ChallengesTab';
import RewardsTab from '@/components/events/RewardsTab';
import LeaderboardTab from '@/components/events/LeaderboardTab';
import { mockEvents } from '@/components/events/mockData';

const EventsSystem = () => {
  const [selectedEvent, setSelectedEvent] = useState<GameEvent>(mockEvents[0]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Events & Tournaments</h2>
          <p className="text-sm text-muted-foreground">Participate in special events and earn exclusive rewards</p>
        </div>
      </div>

      <EventBanner
        events={mockEvents}
        selectedEvent={selectedEvent}
        onSelectEvent={setSelectedEvent}
      />

      {selectedEvent.active ? (
        <Tabs defaultValue="challenges" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="challenges">
              <Icon name="ListChecks" className="h-4 w-4 mr-2" />
              Challenges
            </TabsTrigger>
            <TabsTrigger value="rewards">
              <Icon name="Gift" className="h-4 w-4 mr-2" />
              Rewards
            </TabsTrigger>
            <TabsTrigger value="leaderboard">
              <Icon name="Trophy" className="h-4 w-4 mr-2" />
              Leaderboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="challenges" className="space-y-4">
            <ChallengesTab event={selectedEvent} />
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            <RewardsTab event={selectedEvent} />
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <LeaderboardTab event={selectedEvent} />
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Icon name="CalendarClock" className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold mb-2">Event Coming Soon</h3>
            <p className="text-muted-foreground text-center">
              This event will be available starting{' '}
              {new Date(selectedEvent.startDate).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventsSystem;
