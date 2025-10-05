import { useState } from 'react';
import { Send, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface GameRequestFormProps {
  onSubmit?: (request: GameRequest) => void;
}

interface GameRequest {
  gameName: string;
  developer: string;
  publisher: string;
  description: string;
  releaseYear: string;
  platform: string[];
  genre: string[];
  storeLinks: string[];
  reason: string;
  userEmail: string;
}

export default function GameRequestForm({ onSubmit }: GameRequestFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<GameRequest>({
    gameName: '',
    developer: '',
    publisher: '',
    description: '',
    releaseYear: '',
    platform: [],
    genre: [],
    storeLinks: [],
    reason: '',
    userEmail: '',
  });

  const [linkInput, setLinkInput] = useState('');

  const platforms = ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile'];
  const genres = ['Action', 'RPG', 'Strategy', 'Shooter', 'Adventure', 'Simulation', 'Sports', 'Racing'];

  const handleInputChange = (field: keyof GameRequest, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const togglePlatform = (platform: string) => {
    const updated = formData.platform.includes(platform)
      ? formData.platform.filter((p) => p !== platform)
      : [...formData.platform, platform];
    setFormData({ ...formData, platform: updated });
  };

  const toggleGenre = (genre: string) => {
    const updated = formData.genre.includes(genre)
      ? formData.genre.filter((g) => g !== genre)
      : [...formData.genre, genre];
    setFormData({ ...formData, genre: updated });
  };

  const addLink = () => {
    if (linkInput.trim()) {
      setFormData({
        ...formData,
        storeLinks: [...formData.storeLinks, linkInput.trim()],
      });
      setLinkInput('');
    }
  };

  const removeLink = (index: number) => {
    setFormData({
      ...formData,
      storeLinks: formData.storeLinks.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.gameName || !formData.developer || !formData.reason) {
      toast({
        title: '❌ Заполните обязательные поля',
        description: 'Название игры, разработчик и причина обязательны',
        variant: 'destructive',
      });
      return;
    }

    onSubmit?.(formData);
    
    toast({
      title: '✅ Заявка отправлена!',
      description: 'Мы рассмотрим ваш запрос в ближайшее время',
    });

    setFormData({
      gameName: '',
      developer: '',
      publisher: '',
      description: '',
      releaseYear: '',
      platform: [],
      genre: [],
      storeLinks: [],
      reason: '',
      userEmail: '',
    });
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Предложить игру</h2>
        <p className="text-muted-foreground">
          Не нашли игру на нашем сайте? Заполните форму, и мы рассмотрим возможность её добавления
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="gameName">
            Название игры <span className="text-red-500">*</span>
          </Label>
          <Input
            id="gameName"
            value={formData.gameName}
            onChange={(e) => handleInputChange('gameName', e.target.value)}
            placeholder="Введите название игры"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="developer">
              Разработчик <span className="text-red-500">*</span>
            </Label>
            <Input
              id="developer"
              value={formData.developer}
              onChange={(e) => handleInputChange('developer', e.target.value)}
              placeholder="Название студии"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="publisher">Издатель</Label>
            <Input
              id="publisher"
              value={formData.publisher}
              onChange={(e) => handleInputChange('publisher', e.target.value)}
              placeholder="Издатель игры"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Описание игры</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Краткое описание игры, её особенности..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="releaseYear">Год выпуска</Label>
          <Input
            id="releaseYear"
            type="number"
            value={formData.releaseYear}
            onChange={(e) => handleInputChange('releaseYear', e.target.value)}
            placeholder="2024"
            min="1980"
            max="2030"
          />
        </div>

        <div className="space-y-2">
          <Label>Платформы</Label>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <Button
                key={platform}
                type="button"
                variant={formData.platform.includes(platform) ? 'default' : 'outline'}
                size="sm"
                onClick={() => togglePlatform(platform)}
              >
                {platform}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Жанры</Label>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Button
                key={genre}
                type="button"
                variant={formData.genre.includes(genre) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleGenre(genre)}
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Ссылки на магазины</Label>
          <div className="flex gap-2">
            <Input
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              placeholder="https://store.steampowered.com/..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLink())}
            />
            <Button type="button" variant="outline" onClick={addLink}>
              <Icon name="Plus" size={16} />
            </Button>
          </div>
          {formData.storeLinks.length > 0 && (
            <div className="space-y-1 mt-2">
              {formData.storeLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Icon name="Link" size={14} className="text-muted-foreground" />
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-primary hover:underline truncate"
                  >
                    {link}
                  </a>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLink(index)}
                  >
                    <Icon name="X" size={14} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">
            Почему эта игра должна быть на сайте? <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="reason"
            value={formData.reason}
            onChange={(e) => handleInputChange('reason', e.target.value)}
            placeholder="Расскажите, почему вы хотите видеть эту игру на нашем сайте..."
            rows={3}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="userEmail">Ваш email (для обратной связи)</Label>
          <Input
            id="userEmail"
            type="email"
            value={formData.userEmail}
            onChange={(e) => handleInputChange('userEmail', e.target.value)}
            placeholder="your@email.com"
          />
        </div>

        <div className="pt-4 border-t">
          <Button type="submit" size="lg" className="w-full">
            <Icon name="Send" size={18} className="mr-2" />
            Отправить заявку
          </Button>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Мы рассмотрим вашу заявку в течение 3-5 рабочих дней
          </p>
        </div>
      </form>
    </Card>
  );
}
