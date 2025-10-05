import { useState } from 'react';
import { GameEvent, EventReward, EventChallenge, EventLeaderboardEntry } from '@/types/events';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

// Mock data
const mockEvents: GameEvent[] = [
  {
    id: '1',
    title: 'Summer Championship',
    description: 'Compete in the ultimate summer tournament for exclusive rewards',
    type: 'seasonal',
    gameId: 1,
    gameName: 'Valorant',
    bannerImage: 'https://picsum.photos/seed/event1/1200/300',
    startDate: Date.now() - 86400000 * 5,
    endDate: Date.now() + 86400000 * 9,
    active: true,
    rewards: [
      {
        id: 'r1',
        name: 'Golden Dragon Skin',
        description: 'Exclusive limited edition weapon skin',
        type: 'skin',
        image: 'https://picsum.photos/seed/reward1/200/200',
        rarity: 'legendary',
        requirement: 'Complete all challenges',
      },
      {
        id: 'r2',
        name: 'Champion Badge',
        description: 'Display your championship status',
        type: 'badge',
        image: 'https://picsum.photos/seed/reward2/200/200',
        rarity: 'exclusive',
        requirement: 'Top 100 on leaderboard',
      },
      {
        id: 'r3',
        name: 'Summer Emote Pack',
        description: '5 exclusive summer-themed emotes',
        type: 'emote',
        image: 'https://picsum.photos/seed/reward3/200/200',
        rarity: 'epic',
        requirement: 'Earn 5000 event points',
      },
      {
        id: 'r4',
        name: 'Premium Loot Box',
        description: 'Contains rare items and currency',
        type: 'lootbox',
        image: 'https://picsum.photos/seed/reward4/200/200',
        rarity: 'rare',
        requirement: 'Participate in 10 matches',
      },
    ],
    challenges: [
      {
        id: 'c1',
        title: 'Win 10 Matches',
        description: 'Win 10 ranked matches during the event',
        progress: 7,
        target: 10,
        points: 1000,
        completed: false,
      },
      {
        id: 'c2',
        title: 'Get 50 Kills',
        description: 'Eliminate 50 enemies in event matches',
        progress: 50,
        target: 50,
        points: 500,
        completed: true,
      },
      {
        id: 'c3',
        title: 'Play with Friends',
        description: 'Play 5 matches with clan members',
        progress: 3,
        target: 5,
        points: 750,
        completed: false,
      },
      {
        id: 'c4',
        title: 'Achieve 5 MVPs',
        description: 'Be the MVP in 5 different matches',
        progress: 2,
        target: 5,
        points: 1500,
        completed: false,
      },
      {
        id: 'c5',
        title: 'Daily Login Streak',
        description: 'Log in for 7 consecutive days',
        progress: 5,
        target: 7,
        points: 800,
        completed: false,
      },
    ],
    participants: 45678,
    leaderboard: [
      {
        rank: 1,
        userId: '101',
        username: 'EventMaster',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EventMaster',
        points: 15750,
        completedChallenges: 12,
      },
      {
        rank: 2,
        userId: '102',
        username: 'ChampionX',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ChampionX',
        points: 14230,
        completedChallenges: 11,
      },
      {
        rank: 3,
        userId: '103',
        username: 'ProGamer99',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProGamer99',
        points: 13890,
        completedChallenges: 10,
      },
      {
        rank: 4,
        userId: '104',
        username: 'ElitePlayer',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ElitePlayer',
        points: 12560,
        completedChallenges: 10,
      },
      {
        rank: 5,
        userId: '105',
        username: 'ShadowNinja',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShadowNinja',
        points: 11340,
        completedChallenges: 9,
      },
    ],
  },
  {
    id: '2',
    title: 'Halloween Spooktacular',
    description: 'Spooky challenges and haunting rewards await',
    type: 'holiday',
    gameId: 2,
    gameName: 'League of Legends',
    bannerImage: 'https://picsum.photos/seed/event2/1200/300',
    startDate: Date.now() + 86400000 * 30,
    endDate: Date.now() + 86400000 * 44,
    active: false,
    rewards: [],
    challenges: [],
    participants: 0,
    leaderboard: [],
  },
];

const EventsSystem = () => {
  const [selectedEvent, setSelectedEvent] = useState<GameEvent>(mockEvents[0]);

  const getEventTypeIcon = (type: GameEvent['type']) => {
    switch (type) {
      case 'limited-time':
        return 'Clock';
      case 'seasonal':
        return 'Calendar';
      case 'holiday':
        return 'PartyPopper';
      case 'special':
        return 'Sparkles';
      case 'tournament':
        return 'Trophy';
      default:
        return 'Star';
    }
  };

  const getEventTypeBadge = (type: GameEvent['type']) => {
    const badges: Record<GameEvent['type'], string> = {
      'limited-time': 'bg-red-500/20 text-red-500 border-red-500/30',
      seasonal: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
      holiday: 'bg-purple-500/20 text-purple-500 border-purple-500/30',
      special: 'bg-pink-500/20 text-pink-500 border-pink-500/30',
      tournament: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
    };
    return badges[type];
  };

  const getRarityColor = (rarity: EventReward['rarity']) => {
    const colors: Record<EventReward['rarity'], string> = {
      common: 'text-gray-500',
      rare: 'text-blue-500',
      epic: 'text-purple-500',
      legendary: 'text-orange-500',
      exclusive: 'text-pink-500',
    };
    return colors[rarity];
  };

  const getRarityGradient = (rarity: EventReward['rarity']) => {
    const gradients: Record<EventReward['rarity'], string> = {
      common: 'from-gray-500/20 to-transparent',
      rare: 'from-blue-500/20 to-transparent',
      epic: 'from-purple-500/20 to-transparent',
      legendary: 'from-orange-500/20 to-transparent',
      exclusive: 'from-pink-500/20 to-transparent',
    };
    return gradients[rarity];
  };

  const formatTimeRemaining = (endDate: number) => {
    const remaining = endDate - Date.now();
    if (remaining < 0) return 'Ended';
    
    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    
    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h remaining`;
    return 'Less than 1h remaining';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const totalPoints = selectedEvent.challenges.reduce((sum, c) => sum + (c.completed ? c.points : 0), 0);
  const completedChallenges = selectedEvent.challenges.filter((c) => c.completed).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Events & Tournaments</h2>
          <p className="text-sm text-muted-foreground">Participate in special events and earn exclusive rewards</p>
        </div>
      </div>

      {/* Active Events Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockEvents.map((event) => (
          <Card
            key={event.id}
            className={cn(
              'cursor-pointer transition-all overflow-hidden',
              selectedEvent.id === event.id && 'ring-2 ring-primary',
              !event.active && 'opacity-60'
            )}
            onClick={() => setSelectedEvent(event)}
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

      {/* Event Details */}
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

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Event Challenges</CardTitle>
                    <CardDescription>
                      {completedChallenges} of {selectedEvent.challenges.length} completed
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
                    {selectedEvent.challenges.map((challenge) => (
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
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Event Rewards</CardTitle>
                <CardDescription>Exclusive items available during this event</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedEvent.rewards.map((reward) => (
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
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Event Leaderboard</CardTitle>
                <CardDescription>Top players competing in {selectedEvent.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {selectedEvent.leaderboard.map((entry) => (
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
