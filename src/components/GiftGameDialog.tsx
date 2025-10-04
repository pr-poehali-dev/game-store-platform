import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { Game } from '@/types';

interface GiftGameDialogProps {
  game: Game;
  userId: number;
}

export default function GiftGameDialog({ game, userId }: GiftGameDialogProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [giftCode, setGiftCode] = useState('');

  const handleSendGift = async () => {
    if (!email || !email.includes('@')) {
      toast.error('Введите корректный email');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://functions.poehali.dev/22aca520-7090-427a-b156-8c45e64827bf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId.toString()
        },
        body: JSON.stringify({
          game_id: game.id,
          recipient_email: email,
          message: message
        })
      });

      const data = await res.json();
      setGiftCode(data.gift_code);
      toast.success('Подарок отправлен! Код: ' + data.gift_code);
    } catch (error) {
      toast.error('Ошибка при отправке подарка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Icon name="Gift" size={16} />
          Подарить другу
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Подарить игру: {game.title}</DialogTitle>
        </DialogHeader>

        {!giftCode ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email получателя</Label>
              <Input
                id="email"
                type="email"
                placeholder="friend@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="message">Сообщение (необязательно)</Label>
              <Textarea
                id="message"
                placeholder="Поздравляю с днём рождения! Наслаждайся игрой!"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
            </div>

            <div className="bg-muted p-3 rounded-lg text-sm">
              <div className="flex justify-between mb-1">
                <span>Цена игры:</span>
                <span className="font-bold">{game.price} ₽</span>
              </div>
              {game.discount && game.discount > 0 && (
                <div className="flex justify-between text-green-500">
                  <span>Скидка:</span>
                  <span>-{game.discount}%</span>
                </div>
              )}
            </div>

            <Button onClick={handleSendGift} disabled={loading} className="w-full">
              {loading ? 'Отправка...' : 'Отправить подарок'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <div className="text-6xl">🎁</div>
            <div>
              <h3 className="font-bold text-lg mb-2">Подарок отправлен!</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Получатель получит письмо с подарочным кодом
              </p>
              <div className="bg-neon-purple/10 border border-neon-purple/30 rounded-lg p-4">
                <div className="text-xs text-muted-foreground mb-1">Подарочный код:</div>
                <div className="text-2xl font-mono font-bold text-neon-purple">
                  {giftCode}
                </div>
              </div>
            </div>
            <Button onClick={() => setOpen(false)} className="w-full">
              Закрыть
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
