import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface Streamer {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  isLive: boolean;
  rating: number;
  games: string[];
  twitchUrl?: string;
  youtubeUrl?: string;
  discordUrl?: string;
  schedule: StreamSchedule[];
}

interface StreamSchedule {
  day: string;
  time: string;
  game: string;
}

const mockStreamers: Streamer[] = [
  {
    id: 1,
    name: 'ProGamerRU',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProGamerRU',
    bio: 'Профессиональный игрок в CS2 и Valorant. Мастер-тир. Обучаю тактике и аиму.',
    followers: 15420,
    isLive: true,
    rating: 4.9,
    games: ['CS2', 'Valorant', 'Apex Legends'],
    twitchUrl: 'https://twitch.tv/example',
    schedule: [
      { day: 'Пн-Пт', time: '18:00-23:00', game: 'CS2 Ranked' },
      { day: 'Сб-Вс', time: '14:00-20:00', game: 'Valorant' }
    ]
  },
  {
    id: 2,
    name: 'RPGMaster',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RPGMaster',
    bio: 'Люблю RPG и прохождения. Baldur\'s Gate 3, Elden Ring, Cyberpunk. Расслабленный стрим с чатом.',
    followers: 8930,
    isLive: false,
    rating: 4.7,
    games: ['Baldurs Gate 3', 'Elden Ring', 'Cyberpunk 2077'],
    youtubeUrl: 'https://youtube.com/@example',
    schedule: [
      { day: 'Вт, Чт, Сб', time: '20:00-01:00', game: 'RPG прохождения' }
    ]
  },
  {
    id: 3,
    name: 'SpeedRunner228',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SpeedRunner',
    bio: 'Спидраннер с мировыми рекордами. Celeste, Hollow Knight, Super Meat Boy.',
    followers: 12100,
    isLive: true,
    rating: 4.8,
    games: ['Celeste', 'Hollow Knight', 'Super Meat Boy'],
    twitchUrl: 'https://twitch.tv/example',
    discordUrl: 'https://discord.gg/example',
    schedule: [
      { day: 'Каждый день', time: '16:00-21:00', game: 'Speedrun практика' }
    ]
  },
  {
    id: 4,
    name: 'HorrorQueen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HorrorQueen',
    bio: 'Стримлю хорроры и выживание. Resident Evil, Silent Hill, Dead Space. Не пугаюсь! (иногда)',
    followers: 6750,
    isLive: false,
    rating: 4.6,
    games: ['Resident Evil', 'Silent Hill', 'Dead Space'],
    youtubeUrl: 'https://youtube.com/@example',
    schedule: [
      { day: 'Ср, Пт, Вс', time: '22:00-03:00', game: 'Horror games' }
    ]
  },
  {
    id: 5,
    name: 'MMOLegend',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MMOLegend',
    bio: 'MMO гуру. WoW, FF14, Lost Ark. Рейды, гайды, PvP. 10+ лет опыта.',
    followers: 19200,
    isLive: true,
    rating: 4.9,
    games: ['World of Warcraft', 'Final Fantasy XIV', 'Lost Ark'],
    twitchUrl: 'https://twitch.tv/example',
    discordUrl: 'https://discord.gg/example',
    schedule: [
      { day: 'Пн-Вс', time: '19:00-00:00', game: 'MMO контент' }
    ]
  },
  {
    id: 6,
    name: 'RetroGamer90',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RetroGamer',
    bio: 'Ретро игры и ностальгия. NES, SNES, Sega. Прохожу классику с комментариями.',
    followers: 4320,
    isLive: false,
    rating: 4.5,
    games: ['Mario', 'Sonic', 'Mega Man'],
    youtubeUrl: 'https://youtube.com/@example',
    schedule: [
      { day: 'Вт, Чт', time: '17:00-20:00', game: 'Ретро прохождения' }
    ]
  }
];

export default function StreamerCommunity() {
  const [selectedStreamer, setSelectedStreamer] = useState<Streamer | null>(null);
  const [subscribedStreamers, setSubscribedStreamers] = useState<number[]>([]);
  const [filter, setFilter] = useState<'all' | 'live' | 'offline'>('all');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const filteredStreamers = mockStreamers.filter(streamer => {
    if (filter === 'live') return streamer.isLive;
    if (filter === 'offline') return !streamer.isLive;
    return true;
  });

  const handleSubscribe = (streamerId: number) => {
    if (subscribedStreamers.includes(streamerId)) {
      setSubscribedStreamers(subscribedStreamers.filter(id => id !== streamerId));
      toast.success('Вы отписались от стримера');
    } else {
      setSubscribedStreamers([...subscribedStreamers, streamerId]);
      toast.success('Вы подписались! Будете получать уведомления о стримах');
      
      if (!notificationsEnabled) {
        toast.info('Включите уведомления браузера для оповещений');
      }
    }
  };

  const enableNotifications = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        toast.success('✅ Уведомления включены!');
        new Notification('GameStoreGame', {
          body: 'Вы будете получать уведомления о новых стримах',
          icon: '/favicon.ico'
        });
      } else {
        toast.error('Разрешите уведомления в настройках браузера');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent mb-2">
          👥 Сообщество стримеров
        </h2>
        <p className="text-muted-foreground">
          Подписывайтесь на любимых стримеров и не пропускайте трансляции
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            size="sm"
          >
            <Icon name="Users" size={16} className="mr-2" />
            Все стримеры
          </Button>
          <Button
            variant={filter === 'live' ? 'default' : 'outline'}
            onClick={() => setFilter('live')}
            size="sm"
          >
            <Icon name="Wifi" size={16} className="mr-2" />
            В эфире
          </Button>
          <Button
            variant={filter === 'offline' ? 'outline' : 'outline'}
            onClick={() => setFilter('offline')}
            size="sm"
          >
            <Icon name="WifiOff" size={16} className="mr-2" />
            Оффлайн
          </Button>
        </div>

        <Button
          variant={notificationsEnabled ? 'default' : 'outline'}
          onClick={enableNotifications}
          size="sm"
          className="ml-auto"
        >
          <Icon name={notificationsEnabled ? 'BellRing' : 'Bell'} size={16} className="mr-2" />
          {notificationsEnabled ? 'Уведомления включены' : 'Включить уведомления'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStreamers.map((streamer, index) => (
          <motion.div
            key={streamer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group hover:shadow-2xl transition-all h-full border-2 hover:border-primary/50">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16 ring-2 ring-primary/20">
                      <AvatarImage src={streamer.avatar} />
                      <AvatarFallback>{streamer.name[0]}</AvatarFallback>
                    </Avatar>
                    {streamer.isLive && (
                      <div className="absolute -bottom-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold animate-pulse flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        LIVE
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg mb-1 truncate">{streamer.name}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Icon name="Star" size={14} fill="currentColor" />
                        <span className="text-xs font-bold">{streamer.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Icon name="Users" size={12} />
                        <span className="text-xs">{(streamer.followers / 1000).toFixed(1)}K</span>
                      </div>
                    </div>
                  </div>
                </div>

                <CardDescription className="line-clamp-2 text-xs mt-2">
                  {streamer.bio}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-1 mb-3">
                  {streamer.games.slice(0, 3).map((game, idx) => (
                    <Badge key={idx} variant="secondary" className="text-[10px] px-1.5 py-0.5">
                      {game}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Calendar" size={12} />
                    <span className="font-medium">{streamer.schedule[0]?.day}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Clock" size={12} />
                    <span>{streamer.schedule[0]?.time}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  {streamer.twitchUrl && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => window.open(streamer.twitchUrl, '_blank')}
                    >
                      <Icon name="Wifi" size={14} className="mr-1" />
                      Twitch
                    </Button>
                  )}
                  {streamer.youtubeUrl && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => window.open(streamer.youtubeUrl, '_blank')}
                    >
                      <Icon name="Video" size={14} className="mr-1" />
                      YouTube
                    </Button>
                  )}
                  {streamer.discordUrl && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => window.open(streamer.discordUrl, '_blank')}
                    >
                      <Icon name="MessageCircle" size={14} className="mr-1" />
                      Discord
                    </Button>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button
                  className="flex-1"
                  variant={subscribedStreamers.includes(streamer.id) ? 'default' : 'outline'}
                  onClick={() => handleSubscribe(streamer.id)}
                >
                  <Icon 
                    name={subscribedStreamers.includes(streamer.id) ? 'BellRing' : 'Bell'} 
                    size={16} 
                    className="mr-2" 
                  />
                  {subscribedStreamers.includes(streamer.id) ? 'Подписан' : 'Подписаться'}
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setSelectedStreamer(streamer)}
                    >
                      <Icon name="Info" size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={streamer.avatar} />
                          <AvatarFallback>{streamer.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl">{streamer.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Icon name="Star" size={14} className="text-yellow-500" fill="currentColor" />
                            {streamer.rating} • {(streamer.followers / 1000).toFixed(1)}K подписчиков
                          </div>
                        </div>
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Icon name="User" size={16} />
                          О стримере
                        </h4>
                        <p className="text-sm text-muted-foreground">{streamer.bio}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Icon name="Gamepad2" size={16} />
                          Играет в
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {streamer.games.map((game, idx) => (
                            <Badge key={idx} variant="secondary">{game}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Icon name="Calendar" size={16} />
                          Расписание стримов
                        </h4>
                        <div className="space-y-2">
                          {streamer.schedule.map((schedule, idx) => (
                            <div key={idx} className="flex items-center gap-4 text-sm bg-muted/50 p-3 rounded-lg">
                              <div className="flex items-center gap-2 min-w-[120px]">
                                <Icon name="Calendar" size={14} />
                                <span className="font-medium">{schedule.day}</span>
                              </div>
                              <div className="flex items-center gap-2 min-w-[120px]">
                                <Icon name="Clock" size={14} />
                                <span>{schedule.time}</span>
                              </div>
                              <div className="flex items-center gap-2 flex-1">
                                <Icon name="Gamepad2" size={14} />
                                <span className="text-muted-foreground">{schedule.game}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {subscribedStreamers.length > 0 && (
        <Card className="mt-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="BellRing" size={20} />
              Ваши подписки ({subscribedStreamers.length})
            </CardTitle>
            <CardDescription>
              Вы будете получать уведомления, когда эти стримеры выходят в эфир
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {subscribedStreamers.map(id => {
                const streamer = mockStreamers.find(s => s.id === id);
                return streamer ? (
                  <div key={id} className="flex items-center gap-2 bg-background/50 rounded-lg px-3 py-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={streamer.avatar} />
                      <AvatarFallback>{streamer.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{streamer.name}</span>
                    {streamer.isLive && (
                      <Badge variant="destructive" className="text-[10px] animate-pulse">LIVE</Badge>
                    )}
                  </div>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
