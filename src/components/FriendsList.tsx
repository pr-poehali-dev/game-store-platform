import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Friend, FriendRequest } from '@/types/social';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FriendsListProps {
  friends: Friend[];
  friendRequests: FriendRequest[];
  onAcceptRequest: (requestId: string) => void;
  onDeclineRequest: (requestId: string) => void;
  onRemoveFriend: (friendId: number) => void;
  onSendMessage: (friendId: number) => void;
  onInviteToGame: (friendId: number) => void;
}

export const FriendsList = ({
  friends,
  friendRequests,
  onAcceptRequest,
  onDeclineRequest,
  onRemoveFriend,
  onSendMessage,
  onInviteToGame,
}: FriendsListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredFriends = friends.filter((friend) => {
    const matchesSearch = friend.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || friend.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'in-game':
        return 'bg-blue-500';
      case 'away':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return 'В сети';
      case 'in-game':
        return 'В игре';
      case 'away':
        return 'Отошёл';
      default:
        return 'Не в сети';
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="friends" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="friends">
            Друзья ({friends.length})
          </TabsTrigger>
          <TabsTrigger value="requests">
            Заявки ({friendRequests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="friends" className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск друзей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-md border bg-background"
            >
              <option value="all">Все</option>
              <option value="online">В сети</option>
              <option value="in-game">В игре</option>
              <option value="offline">Не в сети</option>
            </select>
          </div>

          {filteredFriends.length === 0 ? (
            <Card className="p-12 text-center">
              <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {searchQuery ? 'Друзья не найдены' : 'У вас пока нет друзей'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery
                  ? 'Попробуйте изменить поисковый запрос'
                  : 'Начните добавлять друзей и создавайте команды!'}
              </p>
            </Card>
          ) : (
            <div className="grid gap-3">
              {filteredFriends.map((friend) => (
                <Card key={friend.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                        <img
                          src={friend.avatar || '/api/placeholder/48/48'}
                          alt={friend.username}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(friend.status)}`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold truncate">{friend.username}</p>
                        <Badge variant="outline" className="text-xs">
                          lvl {friend.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {friend.status === 'in-game' && friend.currentGame
                          ? `Играет: ${friend.currentGame}`
                          : getStatusText(friend.status)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Друзья с {new Date(friend.friendSince).toLocaleDateString('ru')}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {friend.status === 'online' || friend.status === 'in-game' ? (
                        <>
                          <Button
                            onClick={() => onInviteToGame(friend.id)}
                            variant="outline"
                            size="sm"
                          >
                            <Icon name="Gamepad2" size={16} />
                          </Button>
                          <Button
                            onClick={() => onSendMessage(friend.id)}
                            variant="outline"
                            size="sm"
                          >
                            <Icon name="MessageSquare" size={16} />
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => onSendMessage(friend.id)}
                          variant="outline"
                          size="sm"
                        >
                          <Icon name="MessageSquare" size={16} />
                        </Button>
                      )}
                      <Button
                        onClick={() => onRemoveFriend(friend.id)}
                        variant="ghost"
                        size="sm"
                      >
                        <Icon name="UserMinus" size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          {friendRequests.length === 0 ? (
            <Card className="p-12 text-center">
              <Icon name="Inbox" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Нет новых заявок</h3>
              <p className="text-sm text-muted-foreground">
                Когда кто-то захочет добавить вас в друзья, заявка появится здесь
              </p>
            </Card>
          ) : (
            <div className="grid gap-3">
              {friendRequests.map((request) => (
                <Card key={request.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                      <img
                        src={request.fromAvatar || '/api/placeholder/48/48'}
                        alt={request.fromUsername}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold truncate">{request.fromUsername}</p>
                        <Badge variant="outline" className="text-xs">
                          lvl {request.fromLevel}
                        </Badge>
                      </div>
                      {request.message && (
                        <p className="text-sm text-muted-foreground mt-1">{request.message}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(request.timestamp).toLocaleString('ru')}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => onAcceptRequest(request.id)}
                        size="sm"
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Icon name="Check" size={16} className="mr-2" />
                        Принять
                      </Button>
                      <Button
                        onClick={() => onDeclineRequest(request.id)}
                        variant="outline"
                        size="sm"
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
