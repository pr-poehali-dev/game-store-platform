import { Trophy, Star, Gamepad2, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface GamerCardProps {
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
  onViewProfile?: () => void;
  onAddFriend?: () => void;
  onSendMessage?: () => void;
}

const statusConfig = {
  online: { color: 'bg-green-500', label: 'Онлайн' },
  offline: { color: 'bg-gray-500', label: 'Не в сети' },
  'in-game': { color: 'bg-blue-500', label: 'В игре' },
  away: { color: 'bg-yellow-500', label: 'Не беспокоить' },
};

export default function GamerCard({
  id,
  username,
  avatar,
  level,
  status,
  currentGame,
  stats,
  mutualFriends,
  onViewProfile,
  onAddFriend,
  onSendMessage,
}: GamerCardProps) {
  return (
    <Card className="p-4 hover:shadow-xl transition-all group">
      <div className="flex gap-4">
        <div className="relative">
          <Avatar className="w-20 h-20 border-2 border-primary/20">
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback>{username[0]}</AvatarFallback>
          </Avatar>
          <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-background ${statusConfig[status].color}`} />
          <Badge className="absolute -top-2 -right-2 h-6 px-2 bg-gradient-to-r from-primary to-secondary">
            {level}
          </Badge>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-lg truncate">{username}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className={statusConfig[status].color.replace('bg-', 'text-')}>
                  {statusConfig[status].label}
                </span>
                {currentGame && status === 'in-game' && (
                  <>
                    <span>•</span>
                    <span className="truncate">{currentGame}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-primary">
                <Icon name="Gamepad2" size={14} />
                <span className="font-bold text-sm">{stats.gamesOwned}</span>
              </div>
              <p className="text-xs text-muted-foreground">Игр</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-yellow-500">
                <Icon name="Trophy" size={14} />
                <span className="font-bold text-sm">{stats.achievementsUnlocked}</span>
              </div>
              <p className="text-xs text-muted-foreground">Ачивок</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-orange-500">
                <Icon name="Award" size={14} />
                <span className="font-bold text-sm">{stats.tournamentsWon}</span>
              </div>
              <p className="text-xs text-muted-foreground">Побед</p>
            </div>
          </div>

          {mutualFriends !== undefined && mutualFriends > 0 && (
            <p className="text-xs text-muted-foreground mb-3">
              <Icon name="Users" size={12} className="inline mr-1" />
              {mutualFriends} общих друзей
            </p>
          )}

          <div className="flex gap-2">
            {onViewProfile && (
              <Button variant="outline" size="sm" className="flex-1" onClick={onViewProfile}>
                Профиль
              </Button>
            )}
            {onAddFriend && (
              <Button size="sm" className="flex-1" onClick={onAddFriend}>
                <Icon name="UserPlus" size={14} className="mr-1" />
                Добавить
              </Button>
            )}
            {onSendMessage && (
              <Button variant="ghost" size="icon" onClick={onSendMessage}>
                <Icon name="MessageCircle" size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
