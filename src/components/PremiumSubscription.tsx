import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const PREMIUM_FEATURES = [
  {
    icon: 'Gift',
    title: 'Бесплатная игра каждый месяц',
    description: 'Выбирай из каталога игр стоимостью до 3000₽',
  },
  {
    icon: 'Tag',
    title: 'Эксклюзивная скидка -15%',
    description: 'На все игры в магазине без ограничений',
  },
  {
    icon: 'Clock',
    title: 'Ранний доступ к скидкам',
    description: 'Узнавай о распродажах за 24 часа до всех',
  },
  {
    icon: 'Headphones',
    title: 'Приоритетная поддержка',
    description: 'Ответ от службы поддержки за 1 час',
  },
  {
    icon: 'Trophy',
    title: 'Закрытые турниры',
    description: 'Участвуй в эксклюзивных соревнованиях',
  },
  {
    icon: 'Coins',
    title: '+10% баллов ко всем покупкам',
    description: 'Копи баллы быстрее на будущие покупки',
  },
  {
    icon: 'Crown',
    title: 'Эксклюзивный значок',
    description: 'VIP статус на профиле и в турнирах',
  },
  {
    icon: 'Zap',
    title: 'Доступ к бета-версиям',
    description: 'Первым пробуй новые функции магазина',
  },
];

const SUBSCRIPTION_PLANS = [
  {
    id: 'monthly',
    name: 'Месячная',
    price: 499,
    period: 'месяц',
    savings: 0,
    popular: false,
  },
  {
    id: 'yearly',
    name: 'Годовая',
    price: 4990,
    period: 'год',
    savings: 20,
    popular: true,
    pricePerMonth: 416,
  },
];

export const PremiumSubscription = () => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubscribe = () => {
    const plan = SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlan);
    toast({
      title: '🎉 Подписка оформлена!',
      description: `Вы подписались на тариф "${plan?.name}"`,
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <Icon name="Crown" size={18} className="mr-2" />
          Стать Premium
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Icon name="Crown" size={24} className="text-yellow-500" />
            <DialogTitle className="text-2xl">
              Premium подписка
            </DialogTitle>
          </div>
          <p className="text-muted-foreground">
            Получи максимум выгоды от покупок игр
          </p>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Icon name="Sparkles" size={20} className="text-yellow-500" />
              Что входит в подписку?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PREMIUM_FEATURES.map((feature, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon
                      name={feature.icon as any}
                      size={20}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{feature.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Выберите тариф</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SUBSCRIPTION_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  } ${plan.popular ? 'relative' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <Badge
                      className="absolute -top-3 left-1/2 -translate-x-1/2"
                      variant="default"
                    >
                      Выгоднее всего
                    </Badge>
                  )}
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-lg">{plan.name}</h4>
                      <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-3xl font-bold">
                          {plan.price}
                        </span>
                        <span className="text-muted-foreground">₽</span>
                        <span className="text-sm text-muted-foreground">
                          / {plan.period}
                        </span>
                      </div>
                      {plan.pricePerMonth && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {plan.pricePerMonth}₽ в месяц
                        </div>
                      )}
                    </div>

                    {plan.savings > 0 && (
                      <Badge variant="secondary" className="w-full justify-center">
                        <Icon name="TrendingDown" size={14} className="mr-1" />
                        Экономия {plan.savings}%
                      </Badge>
                    )}

                    <div className="pt-3 border-t space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-green-500" />
                        <span>Все Premium функции</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-green-500" />
                        <span>Отмена в любой момент</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-green-500" />
                        <span>Безопасная оплата</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-6 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Icon name="Calculator" size={18} />
              Ваша выгода с Premium
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Стоимость подписки (год):
                </span>
                <span className="font-medium">4,990₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Бесплатные игры (12 × 2500₽):
                </span>
                <span className="font-medium text-green-600">
                  +30,000₽
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Скидки 15% (при покупках 20,000₽):
                </span>
                <span className="font-medium text-green-600">
                  +3,000₽
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg">
                <span className="font-semibold">Итого экономия:</span>
                <span className="font-bold text-green-600">
                  ~28,000₽
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSubscribe} className="flex-1" size="lg">
              <Icon name="Crown" size={18} className="mr-2" />
              Оформить подписку
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              size="lg"
            >
              Позже
            </Button>
          </div>

          <div className="text-xs text-center text-muted-foreground">
            Подписка продлевается автоматически. Отменить можно в любой
            момент в настройках профиля.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
