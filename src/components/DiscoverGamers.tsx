import { useState } from 'react';
import { Search, Filter, TrendingUp, Users, Target } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GamerCard from './GamerCard';
import Icon from '@/components/ui/icon';

interface Gamer {
  id: number;
  username: string;
  avatar: string;
  level: number;
  status: 'online' | 'offline' | 'in-game' | 'away';
  currentGame?: string;
  stats: {
    gamesOwned: number;
    achievementsUnlocked: number;
    tournamentsWon: number;
  };
  mutualFriends?: number;
  matchScore?: number;
}

interface DiscoverGamersProps {
  onAddFriend?: (userId: number) => void;
  onSendMessage?: (userId: number) => void;
  onViewProfile?: (userId: number) => void;
}

const mockGamers: Gamer[] = [
  {
    id: 10,
    username: 'DragonSlayer99',
    avatar: '/api/placeholder/80/80',
    level: 45,
    status: 'online',
    stats: { gamesOwned: 150, achievementsUnlocked: 420, tournamentsWon: 8 },
    mutualFriends: 3,
    matchScore: 95,
  },
  {
    id: 11,
    username: 'CyberNinja',
    avatar: '/api/placeholder/80/80',
    level: 38,
    status: 'in-game',
    currentGame: 'Valorant',
    stats: { gamesOwned: 95, achievementsUnlocked: 280, tournamentsWon: 4 },
    mutualFriends: 1,
    matchScore: 88,
  },
  {
    id: 12,
    username: 'MagicWizard',
    avatar: '/api/placeholder/80/80',
    level: 52,
    status: 'online',
    stats: { gamesOwned: 200, achievementsUnlocked: 550, tournamentsWon: 12 },
    matchScore: 92,
  },
  {
    id: 13,
    username: 'SpeedRunner',
    avatar: '/api/placeholder/80/80',
    level: 41,
    status: 'away',
    stats: { gamesOwned: 120, achievementsUnlocked: 350, tournamentsWon: 6 },
    mutualFriends: 2,
    matchScore: 85,
  },
];

export default function DiscoverGamers({
  onAddFriend,
  onSendMessage,
  onViewProfile,
}: DiscoverGamersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('recommended');

  const filteredGamers = mockGamers.filter((gamer) =>
    gamer.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Найти игроков</h2>
        <Button variant="outline" size="sm">
          <Icon name="Filter" size={14} className="mr-2" />
          Фильтры
        </Button>
      </div>

      <div className="relative">
        <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Поиск по никнейму..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommended">
            <Icon name="Target" size={14} className="mr-2" />
            Рекомендации
          </TabsTrigger>
          <TabsTrigger value="online">
            <Icon name="CircleDot" size={14} className="mr-2" />
            Онлайн
          </TabsTrigger>
          <TabsTrigger value="top">
            <Icon name="TrendingUp" size={14} className="mr-2" />
            Топ игроки
          </TabsTrigger>
          <TabsTrigger value="nearby">
            <Icon name="Users" size={14} className="mr-2" />
            Рядом
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recommended" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGamers
              .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
              .map((gamer) => (
                <GamerCard
                  key={gamer.id}
                  {...gamer}
                  onViewProfile={() => onViewProfile?.(gamer.id)}
                  onAddFriend={() => onAddFriend?.(gamer.id)}
                  onSendMessage={() => onSendMessage?.(gamer.id)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="online" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGamers
              .filter((g) => g.status === 'online' || g.status === 'in-game')
              .map((gamer) => (
                <GamerCard
                  key={gamer.id}
                  {...gamer}
                  onViewProfile={() => onViewProfile?.(gamer.id)}
                  onAddFriend={() => onAddFriend?.(gamer.id)}
                  onSendMessage={() => onSendMessage?.(gamer.id)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="top" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGamers
              .sort((a, b) => b.level - a.level)
              .map((gamer) => (
                <GamerCard
                  key={gamer.id}
                  {...gamer}
                  onViewProfile={() => onViewProfile?.(gamer.id)}
                  onAddFriend={() => onAddFriend?.(gamer.id)}
                  onSendMessage={() => onSendMessage?.(gamer.id)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="nearby" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGamers
              .filter((g) => g.mutualFriends && g.mutualFriends > 0)
              .map((gamer) => (
                <GamerCard
                  key={gamer.id}
                  {...gamer}
                  onViewProfile={() => onViewProfile?.(gamer.id)}
                  onAddFriend={() => onAddFriend?.(gamer.id)}
                  onSendMessage={() => onSendMessage?.(gamer.id)}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
