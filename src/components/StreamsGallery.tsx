import { useState } from 'react';
import { Eye, Users, TrendingUp, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Stream } from '@/types/notifications';
import Icon from '@/components/ui/icon';

interface StreamsGalleryProps {
  streams: Stream[];
  onStreamClick?: (streamId: string) => void;
}

export default function StreamsGallery({ streams, onStreamClick }: StreamsGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Все стримы', icon: 'Grid' },
    { id: 'friends', label: 'Друзья', icon: 'Users' },
    { id: 'popular', label: 'Популярные', icon: 'TrendingUp' },
    { id: 'new', label: 'Новые', icon: 'Sparkles' },
  ];

  const formatViewers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const getStreamDuration = (startedAt: number) => {
    const seconds = Math.floor((Date.now() - startedAt) / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}ч ${minutes}м`;
    }
    return `${minutes}м`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Стримы</h2>
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              <Icon name={category.icon} size={14} className="mr-2" />
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {streams.length === 0 ? (
        <Card className="p-12 text-center">
          <Icon name="Video" size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-muted-foreground">
            Нет активных стримов
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Начните трансляцию или следите за стримами друзей
          </p>
          <Button className="mt-4">
            <Icon name="Video" size={16} className="mr-2" />
            Начать стрим
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {streams.map((stream) => (
            <Card
              key={stream.id}
              className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all"
              onClick={() => onStreamClick?.(stream.id)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                
                <div className="absolute top-2 left-2 flex gap-2">
                  <Badge className="bg-red-500 text-white font-bold animate-pulse">
                    <Icon name="CircleDot" size={8} className="mr-1" />
                    LIVE
                  </Badge>
                  <Badge className="bg-black/70 text-white">
                    <Icon name="Eye" size={12} className="mr-1" />
                    {formatViewers(stream.viewers)}
                  </Badge>
                </div>

                <div className="absolute bottom-2 right-2">
                  <Badge className="bg-black/70 text-white text-xs">
                    {getStreamDuration(stream.startedAt)}
                  </Badge>
                </div>

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                    <Icon name="Play" size={24} className="ml-1" />
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10 border-2 border-primary/20">
                    <AvatarImage src={stream.streamerAvatar} alt={stream.streamerName} />
                    <AvatarFallback>{stream.streamerName[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                      {stream.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-1">
                      {stream.streamerName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stream.gameName}
                    </p>
                  </div>
                </div>

                {stream.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {stream.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
