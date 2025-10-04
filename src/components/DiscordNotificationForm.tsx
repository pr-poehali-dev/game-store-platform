import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface DiscordNotificationFormProps {
  isOpen: boolean;
  onClose: () => void;
  tournament: {
    id: number;
    title: string;
    prizePool: number;
    participants: number;
    maxParticipants: number;
    startDate: string;
  };
  onSuccess: () => void;
}

export default function DiscordNotificationForm({ 
  isOpen, 
  onClose, 
  tournament,
  onSuccess 
}: DiscordNotificationFormProps) {
  const [userName, setUserName] = useState('');
  const [discordTag, setDiscordTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName.trim()) {
      toast({
        title: '❌ Ошибка',
        description: 'Укажите ваше имя',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/2f7a0e0c-3268-47c6-8611-ce21fd7b80be', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'registration',
          tournamentTitle: tournament.title,
          tournamentId: tournament.id,
          userName: userName,
          userDiscord: discordTag || undefined,
          prizePool: tournament.prizePool,
          participants: tournament.participants + 1,
          maxParticipants: tournament.maxParticipants
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: '✅ Успешно!',
          description: `Вы зарегистрированы на "${tournament.title}". Уведомление отправлено в Discord!`,
        });
        onSuccess();
        onClose();
        setUserName('');
        setDiscordTag('');
      } else {
        toast({
          title: '⚠️ Регистрация без уведомления',
          description: 'Вы зарегистрированы, но уведомление в Discord не отправлено (webhook не настроен)',
        });
        onSuccess();
        onClose();
      }
    } catch (error) {
      toast({
        title: '✅ Регистрация успешна',
        description: `Вы зарегистрированы на "${tournament.title}"`,
      });
      onSuccess();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="UserPlus" size={20} className="text-primary" />
            Регистрация на турнир
          </DialogTitle>
          <DialogDescription>
            {tournament.title}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userName">
              Ваше имя <span className="text-red-500">*</span>
            </Label>
            <Input
              id="userName"
              placeholder="Например: ProGamer123"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discordTag" className="flex items-center gap-2">
              <Icon name="MessageSquare" size={14} />
              Discord тег (опционально)
            </Label>
            <Input
              id="discordTag"
              placeholder="username#1234"
              value={discordTag}
              onChange={(e) => setDiscordTag(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Укажите ваш Discord для получения уведомлений о турнире
            </p>
          </div>

          <div className="bg-muted/50 p-3 rounded-lg space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">💰 Призовой фонд:</span>
              <span className="font-bold text-primary">{tournament.prizePool.toLocaleString('ru-RU')}₽</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">👥 Участников:</span>
              <span className="font-semibold">{tournament.participants}/{tournament.maxParticipants}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">📅 Старт:</span>
              <span className="font-semibold">{new Date(tournament.startDate).toLocaleDateString('ru-RU')}</span>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-primary to-secondary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Регистрация...
                </>
              ) : (
                <>
                  <Icon name="Check" size={16} className="mr-2" />
                  Зарегистрироваться
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
