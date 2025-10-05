import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { mockVideos } from './video/types';
import VideoCard from './video/VideoCard';
import VideoUploadDialog from './video/VideoUploadDialog';
import VideoPlayerDialog from './video/VideoPlayerDialog';

export default function VideoHosting() {
  const [selectedVideo, setSelectedVideo] = useState<typeof mockVideos[0] | null>(null);
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
          
          <VideoUploadDialog />
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
          <VideoCard
            key={video.id}
            video={video}
            index={index}
            isLiked={likedVideos.includes(video.id)}
            onLike={handleLike}
            onSelect={setSelectedVideo}
          />
        ))}
      </div>

      <VideoPlayerDialog
        video={selectedVideo}
        isLiked={selectedVideo ? likedVideos.includes(selectedVideo.id) : false}
        newComment={newComment}
        onClose={() => setSelectedVideo(null)}
        onLike={handleLike}
        onCommentChange={setNewComment}
        onCommentSubmit={handleComment}
      />
    </div>
  );
}
