import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface PromoCode {
  code: string;
  discount_percent: number;
  description: string;
  valid_until: string | null;
  max_uses: number | null;
  current_uses: number;
  is_active: boolean;
}

export default function PromoCodesManager() {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { toast } = useToast();

  const [newPromo, setNewPromo] = useState({
    code: '',
    discount: 10,
    description: '',
    maxUses: 100,
    validDays: 30,
  });

  useEffect(() => {
    loadPromoCodes();
  }, []);

  const loadPromoCodes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/937dbb3b-6c25-4f23-b3e2-27bca4627638');
      const data = await response.json();
      if (data.promos) {
        setPromoCodes(data.promos);
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить промокоды',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Без ограничений';
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const getUsagePercent = (current: number, max: number | null) => {
    if (!max) return 0;
    return Math.round((current / max) * 100);
  };

  const isExpired = (dateStr: string | null) => {
    if (!dateStr) return false;
    return new Date(dateStr) < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Управление промокодами</h2>
          <p className="text-sm text-muted-foreground">Создавайте и отслеживайте промокоды для скидок</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-neon-purple to-neon-pink">
              <Icon name="Plus" size={20} className="mr-2" />
              Создать промокод
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новый промокод</DialogTitle>
              <DialogDescription>
                Создайте промокод для предоставления скидки клиентам
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Код промокода</Label>
                <Input
                  placeholder="GAME20"
                  value={newPromo.code}
                  onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value.toUpperCase() })}
                  className="uppercase"
                />
              </div>
              <div>
                <Label>Скидка (%)</Label>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={newPromo.discount}
                  onChange={(e) => setNewPromo({ ...newPromo, discount: parseInt(e.target.value) || 10 })}
                />
              </div>
              <div>
                <Label>Описание</Label>
                <Input
                  placeholder="Скидка 20% на все игры"
                  value={newPromo.description}
                  onChange={(e) => setNewPromo({ ...newPromo, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Макс. использований</Label>
                  <Input
                    type="number"
                    min="1"
                    value={newPromo.maxUses}
                    onChange={(e) => setNewPromo({ ...newPromo, maxUses: parseInt(e.target.value) || 100 })}
                  />
                </div>
                <div>
                  <Label>Действителен (дней)</Label>
                  <Input
                    type="number"
                    min="1"
                    value={newPromo.validDays}
                    onChange={(e) => setNewPromo({ ...newPromo, validDays: parseInt(e.target.value) || 30 })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  toast({
                    title: 'Функция в разработке',
                    description: 'Создание промокодов через интерфейс будет доступно в следующей версии. Промокоды добавляются через SQL.',
                  });
                  setIsCreateOpen(false);
                }}
                className="bg-gradient-to-r from-neon-green to-neon-purple"
              >
                Создать
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Icon name="Loader2" size={48} className="animate-spin text-primary" />
        </div>
      ) : (
        <ScrollArea className="h-[600px]">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {promoCodes.map((promo) => {
              const expired = isExpired(promo.valid_until);
              const usagePercent = getUsagePercent(promo.current_uses, promo.max_uses);
              const isAlmostFull = usagePercent > 80;
              
              return (
                <Card key={promo.code} className={`${expired ? 'opacity-60' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl font-mono">{promo.code}</CardTitle>
                        <CardDescription className="mt-1">{promo.description}</CardDescription>
                      </div>
                      <Badge className={`${promo.is_active && !expired ? 'bg-green-600' : 'bg-red-600'}`}>
                        {expired ? 'Истёк' : promo.is_active ? 'Активен' : 'Неактивен'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Скидка</span>
                      <span className="font-bold text-neon-green text-lg">-{promo.discount_percent}%</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Использований</span>
                      <span className={isAlmostFull ? 'text-red-500 font-semibold' : ''}>
                        {promo.current_uses} / {promo.max_uses || '∞'}
                      </span>
                    </div>
                    
                    {promo.max_uses && (
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            isAlmostFull ? 'bg-red-500' : 'bg-neon-green'
                          }`}
                          style={{ width: `${Math.min(usagePercent, 100)}%` }}
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm pt-2 border-t">
                      <span className="text-muted-foreground">Действителен до</span>
                      <span className={expired ? 'text-red-500' : ''}>
                        {formatDate(promo.valid_until)}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        navigator.clipboard.writeText(promo.code);
                        toast({
                          title: 'Скопировано!',
                          description: `Промокод ${promo.code} скопирован`,
                        });
                      }}
                    >
                      <Icon name="Copy" size={16} className="mr-1" />
                      Копировать
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      )}

      {!isLoading && promoCodes.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Icon name="Tag" size={48} className="mx-auto mb-4 opacity-50" />
          <p>Промокодов пока нет</p>
        </div>
      )}
    </div>
  );
}
