import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface QuickReply {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const defaultReplies: QuickReply[] = [
  {
    id: '1',
    category: 'games',
    question: 'Как купить игру?',
    answer: 'Добавьте игру в корзину, нажав кнопку "Купить". Заполните данные для доставки и выберите способ оплаты. После оплаты мы активируем игру на вашем аккаунте в течение 5-15 минут.'
  },
  {
    id: '2',
    category: 'games',
    question: 'Какие регионы поддерживаются?',
    answer: 'Большинство игр доступны для регионов TR (Турция), IN (Индия), UA (Украина). Уточняйте регион в описании каждой игры.'
  },
  {
    id: '3',
    category: 'games',
    question: 'Могу ли я играть на русском?',
    answer: 'Да! Большинство современных игр поддерживают русский язык в интерфейсе и озвучке. Проверяйте информацию в описании игры.'
  },
  {
    id: '4',
    category: 'games',
    question: 'Нужен ли свой аккаунт?',
    answer: 'Вы можете указать свой аккаунт PlayStation/Xbox при оформлении заказа, или мы создадим новый аккаунт специально для вас.'
  },
  {
    id: '5',
    category: 'games',
    question: 'Как быстро активируют игру?',
    answer: 'Активация происходит в течение 5-15 минут после оплаты. В часы пик может занять до 30 минут. Вы получите уведомление на email.'
  },
  {
    id: '6',
    category: 'subscriptions',
    question: 'Что входит в PS Plus?',
    answer: 'PlayStation Plus включает: каталог из 400+ игр, ежемесячные бесплатные игры, скидки до 80%, облачные сохранения и онлайн-мультиплеер.'
  },
  {
    id: '7',
    category: 'subscriptions',
    question: 'Что такое Xbox Game Pass Ultimate?',
    answer: 'Game Pass Ultimate - это доступ к 100+ играм EA Play, Game Pass для консоли и ПК, облачный гейминг и Xbox Live Gold для онлайн-игр.'
  },
  {
    id: '8',
    category: 'subscriptions',
    question: 'Можно ли продлить подписку?',
    answer: 'Да! Вы можете продлить любую подписку до истечения срока действия. Время суммируется автоматически.'
  },
  {
    id: '9',
    category: 'subscriptions',
    question: 'Отличия PS Plus Essential/Extra/Premium?',
    answer: 'Essential: онлайн-игры + 2 игры/месяц. Extra: +400 игр каталога. Premium: +классика PS1/PS2/PS3, облачный гейминг, пробные версии.'
  },
  {
    id: '10',
    category: 'subscriptions',
    question: 'Что такое EA Play?',
    answer: 'EA Play - подписка с доступом к играм EA (FIFA, Battlefield, Apex Legends), ранним релизам и скидкам 10% на покупки EA.'
  },
  {
    id: '11',
    category: 'payment',
    question: 'Какие способы оплаты?',
    answer: 'Принимаем: банковские карты (Visa/MasterCard/МИР), СБП (QR-код), криптовалюту (USDT/BTC/ETH).'
  },
  {
    id: '12',
    category: 'payment',
    question: 'Есть ли промокоды?',
    answer: 'Да! Используйте промокоды при оформлении заказа для получения скидки до 50%. Актуальные промокоды: WELCOME10, GAME20, VIP30.'
  },
  {
    id: '13',
    category: 'payment',
    question: 'Безопасно ли платить?',
    answer: 'Абсолютно! Все платежи проходят через защищенные платежные шлюзы с 3D Secure. Мы не храним данные ваших карт.'
  },
  {
    id: '14',
    category: 'support',
    question: 'Как связаться с поддержкой?',
    answer: 'Telegram: @GodStoreGame (работаем 24/7), Email: godstoregame@yandex.ru. Средний ответ в течение 5 минут.'
  },
  {
    id: '15',
    category: 'support',
    question: 'Есть ли гарантия?',
    answer: 'Да! Даём гарантию на все игры и подписки. Если возникли проблемы - обращайтесь в поддержку, решим в течение 24 часов.'
  },
  {
    id: '16',
    category: 'support',
    question: 'Можно ли вернуть деньги?',
    answer: 'Возврат возможен до активации игры/подписки. После активации возврат не предусмотрен согласно политике цифровых товаров.'
  }
];

export default function QuickReplies() {
  const [replies, setReplies] = useState<QuickReply[]>(defaultReplies);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const categories = [
    { id: 'all', name: 'Все', icon: 'MessageSquare' },
    { id: 'games', name: 'Игры', icon: 'Gamepad2' },
    { id: 'subscriptions', name: 'Подписки', icon: 'Star' },
    { id: 'payment', name: 'Оплата', icon: 'CreditCard' },
    { id: 'support', name: 'Поддержка', icon: 'Headphones' },
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredReplies = replies.filter(reply => {
    const matchesCategory = activeCategory === 'all' || reply.category === activeCategory;
    const matchesSearch = 
      reply.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reply.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Скопировано!',
      description: 'Ответ скопирован в буфер обмена',
    });
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'games': return 'bg-neon-green';
      case 'subscriptions': return 'bg-neon-pink';
      case 'payment': return 'bg-yellow-500';
      case 'support': return 'bg-neon-purple';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Быстрые ответы</h2>
        <p className="text-sm text-muted-foreground">Готовые ответы на частые вопросы клиентов</p>
      </div>

      <div className="flex flex-col gap-4">
        <Input
          placeholder="🔍 Поиск по вопросам и ответам..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />

        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
              className={activeCategory === cat.id ? 'bg-gradient-to-r from-neon-purple to-neon-pink' : ''}
            >
              <Icon name={cat.icon as any} size={16} className="mr-2" />
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      <ScrollArea className="h-[500px]">
        <div className="grid gap-4">
          {filteredReplies.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="SearchX" size={48} className="mx-auto mb-4 opacity-50" />
              <p>Ничего не найдено</p>
            </div>
          ) : (
            filteredReplies.map((reply) => (
              <Card key={reply.id} className="hover:border-primary/50 transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{reply.question}</CardTitle>
                    <Badge className={`${getCategoryBadgeColor(reply.category)} text-white shrink-0`}>
                      {categories.find(c => c.id === reply.category)?.name}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{reply.answer}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(reply.answer)}
                    className="flex-1"
                  >
                    <Icon name="Copy" size={16} className="mr-2" />
                    Копировать ответ
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(`${reply.question}\n\n${reply.answer}`)}
                  >
                    <Icon name="FileText" size={16} />
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>

      <Card className="bg-gradient-to-br from-neon-purple/10 to-neon-pink/10 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Lightbulb" size={20} className="text-yellow-500" />
            Советы по использованию
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• Используйте поиск для быстрого нахождения нужного ответа</p>
          <p>• Фильтруйте по категориям для удобной навигации</p>
          <p>• Копируйте готовые ответы одним кликом</p>
          <p>• Отправляйте ответы клиентам в Telegram или email</p>
        </CardContent>
      </Card>
    </div>
  );
}
