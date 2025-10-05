import { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Heart,
  Share2,
  Users,
  Eye,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LiveStream, ChatMessage as StreamChatMessage } from '@/types/streaming';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LiveStreamPlayerProps {
  stream: LiveStream;
  onFollow?: () => void;
  onSubscribe?: () => void;
  onDonate?: () => void;
}

export default function LiveStreamPlayer({
  stream,
  onFollow,
  onSubscribe,
  onDonate,
}: LiveStreamPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<StreamChatMessage[]>([
    {
      id: '1',
      userId: 1,
      username: 'ProGamer123',
      userAvatar: '/api/placeholder/32/32',
      message: 'Отличный стрим! 🔥',
      timestamp: Date.now() - 60000,
      isSubscriber: true,
      isModerator: false,
      isStreamer: false,
      badges: ['subscriber'],
    },
    {
      id: '2',
      userId: 2,
      username: 'NightHawk',
      userAvatar: '/api/placeholder/32/32',
      message: 'GG WP! Продолжай в том же духе',
      timestamp: Date.now() - 30000,
      isSubscriber: false,
      isModerator: true,
      isStreamer: false,
      badges: ['moderator'],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const formatViewers = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const getDuration = () => {
    const seconds = Math.floor((Date.now() - stream.startedAt) / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const newMessage: StreamChatMessage = {
      id: Date.now().toString(),
      userId: 999,
      username: 'Вы',
      userAvatar: '/api/placeholder/32/32',
      message: chatMessage,
      timestamp: Date.now(),
      isSubscriber: false,
      isModerator: false,
      isStreamer: false,
      badges: [],
    };

    setChatMessages([...chatMessages, newMessage]);
    setChatMessage('');
  };

  const getBadgeColor = (badge: string) => {
    if (badge === 'streamer') return 'bg-red-500';
    if (badge === 'moderator') return 'bg-green-500';
    if (badge === 'subscriber') return 'bg-purple-500';
    return 'bg-gray-500';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-4">
        <Card className="overflow-hidden">
          <div className="relative bg-black aspect-video group">
            <img
              src={stream.thumbnail}
              alt={stream.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="bg-red-500 text-white animate-pulse">
                <Icon name="CircleDot" size={10} className="mr-1" />
                LIVE
              </Badge>
              <Badge className="bg-black/70 text-white">
                <Icon name="Eye" size={14} className="mr-1" />
                {formatViewers(stream.viewers)}
              </Badge>
              <Badge className="bg-black/70 text-white">{getDuration()}</Badge>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    <Icon name={isPlaying ? 'Pause' : 'Play'} size={24} />
                  </Button>

                  <div className="flex items-center gap-2 flex-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      <Icon name={isMuted ? 'VolumeX' : 'Volume2'} size={20} />
                    </Button>
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      onValueChange={(val) => {
                        setVolume(val[0]);
                        setIsMuted(false);
                      }}
                      max={100}
                      step={1}
                      className="w-24"
                    />
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <Icon name="Settings" size={20} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <Icon name="Maximize" size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12 border-2 border-primary">
                <AvatarImage src={stream.streamerAvatar} alt={stream.streamerName} />
                <AvatarFallback>{stream.streamerName[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h2 className="font-bold text-xl mb-1">{stream.title}</h2>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">{stream.streamerName}</span>
                  <Badge variant="secondary">
                    <Icon name="Users" size={12} className="mr-1" />
                    {formatViewers(stream.stats.followers)} подписчиков
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{stream.gameName}</p>
                <div className="flex flex-wrap gap-1">
                  {stream.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={isFollowing ? 'outline' : 'default'}
                  onClick={() => {
                    setIsFollowing(!isFollowing);
                    onFollow?.();
                  }}
                >
                  <Icon name="Heart" size={16} className={`mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                  {isFollowing ? 'Отписаться' : 'Подписаться'}
                </Button>
                <Button variant="secondary" onClick={onSubscribe}>
                  <Icon name="Star" size={16} className="mr-2" />
                  Донат
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="Share2" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-bold mb-3">О стриме</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{formatViewers(stream.stats.totalViews)}</div>
              <p className="text-sm text-muted-foreground">Просмотров</p>
            </div>
            <div>
              <div className="text-2xl font-bold">{formatViewers(stream.stats.peakViewers)}</div>
              <p className="text-sm text-muted-foreground">Пик зрителей</p>
            </div>
            <div>
              <div className="text-2xl font-bold">{stream.stats.subscribers}</div>
              <p className="text-sm text-muted-foreground">Подписчики</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="flex flex-col h-[700px]">
        <div className="p-4 border-b">
          <h3 className="font-bold">Чат стрима</h3>
          <p className="text-xs text-muted-foreground">
            {stream.viewers} {stream.viewers === 1 ? 'зритель' : 'зрителей'}
          </p>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="group">
                <div className="flex items-start gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={msg.userAvatar} alt={msg.username} />
                    <AvatarFallback>{msg.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 flex-wrap">
                      {msg.badges.map((badge) => (
                        <Badge
                          key={badge}
                          className={`h-4 px-1 text-xs ${getBadgeColor(badge)}`}
                        >
                          {badge}
                        </Badge>
                      ))}
                      <span className="font-semibold text-sm">{msg.username}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(msg.timestamp).toLocaleTimeString('ru', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="text-sm break-words">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Отправить сообщение..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>
              <Icon name="Send" size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
