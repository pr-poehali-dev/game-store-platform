import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';
import { Video, formatViews } from './types';

interface VideoCardProps {
  video: Video;
  index: number;
  isLiked: boolean;
  onLike: (videoId: number) => void;
  onSelect: (video: Video) => void;
}

export default function VideoCard({ video, index, isLiked, onLike, onSelect }: VideoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="group hover:shadow-2xl transition-all cursor-pointer h-full">
        <div 
          className="relative overflow-hidden rounded-t-lg"
          onClick={() => onSelect(video)}
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
              variant={isLiked ? 'default' : 'outline'}
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onLike(video.id);
              }}
            >
              <Icon name="ThumbsUp" size={14} className="mr-1" />
              {isLiked ? 'Нравится' : 'Лайк'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSelect(video)}
            >
              <Icon name="MessageCircle" size={14} className="mr-1" />
              {video.comments.length}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
