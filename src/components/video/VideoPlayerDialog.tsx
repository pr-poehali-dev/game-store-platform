import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Video, formatViews } from './types';

interface VideoPlayerDialogProps {
  video: Video | null;
  isLiked: boolean;
  newComment: string;
  onClose: () => void;
  onLike: (videoId: number) => void;
  onCommentChange: (value: string) => void;
  onCommentSubmit: () => void;
}

export default function VideoPlayerDialog({
  video,
  isLiked,
  newComment,
  onClose,
  onLike,
  onCommentChange,
  onCommentSubmit
}: VideoPlayerDialogProps) {
  if (!video) return null;

  return (
    <Dialog open={!!video} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{video.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.videoUrl}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={video.author.avatar} />
                <AvatarFallback>{video.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">{video.author.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {formatViews(video.views)} просмотров • {video.uploadDate}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant={isLiked ? 'default' : 'outline'}
                onClick={() => onLike(video.id)}
              >
                <Icon name="ThumbsUp" size={16} className="mr-2" />
                {formatViews(video.likes)}
              </Button>
              <Button variant="outline">
                <Icon name="Share2" size={16} className="mr-2" />
                Поделиться
              </Button>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">{video.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {video.tags.map(tag => (
                <Badge key={tag} variant="secondary">#{tag}</Badge>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Icon name="MessageCircle" size={18} />
              Комментарии ({video.comments.length})
            </h4>

            <div className="flex gap-3 mb-4">
              <Avatar className="w-10 h-10">
                <AvatarFallback>Я</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Textarea
                  placeholder="Добавить комментарий..."
                  value={newComment}
                  onChange={(e) => onCommentChange(e.target.value)}
                  rows={2}
                />
                <div className="flex gap-2 justify-end">
                  <Button size="sm" variant="outline" onClick={() => onCommentChange('')}>
                    Отмена
                  </Button>
                  <Button size="sm" onClick={onCommentSubmit} disabled={!newComment.trim()}>
                    Отправить
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {video.comments.map(comment => (
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
  );
}
