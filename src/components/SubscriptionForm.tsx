import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Subscription {
  id: number;
  name: string;
  platform: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
}

interface SubscriptionFormProps {
  subscription: Subscription | null;
  onSave: (subscription: Partial<Subscription>) => void;
}

export default function SubscriptionForm({ subscription, onSave }: SubscriptionFormProps) {
  const [formData, setFormData] = useState<Partial<Subscription>>(subscription || {
    name: '',
    platform: 'Xbox',
    price: 0,
    duration: '1 месяц',
    description: '',
    features: []
  });

  const [newFeature, setNewFeature] = useState('');

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: (formData.features || []).filter((_, i) => i !== index)
    });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{subscription ? 'Редактировать подписку' : 'Добавить подписку'}</DialogTitle>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-4 pr-4">
          <div>
            <Label>Название</Label>
            <Input 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Цена (₽)</Label>
              <Input 
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label>Длительность</Label>
              <Select value={formData.duration} onValueChange={(v) => setFormData({ ...formData, duration: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 месяц">1 месяц</SelectItem>
                  <SelectItem value="3 месяца">3 месяца</SelectItem>
                  <SelectItem value="6 месяцев">6 месяцев</SelectItem>
                  <SelectItem value="12 месяцев">12 месяцев</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Описание</Label>
            <Textarea 
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div>
            <Label>Функции</Label>
            <div className="space-y-2">
              {(formData.features || []).map((feature, index) => (
                <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded">
                  <span className="flex-1 text-sm">{feature}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFeature(index)}
                  >
                    <Icon name="X" size={14} />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input 
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Добавить функцию"
                  onKeyDown={(e) => e.key === 'Enter' && addFeature()}
                />
                <Button onClick={addFeature} variant="outline">
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
      <DialogFooter className="mt-4">
        <Button onClick={handleSubmit} className="bg-neon-pink text-white">
          Сохранить
        </Button>
      </DialogFooter>
    </>
  );
}
