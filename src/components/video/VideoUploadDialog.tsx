import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function VideoUploadDialog() {
  const handleUpload = () => {
    toast.success('Видео загружается! Это может занять несколько минут');
  };

  return (
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
          <Button className="w-full" onClick={handleUpload}>
            <Icon name="Upload" size={16} className="mr-2" />
            Загрузить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
