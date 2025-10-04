import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Game {
  id: number;
  title: string;
  platform: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
  rating: number;
  release_year: number;
}

interface GameFormProps {
  game: Game | null;
  onSave: (game: Partial<Game>) => void;
}

export default function GameForm({ game, onSave }: GameFormProps) {
  const [formData, setFormData] = useState<Partial<Game>>(game || {
    title: '',
    platform: 'Xbox',
    price: 0,
    description: '',
    image_url: '',
    category: '',
    rating: 0,
    release_year: new Date().getFullYear()
  });

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{game ? 'Редактировать игру' : 'Добавить игру'}</DialogTitle>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-4 pr-4">
          <div>
            <Label>Название</Label>
            <Input 
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <Label>Платформа</Label>
            <Select value={formData.platform} onValueChange={(v) => setFormData({ ...formData, platform: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Xbox">Xbox</SelectItem>
                <SelectItem value="PlayStation">PlayStation</SelectItem>
                <SelectItem value="Both">Обе</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Цена (₽)</Label>
            <Input 
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            />
          </div>
          <div>
            <Label>Описание</Label>
            <Textarea 
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div>
            <Label>URL изображения</Label>
            <Input 
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Категория</Label>
              <Input 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </div>
            <div>
              <Label>Рейтинг</Label>
              <Input 
                type="number"
                step="0.1"
                max="10"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>
      </ScrollArea>
      <DialogFooter className="mt-4">
        <Button onClick={handleSubmit} className="bg-neon-green text-background">
          Сохранить
        </Button>
      </DialogFooter>
    </>
  );
}
