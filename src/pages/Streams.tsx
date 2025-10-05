import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Stream {
  id: number;
  streamer: string;
  avatar: string;
  title: string;
  game: string;
  viewers: number;
  thumbnail: string;
  platform: 'twitch' | 'youtube';
  isLive: boolean;
  category: string;
}

export default function Streams() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const handleBack = () => window.history.back();
  const handleHome = () => window.location.href = '/';

  const streams: Stream[] = [
    {
      id: 1,
      streamer: 'DendiTV',
      avatar: '👨‍🚀',
      title: 'Ranked Dota 2 | Поднимаемся в топ-100',
      game: 'Dota 2',
      viewers: 12453,
      thumbnail: '',
      platform: 'twitch',
      isLive: true,
      category: 'moba',
    },
    {
      id: 2,
      streamer: 's1mple',
      avatar: '🎯',
      title: 'FPL | Тренировки перед турниром',
      game: 'CS:GO',
      viewers: 8921,
      thumbnail: '',
      platform: 'twitch',
      isLive: true,
      category: 'shooter',
    },
    {
      id: 3,
      streamer: 'MonteCristo',
      avatar: '🎮',
      title: 'Анализ игр LoL Worlds 2025',
      game: 'League of Legends',
      viewers: 5234,
      thumbnail: '',
      platform: 'youtube',
      isLive: true,
      category: 'moba',
    },
    {
      id: 4,
      streamer: 'Pewdiepie',
      avatar: '👑',
      title: 'Прохождение Elden Ring | Первый раз',
      game: 'Elden Ring',
      viewers: 45678,
      thumbnail: '',
      platform: 'youtube',
      isLive: true,
      category: 'rpg',
    },
  ];

  const categories = [
    { id: 'all', name: 'Все', icon: 'Grid3x3' },
    { id: 'moba', name: 'MOBA', icon: 'Sword' },
    { id: 'shooter', name: 'Шутеры', icon: 'Target' },
    { id: 'rpg', name: 'RPG', icon: 'Castle' },
    { id: 'sport', name: 'Спорт', icon: 'Trophy' },
  ];

  const filteredStreams = streams.filter(stream => {
    const matchesSearch = stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stream.streamer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stream.game.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || stream.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const formatViewers = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <Icon name="Video" size={40} className="text-primary" />
            <h1 className="text-4xl font-bold">Стримы</h1>
            <Button variant="outline" size="sm" onClick={handleHome} className="ml-auto">
              <Icon name="Home" size={16} className="mr-2" />
              На главную
            </Button>
          </div>
          <p className="text-muted-foreground">
            Смотри топовых стримеров или запусти свой стрим
          </p>
        </div>

        <div className="mb-6 flex gap-4">
          <div className="relative flex-1">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Найти стрим, игру или стримера..."
              className="pl-10"
            />
          </div>
          <Button>
            <Icon name="Radio" size={16} className="mr-2" />
            Начать стрим
          </Button>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            {categories.map(cat => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                onClick={() => setActiveCategory(cat.id)}
              >
                <Icon name={cat.icon as any} size={16} className="mr-2" />
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStreams.map((stream) => (
            <Card key={stream.id} className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group">
              <div className="relative aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                {stream.thumbnail ? (
                  <img src={stream.thumbnail} alt={stream.title} className="w-full h-full object-cover" />
                ) : (
                  <Icon name="Video" size={64} className="text-white/30" />
                )}
                
                {stream.isLive && (
                  <Badge className="absolute top-3 left-3 bg-red-500 animate-pulse">
                    <Icon name="Radio" size={12} className="mr-1" />
                    LIVE
                  </Badge>
                )}

                <Badge variant="secondary" className="absolute top-3 right-3">
                  <Icon name="Eye" size={12} className="mr-1" />
                  {formatViewers(stream.viewers)}
                </Badge>

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button size="lg">
                    <Icon name="Play" size={20} className="mr-2" />
                    Смотреть
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl">{stream.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold truncate">{stream.streamer}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {stream.platform === 'twitch' ? '🟣 Twitch' : '🔴 YouTube'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <h3 className="font-bold mb-2 line-clamp-2">{stream.title}</h3>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="Gamepad2" size={14} />
                    <span>{stream.game}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredStreams.length === 0 && (
          <Card className="p-12 text-center">
            <Icon name="Search" size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-muted-foreground mb-4">Стримы не найдены</p>
            <Button>
              <Icon name="Radio" size={16} className="mr-2" />
              Стать первым стримером
            </Button>
          </Card>
        )}

        <Card className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <div className="flex items-center gap-4">
            <Icon name="Star" size={48} className="text-yellow-500" />
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">Стань стримером на платформе!</h3>
              <p className="text-sm text-muted-foreground">
                Получай донаты, собирай аудиторию и зарабатывай на любимой игре
              </p>
            </div>
            <Button size="lg">
              <Icon name="Radio" size={20} className="mr-2" />
              Подать заявку
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}