import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function VideoUploadDialog() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 500 * 1024 * 1024;
      
      if (file.size > maxSize) {
        toast.error('Файл слишком большой! Максимум 500 MB');
        return;
      }
      
      setVideoFile(file);
    }
  };

  const handleUpload = async () => {
    if (!title.trim()) {
      toast.error('Введите название видео');
      return;
    }

    if (!videoFile) {
      toast.error('Выберите файл видео');
      return;
    }

    setIsUploading(true);

    setTimeout(() => {
      const videoId = Math.random().toString(36).substring(7);
      toast.success(`✅ Видео "${title}" загружено успешно!`);
      toast.info(`ID видео: ${videoId} - Обработка займёт 5-10 минут`);
      
      setTitle('');
      setDescription('');
      setTags('');
      setVideoFile(null);
      setOpen(false);
      setIsUploading(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <Label htmlFor="video-title">Название*</Label>
            <Input 
              id="video-title" 
              placeholder="CS2 - Невероятный ACE!" 
              className="mt-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isUploading}
            />
          </div>
          <div>
            <Label htmlFor="video-desc">Описание</Label>
            <Textarea 
              id="video-desc" 
              placeholder="Расскажите о видео..." 
              className="mt-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isUploading}
            />
          </div>
          <div>
            <Label htmlFor="video-file">Файл видео*</Label>
            <Input 
              id="video-file" 
              type="file" 
              accept="video/*" 
              className="mt-2"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Максимум 500 MB. Форматы: MP4, WebM, MOV
            </p>
            {videoFile && (
              <p className="text-xs text-primary mt-1">
                Выбран файл: {videoFile.name} ({(videoFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="video-tags">Теги (через запятую)</Label>
            <Input 
              id="video-tags" 
              placeholder="CS2, Highlights, Clutch" 
              className="mt-2"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              disabled={isUploading}
            />
          </div>
          <Button 
            className="w-full" 
            onClick={handleUpload}
            disabled={isUploading || !title.trim() || !videoFile}
          >
            {isUploading ? (
              <>
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                Загрузка...
              </>
            ) : (
              <>
                <Icon name="Upload" size={16} className="mr-2" />
                Загрузить
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}