import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GameRoom } from '@/types/gameroom';
import Icon from '@/components/ui/icon';

export default function GameRooms() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<GameRoom | null>(null);

  const rooms: GameRoom[] = [
    {
      id: '1',
      name: 'Киберпанк Про Лобби',
      gameId: 1,
      gameName: 'Cyberpunk 2077',
      hostId: '1',
      hostName: 'ProGamer123',
      maxPlayers: 4,
      currentPlayers: 3,
      isPrivate: false,
      status: 'waiting',
      createdAt: Date.now(),
      players: [
        { userId: '1', username: 'ProGamer123', avatar: '/api/placeholder/40/40', level: 47, ready: true, isHost: true },
        { userId: '2', username: 'Player2', avatar: '/api/placeholder/40/40', level: 32, ready: true, isHost: false },
        { userId: '3', username: 'Player3', avatar: '/api/placeholder/40/40', level: 28, ready: false, isHost: false },
      ],
      settings: {
        map: 'Night City',
        mode: 'Co-op',
        difficulty: 'hard',
        allowSpectators: true,
        autoBalance: false,
      },
    },
    {
      id: '2',
      name: 'Valorant Ranked 5x5',
      gameId: 2,
      gameName: 'Valorant',
      hostId: '4',
      hostName: 'ValorantPro',
      maxPlayers: 10,
      currentPlayers: 8,
      isPrivate: false,
      status: 'waiting',
      createdAt: Date.now() - 300000,
      players: [],
      settings: {
        mode: 'Ranked',
        allowSpectators: false,
        autoBalance: true,
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold mb-2">🎮 Игровые комнаты</h1>
            <p className="text-muted-foreground">Создавай лобби и играй с друзьями</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.location.href = '/'}>
            <Icon name="Home" size={16} className="mr-2" />
            На главную
          </Button>
          <Button onClick={() => setShowCreateModal(true)} size="lg">
            <Icon name="Plus" size={20} className="mr-2" />
            Создать комнату
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <Icon name="Users" size={32} className="mb-2 text-blue-500" />
          <div className="text-2xl font-bold">147</div>
          <div className="text-sm text-muted-foreground">Активных комнат</div>
        </Card>
        <Card className="p-4">
          <Icon name="Gamepad2" size={32} className="mb-2 text-green-500" />
          <div className="text-2xl font-bold">1,234</div>
          <div className="text-sm text-muted-foreground">Игроков онлайн</div>
        </Card>
        <Card className="p-4">
          <Icon name="TrendingUp" size={32} className="mb-2 text-purple-500" />
          <div className="text-2xl font-bold">89</div>
          <div className="text-sm text-muted-foreground">В процессе игры</div>
        </Card>
        <Card className="p-4">
          <Icon name="Clock" size={32} className="mb-2 text-orange-500" />
          <div className="text-2xl font-bold">2.3ч</div>
          <div className="text-sm text-muted-foreground">Средняя сессия</div>
        </Card>
      </div>

      <div className="flex gap-4">
        <Input placeholder="Поиск комнаты..." className="flex-1" />
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все игры</SelectItem>
            <SelectItem value="1">Cyberpunk 2077</SelectItem>
            <SelectItem value="2">Valorant</SelectItem>
            <SelectItem value="3">CS:GO</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Icon name="Filter" size={16} />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {rooms.map((room) => (
          <Card key={room.id} className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={`/api/placeholder/60/60`}
                  alt={room.gameName}
                  className="w-16 h-16 rounded object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold mb-1">{room.name}</h3>
                  <p className="text-sm text-muted-foreground">{room.gameName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {room.hostName}
                    </Badge>
                    {room.isPrivate && (
                      <Badge className="bg-purple-500 text-white text-xs">
                        <Icon name="Lock" size={10} className="mr-1" />
                        Приватная
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <Badge
                className={
                  room.status === 'waiting'
                    ? 'bg-green-500'
                    : room.status === 'in-progress'
                    ? 'bg-blue-500'
                    : 'bg-gray-500'
                }
              >
                {room.status === 'waiting' ? 'Ожидание' : room.status === 'in-progress' ? 'В игре' : 'Завершена'}
              </Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Игроки:</span>
                <span className="font-medium">
                  {room.currentPlayers}/{room.maxPlayers}
                </span>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: room.maxPlayers }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-2 rounded ${
                      i < room.currentPlayers ? 'bg-primary' : 'bg-secondary'
                    }`}
                  />
                ))}
              </div>
            </div>

            {room.settings.map && (
              <div className="flex gap-2 mb-4">
                <Badge variant="outline">
                  <Icon name="Map" size={12} className="mr-1" />
                  {room.settings.map}
                </Badge>
                <Badge variant="outline">
                  <Icon name="Target" size={12} className="mr-1" />
                  {room.settings.mode}
                </Badge>
                {room.settings.difficulty && (
                  <Badge variant="outline">{room.settings.difficulty}</Badge>
                )}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={() => setSelectedRoom(room)}
                disabled={room.currentPlayers >= room.maxPlayers}
              >
                <Icon name="LogIn" size={16} className="mr-2" />
                Войти
              </Button>
              <Button variant="outline" size="icon">
                <Icon name="Eye" size={16} />
              </Button>
              <Button variant="outline" size="icon">
                <Icon name="Share2" size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl p-6 m-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Создать игровую комнату</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowCreateModal(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Игра</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите игру" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Cyberpunk 2077</SelectItem>
                    <SelectItem value="2">Valorant</SelectItem>
                    <SelectItem value="3">CS:GO</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Название комнаты</Label>
                <Input placeholder="Моя крутая комната" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Максимум игроков</Label>
                  <Select defaultValue="4">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="8">8</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Сложность</Label>
                  <Select defaultValue="normal">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Легко</SelectItem>
                      <SelectItem value="normal">Нормально</SelectItem>
                      <SelectItem value="hard">Сложно</SelectItem>
                      <SelectItem value="expert">Эксперт</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Приватная комната</p>
                  <p className="text-sm text-muted-foreground">Только по приглашению</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Разрешить зрителей</p>
                  <p className="text-sm text-muted-foreground">Другие могут наблюдать</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1" size="lg">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Создать комнату
                </Button>
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Отмена
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {selectedRoom && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl p-6 m-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{selectedRoom.name}</h2>
              <Button variant="ghost" size="icon" onClick={() => setSelectedRoom(null)}>
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold mb-3">Игроки ({selectedRoom.currentPlayers}/{selectedRoom.maxPlayers})</h3>
                <div className="space-y-2">
                  {selectedRoom.players.map((player) => (
                    <div key={player.userId} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <img src={player.avatar} alt={player.username} className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="font-medium">
                            {player.username}
                            {player.isHost && (
                              <Badge className="ml-2 bg-yellow-500 text-white text-xs">Хост</Badge>
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">Уровень {player.level}</p>
                        </div>
                      </div>
                      {player.ready ? (
                        <Icon name="CheckCircle" size={24} className="text-green-500" />
                      ) : (
                        <Icon name="Clock" size={24} className="text-gray-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3">Настройки</h3>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 border rounded">
                    <span className="text-muted-foreground">Карта:</span>
                    <span className="font-medium">{selectedRoom.settings.map}</span>
                  </div>
                  <div className="flex justify-between p-3 border rounded">
                    <span className="text-muted-foreground">Режим:</span>
                    <span className="font-medium">{selectedRoom.settings.mode}</span>
                  </div>
                  <div className="flex justify-between p-3 border rounded">
                    <span className="text-muted-foreground">Сложность:</span>
                    <span className="font-medium">{selectedRoom.settings.difficulty}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" size="lg">
                <Icon name="Check" size={20} className="mr-2" />
                Готов
              </Button>
              <Button variant="outline" onClick={() => setSelectedRoom(null)}>
                Покинуть
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}