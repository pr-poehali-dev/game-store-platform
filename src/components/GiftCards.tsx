import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const GIFT_CARD_AMOUNTS = [1000, 2000, 3000, 5000, 10000];

const GIFT_TEMPLATES = [
  {
    id: 'birthday',
    name: 'День рождения',
    icon: 'Cake',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 'holiday',
    name: 'Праздник',
    icon: 'Gift',
    gradient: 'from-red-500 to-orange-500',
  },
  {
    id: 'congratulation',
    name: 'Поздравление',
    icon: 'PartyPopper',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'thanks',
    name: 'Благодарность',
    icon: 'Heart',
    gradient: 'from-blue-500 to-cyan-500',
  },
];

export const GiftCards = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(3000);
  const [customAmount, setCustomAmount] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('birthday');
  const [activateCode, setActivateCode] = useState('');

  const handleBuyGiftCard = () => {
    const amount = customAmount ? parseInt(customAmount) : selectedAmount;

    if (!recipientEmail || !recipientName) {
      toast({
        title: 'Заполните все поля',
        description: 'Укажите email и имя получателя',
        variant: 'destructive',
      });
      return;
    }

    if (amount < 500 || amount > 50000) {
      toast({
        title: 'Неверная сумма',
        description: 'Сумма должна быть от 500₽ до 50,000₽',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: '🎁 Подарочная карта отправлена!',
      description: `${amount}₽ отправлено на ${recipientEmail}`,
    });
    setIsOpen(false);
  };

  const handleActivateCode = () => {
    if (!activateCode) {
      toast({
        title: 'Введите код',
        description: 'Код подарочной карты не может быть пустым',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: '✅ Код активирован!',
      description: '3000₽ добавлено на ваш баланс',
    });
    setActivateCode('');
  };

  const selectedTemplateData = GIFT_TEMPLATES.find(
    (t) => t.id === selectedTemplate
  );

  return (
    <div className="flex gap-2">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Icon name="Gift" size={18} className="mr-2" />
            Подарочные карты
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Подарочные карты</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div
              className={`bg-gradient-to-br ${selectedTemplateData?.gradient} rounded-xl p-6 text-white relative overflow-hidden`}
            >
              <div className="absolute top-4 right-4 opacity-20">
                <Icon
                  name={selectedTemplateData?.icon as any}
                  size={100}
                />
              </div>
              <div className="relative">
                <div className="text-sm opacity-80 mb-2">
                  Подарочная карта
                </div>
                <div className="text-4xl font-bold mb-4">
                  {customAmount || selectedAmount} ₽
                </div>
                <div className="text-sm">
                  <div>Для: {recipientName || 'Получатель'}</div>
                  <div className="opacity-80 mt-1">
                    {message || 'Сообщение появится здесь'}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label>Выберите дизайн</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                {GIFT_TEMPLATES.map((template) => (
                  <div
                    key={template.id}
                    className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div
                      className={`w-full aspect-video bg-gradient-to-br ${template.gradient} rounded-md flex items-center justify-center mb-2`}
                    >
                      <Icon
                        name={template.icon as any}
                        size={32}
                        className="text-white"
                      />
                    </div>
                    <div className="text-xs text-center font-medium">
                      {template.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Сумма подарка</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {GIFT_CARD_AMOUNTS.map((amount) => (
                  <Button
                    key={amount}
                    variant={
                      selectedAmount === amount && !customAmount
                        ? 'default'
                        : 'outline'
                    }
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                  >
                    {amount.toLocaleString('ru-RU')} ₽
                  </Button>
                ))}
              </div>
              <div className="mt-3">
                <Label className="text-sm text-muted-foreground">
                  Или введите свою сумму (500-50,000₽)
                </Label>
                <Input
                  type="number"
                  placeholder="Например, 7500"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Имя получателя</Label>
                <Input
                  placeholder="Алексей"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Email получателя</Label>
                <Input
                  type="email"
                  placeholder="recipient@example.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label>Поздравительное сообщение</Label>
              <Textarea
                placeholder="Напишите тёплые слова..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2 min-h-[100px]"
                maxLength={500}
              />
              <div className="text-xs text-muted-foreground mt-1 text-right">
                {message.length}/500
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={20} className="text-primary mt-0.5" />
                <div className="text-sm space-y-1">
                  <p>
                    • Получатель получит письмо с кодом активации на
                    указанный email
                  </p>
                  <p>
                    • Код можно активировать в течение 1 года с момента
                    покупки
                  </p>
                  <p>
                    • После активации средства зачисляются на баланс
                    кошелька
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleBuyGiftCard}
                className="flex-1"
                size="lg"
              >
                <Icon name="ShoppingCart" size={18} className="mr-2" />
                Купить и отправить
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                size="lg"
              >
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Icon name="Ticket" size={18} className="mr-2" />
            Активировать код
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Активация подарочной карты</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Код подарочной карты</Label>
              <Input
                placeholder="XXXX-XXXX-XXXX-XXXX"
                value={activateCode}
                onChange={(e) =>
                  setActivateCode(e.target.value.toUpperCase())
                }
                className="mt-2 font-mono"
                maxLength={19}
              />
            </div>

            <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
              <Icon name="Info" size={16} className="inline mr-2" />
              Введите 16-значный код из письма или PDF-сертификата
            </div>

            <Button
              onClick={handleActivateCode}
              className="w-full"
              size="lg"
            >
              <Icon name="Check" size={18} className="mr-2" />
              Активировать
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
