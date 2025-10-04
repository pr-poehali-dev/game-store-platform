import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Tournament {
  id: number;
  title: string;
  game: string;
  platform: 'Xbox' | 'PlayStation' | 'Both';
  prizePool: number;
  participants: number;
  maxParticipants: number;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'finished';
  image: string;
  format: string;
  rules: string[];
}

interface TournamentFormProps {
  tournament: Tournament | null;
  onSave: (tournament: Partial<Tournament>) => void;
  onClose?: () => void;
}

export default function TournamentForm({ tournament, onSave, onClose }: TournamentFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    game: '',
    platform: 'Both' as 'Xbox' | 'PlayStation' | 'Both',
    prizePool: 0,
    participants: 0,
    maxParticipants: 64,
    startDate: '',
    endDate: '',
    status: 'upcoming' as 'upcoming' | 'active' | 'finished',
    image: '/img/07b31484-fafc-4615-a8a0-3f3514bc568a.jpg',
    format: '',
    rules: [] as string[]
  });

  const [rulesText, setRulesText] = useState('');

  useEffect(() => {
    if (tournament) {
      setFormData(tournament);
      setRulesText(tournament.rules.join('\n'));
    }
  }, [tournament]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rules = rulesText.split('\n').filter(r => r.trim());
    onSave({ ...formData, rules });
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Название турнира</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="FIFA 24 Championship"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="game">Игра</Label>
          <Input
            id="game"
            value={formData.game}
            onChange={(e) => setFormData({ ...formData, game: e.target.value })}
            placeholder="FIFA 24"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="platform">Платформа</Label>
          <Select
            value={formData.platform}
            onValueChange={(value: 'Xbox' | 'PlayStation' | 'Both') => setFormData({ ...formData, platform: value })}
          >
            <SelectTrigger id="platform">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Xbox">Xbox</SelectItem>
              <SelectItem value="PlayStation">PlayStation</SelectItem>
              <SelectItem value="Both">Обе платформы</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Статус</Label>
          <Select
            value={formData.status}
            onValueChange={(value: 'upcoming' | 'active' | 'finished') => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Предстоящий</SelectItem>
              <SelectItem value="active">Активный</SelectItem>
              <SelectItem value="finished">Завершён</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="format">Формат</Label>
          <Input
            id="format"
            value={formData.format}
            onChange={(e) => setFormData({ ...formData, format: e.target.value })}
            placeholder="Single Elimination"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="prizePool">Призовой фонд (₽)</Label>
          <Input
            id="prizePool"
            type="number"
            value={formData.prizePool}
            onChange={(e) => setFormData({ ...formData, prizePool: parseInt(e.target.value) })}
            placeholder="50000"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="participants">Участников</Label>
          <Input
            id="participants"
            type="number"
            value={formData.participants}
            onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) })}
            placeholder="0"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxParticipants">Макс. участников</Label>
          <Input
            id="maxParticipants"
            type="number"
            value={formData.maxParticipants}
            onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
            placeholder="256"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Дата начала</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">Дата окончания</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">URL изображения</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="/img/tournament.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rules">Правила (каждое с новой строки)</Label>
        <Textarea
          id="rules"
          value={rulesText}
          onChange={(e) => setRulesText(e.target.value)}
          placeholder="Возраст 16+&#10;Без читов&#10;Максимум 3 замены"
          rows={4}
        />
      </div>

      <div className="flex gap-2 justify-end">
        {onClose && (
          <Button type="button" variant="outline" onClick={onClose}>
            Отмена
          </Button>
        )}
        <Button type="submit" className="bg-neon-green text-background hover:bg-neon-green/90">
          <Icon name="Save" size={16} className="mr-2" />
          {tournament ? 'Обновить' : 'Создать'} турнир
        </Button>
      </div>
    </form>
  );
}
