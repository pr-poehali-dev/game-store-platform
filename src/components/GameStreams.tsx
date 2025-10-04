import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';

interface Stream {
  id: number;
  streamer: string;
  avatar: string;
  game: string;
  title: string;
  viewers: number;
  thumbnail: string;
  isLive: boolean;
  platform: 'twitch' | 'youtube';
}

interface Clip {
  id: number;
  title: string;
  game: string;
  author: string;
  views: number;
  thumbnail: string;
  duration: string;
}

const mockStreams: Stream[] = [
  {
    id: 1,
    streamer: 'ProGamerTTV',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProGamer',
    game: 'Call of Duty: Warzone',
    title: 'Идём в ТОП-1! Турнир за 100К',
    viewers: 15420,
    thumbnail: 'https://picsum.photos/seed/stream1/400/225',
    isLive: true,
    platform: 'twitch'
  },
  {
    id: 2,
    streamer: 'GamerQueen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Queen',
    game: 'GTA VI',
    title: 'Прохождение новой миссии!',
    viewers: 8350,
    thumbnail: 'https://picsum.photos/seed/stream2/400/225',
    isLive: true,
    platform: 'youtube'
  },
  {
    id: 3,
    streamer: 'CyberNinja',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ninja',
    game: 'Cyberpunk 2077',
    title: 'Стрим с донатами! Качаем персонажа',
    viewers: 4230,
    thumbnail: 'https://picsum.photos/seed/stream3/400/225',
    isLive: true,
    platform: 'twitch'
  }
];

const mockClips: Clip[] = [
  {
    id: 1,
    title: 'Невероятный камбэк в CS2!',
    game: 'Counter-Strike 2',
    author: 'ProGamer',
    views: 125340,
    thumbnail: 'https://picsum.photos/seed/clip1/400/225',
    duration: '0:45'
  },
  {
    id: 2,
    title: 'Epic Victory Royale в Fortnite',
    game: 'Fortnite',
    author: 'NightHunter',
    views: 89200,
    thumbnail: 'https://picsum.photos/seed/clip2/400/225',
    duration: '1:23'
  },
  {
    id: 3,
    title: 'Лучший момент турнира!',
    game: 'Valorant',
    author: 'DragonSlayer',
    views: 67890,
    thumbnail: 'https://picsum.photos/seed/clip3/400/225',
    duration: '0:58'
  }
];

export default function GameStreams() {
  const [activeTab, setActiveTab] = useState('streams');

  const getPlatformIcon = (platform: Stream['platform']) => {
    return platform === 'twitch' ? 'Tv' : 'Youtube';
  };

  const getPlatformColor = (platform: Stream['platform']) => {
    return platform === 'twitch' ? 'text-purple-500' : 'text-red-500';
  };

  return (
    <div className="container mx-auto px-4 py-12" data-section="streams">
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
          📺 Стримы и клипы геймеров
        </h2>
        <p className="text-muted-foreground">
          Смотрите лучшие стримы и самые эпичные моменты
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="streams">
            <Icon name="Radio" size={18} className="mr-2" />
            Прямые эфиры
            <Badge className="ml-2 bg-red-500 animate-pulse">{mockStreams.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="clips">
            <Icon name="Video" size={18} className="mr-2" />
            Клипы
          </TabsTrigger>
        </TabsList>

        <TabsContent value="streams" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStreams.map((stream, index) => (
              <motion.div
                key={stream.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:border-primary/50 transition-all cursor-pointer group">
                  <div className="relative">
                    <img 
                      src={stream.thumbnail} 
                      alt={stream.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                    {stream.isLive && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white animate-pulse">
                        <Icon name="Circle" size={8} className="mr-1 fill-white" />
                        LIVE
                      </Badge>
                    )}
                    <div className="absolute top-2 right-2 flex items-center gap-2 bg-black/70 px-2 py-1 rounded">
                      <Icon name="Eye" size={14} className="text-white" />
                      <span className="text-white text-xs font-semibold">
                        {stream.viewers.toLocaleString()}
                      </span>
                    </div>
                    <Button 
                      size="icon"
                      className="absolute inset-0 m-auto w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-primary/90 hover:bg-primary"
                    >
                      <Icon name="Play" size={24} />
                    </Button>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <img src={stream.avatar} alt={stream.streamer} />
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base line-clamp-2 mb-1">
                          {stream.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          <div className="font-semibold">{stream.streamer}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Icon 
                              name={getPlatformIcon(stream.platform)} 
                              size={12} 
                              className={getPlatformColor(stream.platform)}
                            />
                            <span className="text-xs">{stream.game}</span>
                          </div>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="clips">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockClips.map((clip, index) => (
              <motion.div
                key={clip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:border-primary/50 transition-all cursor-pointer group">
                  <div className="relative">
                    <img 
                      src={clip.thumbnail} 
                      alt={clip.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-white text-xs font-semibold">
                      {clip.duration}
                    </div>
                    <Button 
                      size="icon"
                      className="absolute inset-0 m-auto w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-primary/90 hover:bg-primary"
                    >
                      <Icon name="Play" size={24} />
                    </Button>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base line-clamp-2 mb-2">
                      {clip.title}
                    </CardTitle>
                    <CardDescription>
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <div className="font-semibold text-foreground">{clip.author}</div>
                          <div className="text-muted-foreground">{clip.game}</div>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Icon name="Eye" size={12} />
                          <span>{(clip.views / 1000).toFixed(1)}K</span>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 text-center">
        <Button size="lg" variant="outline">
          <Icon name="Plus" size={20} className="mr-2" />
          Загрузить свой клип
        </Button>
      </div>
    </div>
  );
}
