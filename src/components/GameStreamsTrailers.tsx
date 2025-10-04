import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';

interface Stream {
  id: number;
  streamer: string;
  avatar: string;
  game: string;
  viewers: number;
  title: string;
  thumbnail: string;
  isLive: boolean;
  platform: 'Twitch' | 'YouTube';
}

interface Trailer {
  id: number;
  game: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  date: string;
}

const mockStreams: Stream[] = [
  {
    id: 1,
    streamer: 'TheBrokenMachine',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=broken',
    game: 'Call of Duty: Modern Warfare III',
    viewers: 12543,
    title: 'Ranked gameplay | Road to TOP 500 🔥',
    thumbnail: 'https://image.api.playstation.com/vulcan/ap/rnd/202310/1007/63b481e92a45146f79a54a57e5b5e7f7676d5d48b7c48e2d.png',
    isLive: true,
    platform: 'Twitch'
  },
  {
    id: 2,
    streamer: 'Maddyson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maddy',
    game: 'Elden Ring',
    viewers: 8234,
    title: 'Первое прохождение | Реакции',
    thumbnail: 'https://image.api.playstation.com/vulcan/ap/rnd/202108/0410/E4bTJbVi0i9fYsqPQMg2yD5j.png',
    isLive: true,
    platform: 'Twitch'
  },
  {
    id: 3,
    streamer: 'Bratishkinoff',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=brat',
    game: 'GTA V Online',
    viewers: 15678,
    title: 'Грабим казино с подписчиками',
    thumbnail: 'https://image.api.playstation.com/vulcan/ap/rnd/202202/2815/KkbQU7a2SZaWILqpAaVqqHkV.png',
    isLive: true,
    platform: 'YouTube'
  }
];

const mockTrailers: Trailer[] = [
  {
    id: 1,
    game: 'GTA VI',
    title: 'Официальный трейлер #1',
    thumbnail: 'https://image.api.playstation.com/vulcan/ap/rnd/202202/2815/KkbQU7a2SZaWILqpAaVqqHkV.png',
    duration: '1:30',
    views: 45000000,
    date: '2 дня назад'
  },
  {
    id: 2,
    game: 'The Last of Us Part III',
    title: 'Анонс на The Game Awards 2024',
    thumbnail: 'https://image.api.playstation.com/vulcan/ap/rnd/202205/2523/MeF6ZJYdpqB9ZSuWrPVdXBqC.png',
    duration: '2:15',
    views: 12000000,
    date: '1 неделю назад'
  },
  {
    id: 3,
    game: 'God of War Ragnarök',
    title: 'Геймплей трейлер - Valhalla DLC',
    thumbnail: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png',
    duration: '3:42',
    views: 8500000,
    date: '3 дня назад'
  }
];

export default function GameStreamsTrailers() {
  const [activeTab, setActiveTab] = useState('streams');

  const formatViewers = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
          📺 Стримы и трейлеры
        </h2>
        <p className="text-muted-foreground">
          Смотрите лучших стримеров и новые трейлеры игр
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="streams">
            <Icon name="Radio" size={16} className="mr-2" />
            Live стримы
          </TabsTrigger>
          <TabsTrigger value="trailers">
            <Icon name="Play" size={16} className="mr-2" />
            Трейлеры
          </TabsTrigger>
        </TabsList>

        <TabsContent value="streams">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStreams.map((stream, index) => (
              <motion.div
                key={stream.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group cursor-pointer hover:shadow-2xl transition-all overflow-hidden">
                  <div className="relative">
                    <img
                      src={stream.thumbnail}
                      alt={stream.game}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    
                    {stream.isLive && (
                      <Badge className="absolute top-3 left-3 bg-red-600 text-white animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                        LIVE
                      </Badge>
                    )}

                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                      <Icon name="Users" size={12} className="text-red-500" />
                      <span className="text-xs font-bold text-white">
                        {formatViewers(stream.viewers)}
                      </span>
                    </div>

                    <Badge className="absolute bottom-3 right-3 bg-black/80">
                      {stream.platform === 'Twitch' ? '🟣' : '🔴'} {stream.platform}
                    </Badge>
                  </div>

                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <img
                          src={stream.avatar}
                          alt={stream.streamer}
                          className="w-10 h-10 rounded-full border-2 border-primary"
                        />
                        {stream.isLive && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-card" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm line-clamp-2 mb-1">
                          {stream.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {stream.streamer}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {stream.game}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trailers">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTrailers.map((trailer, index) => (
              <motion.div
                key={trailer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group cursor-pointer hover:shadow-2xl transition-all overflow-hidden">
                  <div className="relative">
                    <img
                      src={trailer.thumbnail}
                      alt={trailer.game}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Icon name="Play" size={32} className="text-white ml-1" />
                      </div>
                    </div>

                    <Badge className="absolute bottom-3 right-3 bg-black/80">
                      {trailer.duration}
                    </Badge>
                  </div>

                  <CardContent className="pt-4">
                    <h3 className="font-bold text-sm mb-1">{trailer.game}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {trailer.title}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="Eye" size={12} />
                        {formatViewers(trailer.views)}
                      </span>
                      <span>{trailer.date}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="mt-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Tv" size={24} />
            Стань стримером!
          </CardTitle>
          <CardDescription>
            Хочешь попасть в список рекомендованных стримеров? Подай заявку!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Icon name="Star" size={16} className="mr-2" />
            Подать заявку
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
