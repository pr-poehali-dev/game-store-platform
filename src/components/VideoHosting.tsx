import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  uploadDate: string;
  author: {
    name: string;
    avatar: string;
  };
  description: string;
  tags: string[];
  comments: Comment[];
  videoUrl: string;
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  likes: number;
  timestamp: string;
}

const mockVideos: Video[] = [
  {
    id: 1,
    title: 'CS2 - ACE на Mirage! Невероятная катка 1v5',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    duration: '12:34',
    views: 45200,
    likes: 3420,
    uploadDate: '2 дня назад',
    author: {
      name: 'ProGamerRU',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProGamerRU'
    },
    description: 'Лучший момент недели! Смог вытащить раунд 1 против 5 на Mirage. Смотрите как правильно использовать позиции и тайминги.',
    tags: ['CS2', 'ACE', 'Clutch', 'Highlights'],
    videoUrl: 'dQw4w9WgXcQ',
    comments: [
      {
        id: 1,
        author: 'GamerBoy228',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GamerBoy',
        text: 'Невероятно! Как ты так аимишь? 🔥',
        likes: 45,
        timestamp: '1 час назад'
      },
      {
        id: 2,
        author: 'CS_Fan',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CSFan',
        text: 'Респект за клатч! Научи играть',
        likes: 23,
        timestamp: '3 часа назад'
      }
    ]
  },
  {
    id: 2,
    title: 'Elden Ring - Битва с боссом Malenia (No Hit)',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
    duration: '8:45',
    views: 67800,
    likes: 5120,
    uploadDate: '1 неделю назад',
    author: {
      name: 'SpeedRunner228',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SpeedRunner'
    },
    description: 'После 200+ попыток наконец получилось! Malenia без единого урона. Разбор стратегии и паттернов босса.',
    tags: ['Elden Ring', 'Boss Fight', 'No Hit', 'Souls-like'],
    videoUrl: 'jNQXAC9IVRw',
    comments: [
      {
        id: 3,
        author: 'SoulsLover',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Souls',
        text: 'Легенда! Я 500 раз умер на этом боссе',
        likes: 89,
        timestamp: '2 дня назад'
      }
    ]
  },
  {
    id: 3,
    title: 'Valorant - Top 5 играх недели от сообщества',
    thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
    duration: '15:20',
    views: 32100,
    likes: 2340,
    uploadDate: '3 дня назад',
    author: {
      name: 'RPGMaster',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RPGMaster'
    },
    description: 'Собрал лучшие клипы от зрителей! Невероятные ACE, 200 IQ моменты и эпичные фейлы.',
    tags: ['Valorant', 'Top 5', 'Community', 'Highlights'],
    videoUrl: 'dQw4w9WgXcQ',
    comments: []
  },
  {
    id: 4,
    title: 'Baldurs Gate 3 - Секретная концовка! (Спойлеры)',
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80',
    duration: '22:10',
    views: 18900,
    likes: 1560,
    uploadDate: '5 дней назад',
    author: {
      name: 'RPGMaster',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RPGMaster'
    },
    description: 'Нашел скрытую концовку игры! Все секреты и пасхалки третьего акта.',
    tags: ['Baldurs Gate 3', 'Секреты', 'RPG', 'Гайд'],
    videoUrl: 'jNQXAC9IVRw',
    comments: [
      {
        id: 4,
        author: 'RPG_Veteran',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Veteran',
        text: 'Спасибо! Не знал про эту концовку',
        likes: 67,
        timestamp: '1 день назад'
      }
    ]
  },
  {
    id: 5,
    title: 'Cyberpunk 2077 - Phantom Liberty полное прохождение #1',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    duration: '45:30',
    views: 89300,
    likes: 6780,
    uploadDate: '2 недели назад',
    author: {
      name: 'HorrorQueen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HorrorQueen'
    },
    description: 'Начинаю проходить новое DLC! Сюжет, графика, геймплей - все в этом видео.',
    tags: ['Cyberpunk 2077', 'Phantom Liberty', 'Прохождение', 'DLC'],
    videoUrl: 'dQw4w9WgXcQ',
    comments: []
  },
  {
    id: 6,
    title: 'Hollow Knight - All Bosses Speedrun (32:14 WR)',
    thumbnail: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&q=80',
    duration: '32:14',
    views: 123400,
    likes: 9870,
    uploadDate: '1 месяц назад',
    author: {
      name: 'SpeedRunner228',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SpeedRunner'
    },
    description: 'НОВЫЙ МИРОВОЙ РЕКОРД! Все боссы за 32 минуты 14 секунд. Разбор маршрута и оптимизации.',
    tags: ['Hollow Knight', 'Speedrun', 'World Record', 'All Bosses'],
    videoUrl: 'jNQXAC9IVRw',
    comments: [
      {
        id: 5,
        author: 'SpeedrunFan',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fan',
        text: 'Безумие! Поздравляю с рекордом!',
        likes: 234,
        timestamp: '1 неделю назад'
      }
    ]
  }
];

export default function VideoHosting() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [likedVideos, setLikedVideos] = useState<number[]>([]);
  const [newComment, setNewComment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(mockVideos.flatMap(v => v.tags)));

  const filteredVideos = mockVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !filterTag || video.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  const handleLike = (videoId: number) => {
    if (likedVideos.includes(videoId)) {
      setLikedVideos(likedVideos.filter(id => id !== videoId));
      toast.success('Лайк убран');
    } else {
      setLikedVideos([...likedVideos, videoId]);
      toast.success('👍 Лайк поставлен!');
    }
  };

  const handleComment = () => {
    if (!newComment.trim()) return;
    toast.success('Комментарий добавлен!');
    setNewComment('');
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
          🎬 Библиотека клипов и записей
        </h2>
        <p className="text-muted-foreground">
          Лучшие моменты, гайды и прохождения от нашего сообщества
        </p>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по видео, описанию, тегам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">
                <Icon name="Upload" size={16} className="mr-2" />
                Загрузить видео
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Загрузить запись стрима или клип</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="video-title">Название</Label>
                  <Input id="video-title" placeholder="CS2 - Невероятный ACE!" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="video-desc">Описание</Label>
                  <Textarea id="video-desc" placeholder="Расскажите о видео..." className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="video-file">Файл видео</Label>
                  <Input id="video-file" type="file" accept="video/*" className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Максимум 500 MB. Форматы: MP4, WebM, MOV
                  </p>
                </div>
                <div>
                  <Label htmlFor="video-tags">Теги (через запятую)</Label>
                  <Input id="video-tags" placeholder="CS2, Highlights, Clutch" className="mt-2" />
                </div>
                <Button className="w-full" onClick={() => toast.success('Видео загружается! Это может занять несколько минут')}>
                  <Icon name="Upload" size={16} className="mr-2" />
                  Загрузить
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={filterTag === null ? 'default' : 'outline'}
            onClick={() => setFilterTag(null)}
          >
            Все видео
          </Button>
          {allTags.map(tag => (
            <Button
              key={tag}
              size="sm"
              variant={filterTag === tag ? 'default' : 'outline'}
              onClick={() => setFilterTag(tag)}
            >
              #{tag}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group hover:shadow-2xl transition-all cursor-pointer h-full">
              <div 
                className="relative overflow-hidden rounded-t-lg"
                onClick={() => setSelectedVideo(video)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Icon name="Play" size={32} className="text-white ml-1" />
                  </div>
                </div>

                <Badge className="absolute bottom-3 right-3 bg-black/80">
                  {video.duration}
                </Badge>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start gap-3 mb-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={video.author.avatar} />
                    <AvatarFallback>{video.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm line-clamp-2 mb-1">
                      {video.title}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {video.author.name}
                    </CardDescription>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="Eye" size={12} />
                    {formatViews(video.views)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="ThumbsUp" size={12} />
                    {formatViews(video.likes)}
                  </span>
                  <span>{video.uploadDate}</span>
                </div>
              </CardHeader>

              <CardFooter className="pt-0">
                <div className="flex gap-2 w-full">
                  <Button
                    size="sm"
                    variant={likedVideos.includes(video.id) ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(video.id);
                    }}
                  >
                    <Icon name="ThumbsUp" size={14} className="mr-1" />
                    {likedVideos.includes(video.id) ? 'Нравится' : 'Лайк'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <Icon name="MessageCircle" size={14} className="mr-1" />
                    {video.comments.length}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedVideo && (
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedVideo.title}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideo.videoUrl}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={selectedVideo.author.avatar} />
                    <AvatarFallback>{selectedVideo.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{selectedVideo.author.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {formatViews(selectedVideo.views)} просмотров • {selectedVideo.uploadDate}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={likedVideos.includes(selectedVideo.id) ? 'default' : 'outline'}
                    onClick={() => handleLike(selectedVideo.id)}
                  >
                    <Icon name="ThumbsUp" size={16} className="mr-2" />
                    {formatViews(selectedVideo.likes)}
                  </Button>
                  <Button variant="outline">
                    <Icon name="Share2" size={16} className="mr-2" />
                    Поделиться
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">{selectedVideo.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedVideo.tags.map(tag => (
                    <Badge key={tag} variant="secondary">#{tag}</Badge>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Icon name="MessageCircle" size={18} />
                  Комментарии ({selectedVideo.comments.length})
                </h4>

                <div className="flex gap-3 mb-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>Я</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Textarea
                      placeholder="Добавить комментарий..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={2}
                    />
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="outline" onClick={() => setNewComment('')}>
                        Отмена
                      </Button>
                      <Button size="sm" onClick={handleComment} disabled={!newComment.trim()}>
                        Отправить
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedVideo.comments.map(comment => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={comment.avatar} />
                        <AvatarFallback>{comment.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm mb-2">{comment.text}</p>
                        <Button size="sm" variant="ghost" className="h-auto py-1 px-2">
                          <Icon name="ThumbsUp" size={12} className="mr-1" />
                          {comment.likes}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
