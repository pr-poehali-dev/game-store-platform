import { useState } from 'react';
import { GameClip, Screenshot } from '@/types/clips';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

// Mock data
const mockClips: GameClip[] = [
  {
    id: '1',
    userId: '1',
    username: 'ProGamer123',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProGamer123',
    gameId: 1,
    gameName: 'Valorant',
    title: 'Epic 1v5 Clutch!',
    description: 'Insane clutch round in ranked match',
    thumbnailUrl: 'https://picsum.photos/seed/clip1/400/225',
    videoUrl: 'https://example.com/clip1.mp4',
    duration: 45,
    views: 12450,
    likes: 892,
    comments: 134,
    createdAt: Date.now() - 86400000,
    tags: ['clutch', 'ranked', 'ace'],
  },
  {
    id: '2',
    userId: '2',
    username: 'ShadowNinja',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShadowNinja',
    gameId: 2,
    gameName: 'League of Legends',
    title: 'Pentakill Outplay',
    description: 'Clean pentakill in team fight',
    thumbnailUrl: 'https://picsum.photos/seed/clip2/400/225',
    videoUrl: 'https://example.com/clip2.mp4',
    duration: 32,
    views: 8920,
    likes: 654,
    comments: 87,
    createdAt: Date.now() - 172800000,
    tags: ['pentakill', 'outplay', 'montage'],
  },
  {
    id: '3',
    userId: '3',
    username: 'DragonSlayer',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DragonSlayer',
    gameId: 3,
    gameName: 'CS:GO',
    title: 'AWP Flick Shots',
    description: 'Crazy AWP flicks and headshots',
    thumbnailUrl: 'https://picsum.photos/seed/clip3/400/225',
    videoUrl: 'https://example.com/clip3.mp4',
    duration: 28,
    views: 15600,
    likes: 1203,
    comments: 201,
    createdAt: Date.now() - 259200000,
    tags: ['awp', 'flick', 'highlights'],
  },
  {
    id: '4',
    userId: '4',
    username: 'MasterChief',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MasterChief',
    gameId: 4,
    gameName: 'Apex Legends',
    title: 'Squad Wipe',
    description: 'Complete squad elimination solo',
    thumbnailUrl: 'https://picsum.photos/seed/clip4/400/225',
    videoUrl: 'https://example.com/clip4.mp4',
    duration: 51,
    views: 6780,
    likes: 445,
    comments: 56,
    createdAt: Date.now() - 345600000,
    tags: ['squadwipe', 'solo', 'apex'],
  },
];

const mockScreenshots: Screenshot[] = [
  {
    id: '1',
    userId: '1',
    username: 'ProGamer123',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProGamer123',
    gameId: 1,
    gameName: 'Valorant',
    imageUrl: 'https://picsum.photos/seed/screenshot1/800/450',
    description: 'Victory screen after ranked match',
    views: 3450,
    likes: 234,
    comments: 45,
    createdAt: Date.now() - 86400000,
    tags: ['victory', 'ranked'],
  },
  {
    id: '2',
    userId: '2',
    username: 'ShadowNinja',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShadowNinja',
    gameId: 2,
    gameName: 'League of Legends',
    imageUrl: 'https://picsum.photos/seed/screenshot2/800/450',
    description: 'New skin showcase',
    views: 5670,
    likes: 456,
    comments: 78,
    createdAt: Date.now() - 172800000,
    tags: ['skin', 'showcase'],
  },
  {
    id: '3',
    userId: '3',
    username: 'DragonSlayer',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DragonSlayer',
    gameId: 3,
    gameName: 'CS:GO',
    imageUrl: 'https://picsum.photos/seed/screenshot3/800/450',
    description: 'Epic moment in competitive',
    views: 7890,
    likes: 678,
    comments: 123,
    createdAt: Date.now() - 259200000,
    tags: ['competitive', 'epic'],
  },
];

const ClipsGallery = () => {
  const [selectedGame, setSelectedGame] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');

  const games = Array.from(new Set([...mockClips.map((c) => c.gameName), ...mockScreenshots.map((s) => s.gameName)]));

  const filteredClips = selectedGame === 'all' 
    ? mockClips 
    : mockClips.filter((clip) => clip.gameName === selectedGame);

  const filteredScreenshots = selectedGame === 'all'
    ? mockScreenshots
    : mockScreenshots.filter((screenshot) => screenshot.gameName === selectedGame);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatTimeAgo = (timestamp: number) => {
    const days = Math.floor((Date.now() - timestamp) / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Clips & Screenshots</h2>
          <p className="text-sm text-muted-foreground">Share your best gaming moments</p>
        </div>
        <Button>
          <Icon name="Upload" className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select value={selectedGame} onValueChange={setSelectedGame}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by game" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Games</SelectItem>
                  {games.map((game) => (
                    <SelectItem key={game} value={game}>
                      {game}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                  <SelectItem value="likes">Most Liked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Clips and Screenshots */}
      <Tabs defaultValue="clips" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="clips" className="flex items-center gap-2">
            <Icon name="Video" className="h-4 w-4" />
            Clips ({filteredClips.length})
          </TabsTrigger>
          <TabsTrigger value="screenshots" className="flex items-center gap-2">
            <Icon name="Image" className="h-4 w-4" />
            Screenshots ({filteredScreenshots.length})
          </TabsTrigger>
        </TabsList>

        {/* Clips Grid */}
        <TabsContent value="clips" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClips.map((clip) => (
              <Card key={clip.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative aspect-video bg-muted">
                  <img
                    src={clip.thumbnailUrl}
                    alt={clip.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="lg" className="rounded-full">
                      <Icon name="Play" className="h-6 w-6" />
                    </Button>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-black/60">
                    <Icon name="Clock" className="h-3 w-3 mr-1" />
                    {formatDuration(clip.duration)}
                  </Badge>
                  <Badge className="absolute bottom-2 left-2">{clip.gameName}</Badge>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="line-clamp-1">{clip.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{clip.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={clip.userAvatar} alt={clip.username} />
                      <AvatarFallback>{clip.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{clip.username}</p>
                      <p className="text-xs text-muted-foreground">{formatTimeAgo(clip.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {clip.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Icon name="Eye" className="h-4 w-4" />
                      {formatNumber(clip.views)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Heart" className="h-4 w-4" />
                      {formatNumber(clip.likes)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="MessageSquare" className="h-4 w-4" />
                      {formatNumber(clip.comments)}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Screenshots Grid */}
        <TabsContent value="screenshots" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredScreenshots.map((screenshot) => (
              <Card key={screenshot.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative aspect-video bg-muted">
                  <img
                    src={screenshot.imageUrl}
                    alt={screenshot.description}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="lg" variant="secondary" className="rounded-full">
                      <Icon name="Expand" className="h-6 w-6" />
                    </Button>
                  </div>
                  <Badge className="absolute bottom-2 left-2">{screenshot.gameName}</Badge>
                </div>
                <CardHeader className="pb-3">
                  <CardDescription className="line-clamp-2">{screenshot.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={screenshot.userAvatar} alt={screenshot.username} />
                      <AvatarFallback>{screenshot.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{screenshot.username}</p>
                      <p className="text-xs text-muted-foreground">{formatTimeAgo(screenshot.createdAt)}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Icon name="Eye" className="h-4 w-4" />
                      {formatNumber(screenshot.views)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Heart" className="h-4 w-4" />
                      {formatNumber(screenshot.likes)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="MessageSquare" className="h-4 w-4" />
                      {formatNumber(screenshot.comments)}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClipsGallery;
