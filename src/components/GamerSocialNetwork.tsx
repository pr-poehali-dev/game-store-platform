import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Post {
  id: number;
  author: string;
  avatar: string;
  game: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  time: string;
  isLiked?: boolean;
}

interface Friend {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'ingame';
  game?: string;
  level: number;
}

const mockPosts: Post[] = [
  {
    id: 1,
    author: 'ProGamer2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProGamer',
    game: 'GTA VI',
    content: 'Только что прошел первую миссию в GTA VI! Графика просто нереальная! 🔥',
    likes: 234,
    comments: 45,
    time: '5 мин назад'
  },
  {
    id: 2,
    author: 'NightHunter',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Night',
    game: 'Call of Duty',
    content: 'Кто-нибудь хочет в скво на Warzone? Нужен снайпер!',
    likes: 89,
    comments: 23,
    time: '15 мин назад'
  },
  {
    id: 3,
    author: 'DragonSlayer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dragon',
    game: 'Elden Ring',
    content: 'Наконец-то победил Малению! Понадобилось 47 попыток 😅',
    likes: 567,
    comments: 123,
    time: '1 час назад'
  }
];

const mockFriends: Friend[] = [
  { id: 1, name: 'ShadowKnight', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shadow', status: 'ingame', game: 'Fortnite', level: 45 },
  { id: 2, name: 'PhoenixRise', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Phoenix', status: 'online', level: 38 },
  { id: 3, name: 'CyberNinja', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cyber', status: 'offline', level: 52 },
  { id: 4, name: 'IceQueen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ice', status: 'ingame', game: 'Valorant', level: 41 }
];

export default function GamerSocialNetwork() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const { toast } = useToast();

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: posts.length + 1,
      author: 'Вы',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      game: 'GTA VI',
      content: newPostContent,
      likes: 0,
      comments: 0,
      time: 'только что'
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    toast({
      title: '✅ Пост опубликован!',
      description: 'Ваш пост появился в ленте'
    });
  };

  const getStatusColor = (status: Friend['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'ingame': return 'bg-blue-500';
      case 'offline': return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Friend['status'], game?: string) => {
    switch (status) {
      case 'online': return 'В сети';
      case 'ingame': return `Играет в ${game}`;
      case 'offline': return 'Не в сети';
    }
  };

  const handleBack = () => window.history.back();
  const handleHome = () => window.location.href = '/';

  return (
    <div className="container mx-auto px-4 py-12" data-section="social">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            👥 Социальная сеть геймеров
          </h2>
          <Button variant="outline" size="sm" onClick={handleHome} className="ml-auto">
            <Icon name="Home" size={16} className="mr-2" />
            На главную
          </Button>
        </div>
        <p className="text-muted-foreground">
          Общайтесь, делитесь достижениями и находите друзей для игр
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Левая колонка - друзья */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Users" size={20} />
                Друзья
                <Badge className="ml-auto">{mockFriends.filter(f => f.status !== 'offline').length} онлайн</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockFriends.map((friend) => (
                <motion.div
                  key={friend.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card/50 hover:bg-card border border-border cursor-pointer"
                >
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <img src={friend.avatar} alt={friend.name} />
                    </Avatar>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${getStatusColor(friend.status)} border-2 border-card`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{friend.name}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {getStatusText(friend.status, friend.game)}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">LVL {friend.level}</Badge>
                </motion.div>
              ))}
              <Button variant="outline" className="w-full">
                <Icon name="UserPlus" size={16} className="mr-2" />
                Добавить друга
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Правая колонка - лента */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="PenSquare" size={20} />
                Создать пост
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Поделитесь своими игровыми достижениями..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="mb-3 min-h-[100px]"
              />
              <div className="flex items-center gap-2">
                <Button onClick={handleCreatePost} className="bg-gradient-to-r from-primary to-secondary">
                  <Icon name="Send" size={16} className="mr-2" />
                  Опубликовать
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Image" size={16} className="mr-2" />
                  Фото
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Video" size={16} className="mr-2" />
                  Видео
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="feed" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="feed" className="flex-1">
                <Icon name="Home" size={16} className="mr-2" />
                Лента
              </TabsTrigger>
              <TabsTrigger value="popular" className="flex-1">
                <Icon name="TrendingUp" size={16} className="mr-2" />
                Популярное
              </TabsTrigger>
              <TabsTrigger value="clips" className="flex-1">
                <Icon name="Video" size={16} className="mr-2" />
                Клипы
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-4 mt-4">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <Avatar className="w-12 h-12">
                          <img src={post.avatar} alt={post.author} />
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{post.author}</h4>
                            <Badge variant="outline" className="text-xs">{post.game}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{post.time}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{post.content}</p>
                      {post.image && (
                        <img src={post.image} alt="Post" className="rounded-lg mb-4 w-full" />
                      )}
                      <div className="flex items-center gap-4 pt-3 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={post.isLiked ? 'text-red-500' : ''}
                        >
                          <Icon name="Heart" size={16} className="mr-2" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="MessageCircle" size={16} className="mr-2" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="Share2" size={16} className="mr-2" />
                          Поделиться
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="popular" className="mt-4">
              <Card>
                <CardContent className="py-12 text-center">
                  <Icon name="TrendingUp" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Популярные посты появятся здесь</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clips" className="mt-4">
              <Card>
                <CardContent className="py-12 text-center">
                  <Icon name="Video" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Игровые клипы появятся здесь</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}