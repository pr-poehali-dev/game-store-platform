import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface PromoCode {
  code: string;
  type: 'percent' | 'fixed' | 'bundle' | 'firstPurchase' | 'referral';
  discount: number;
  description: string;
  expiresAt?: Date;
  minPurchase?: number;
  maxDiscount?: number;
  usesLeft?: number;
  active: boolean;
}

interface PromoCodeSystemProps {
  cartTotal: number;
  onApplyPromo: (discount: number, code: string) => void;
  isFirstPurchase?: boolean;
  itemsCount?: number;
}

const AVAILABLE_PROMO_CODES: PromoCode[] = [
  {
    code: 'WELCOME15',
    type: 'firstPurchase',
    discount: 15,
    description: 'Скидка 15% на первую покупку',
    active: true,
    minPurchase: 1000,
  },
  {
    code: 'SALE30',
    type: 'percent',
    discount: 30,
    description: 'Летняя распродажа -30%',
    expiresAt: new Date('2025-12-31'),
    active: true,
    minPurchase: 2000,
    maxDiscount: 2000,
  },
  {
    code: 'BUNDLE20',
    type: 'bundle',
    discount: 20,
    description: 'Купи 3+ игры, получи -20%',
    active: true,
  },
  {
    code: 'FRIEND500',
    type: 'referral',
    discount: 500,
    description: '+500₽ за приглашённого друга',
    active: true,
    usesLeft: 5,
  },
  {
    code: 'BLOGGER15',
    type: 'percent',
    discount: 15,
    description: 'Промокод от блогера',
    expiresAt: new Date('2025-11-30'),
    active: true,
  },
];

const FLASH_SALES = [
  {
    title: 'Только сегодня!',
    discount: 25,
    endsAt: new Date(Date.now() + 6 * 60 * 60 * 1000),
    icon: 'Zap',
  },
  {
    title: 'Выходные -40%',
    discount: 40,
    endsAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
    icon: 'Calendar',
  },
];

export const PromoCodeSystem = ({
  cartTotal,
  onApplyPromo,
  isFirstPurchase = false,
  itemsCount = 0,
}: PromoCodeSystemProps) => {
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft: { [key: number]: string } = {};
      FLASH_SALES.forEach((sale, index) => {
        const diff = sale.endsAt.getTime() - Date.now();
        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          newTimeLeft[index] = `${hours}ч ${minutes}м`;
        } else {
          newTimeLeft[index] = 'Завершена';
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleApplyPromo = () => {
    const code = AVAILABLE_PROMO_CODES.find(
      (p) => p.code.toUpperCase() === promoCode.toUpperCase() && p.active
    );

    if (!code) {
      toast({
        title: 'Неверный промокод',
        description: 'Проверьте код и попробуйте снова',
        variant: 'destructive',
      });
      return;
    }

    if (code.type === 'firstPurchase' && !isFirstPurchase) {
      toast({
        title: 'Промокод недоступен',
        description: 'Этот промокод только для первой покупки',
        variant: 'destructive',
      });
      return;
    }

    if (code.minPurchase && cartTotal < code.minPurchase) {
      toast({
        title: 'Минимальная сумма не достигнута',
        description: `Минимальная сумма заказа: ${code.minPurchase}₽`,
        variant: 'destructive',
      });
      return;
    }

    if (code.type === 'bundle' && itemsCount < 3) {
      toast({
        title: 'Условия не выполнены',
        description: 'Добавьте минимум 3 игры в корзину',
        variant: 'destructive',
      });
      return;
    }

    if (code.expiresAt && code.expiresAt < new Date()) {
      toast({
        title: 'Промокод истёк',
        description: 'Этот промокод больше не действителен',
        variant: 'destructive',
      });
      return;
    }

    let discountAmount = 0;
    if (code.type === 'percent') {
      discountAmount = Math.round((cartTotal * code.discount) / 100);
      if (code.maxDiscount) {
        discountAmount = Math.min(discountAmount, code.maxDiscount);
      }
    } else if (code.type === 'fixed' || code.type === 'referral') {
      discountAmount = code.discount;
    } else if (code.type === 'bundle' || code.type === 'firstPurchase') {
      discountAmount = Math.round((cartTotal * code.discount) / 100);
    }

    setAppliedPromo(code);
    onApplyPromo(discountAmount, code.code);

    toast({
      title: '✅ Промокод применён!',
      description: `Скидка ${discountAmount}₽`,
    });
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    onApplyPromo(0, '');
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex gap-2">
          <Input
            placeholder="Введите промокод"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            disabled={!!appliedPromo}
            onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
          />
          {appliedPromo ? (
            <Button variant="outline" onClick={handleRemovePromo}>
              <Icon name="X" size={18} />
            </Button>
          ) : (
            <Button onClick={handleApplyPromo}>Применить</Button>
          )}
        </div>

        {appliedPromo && (
          <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
            <Icon name="Check" size={16} />
            <span>
              Применён: {appliedPromo.code} (-
              {appliedPromo.type === 'percent'
                ? `${appliedPromo.discount}%`
                : `${appliedPromo.discount}₽`}
              )
            </span>
          </div>
        )}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Icon name="Tag" size={18} className="mr-2" />
            Доступные промокоды
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Активные промокоды и акции</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="Zap" size={18} className="text-orange-500" />
                Срочные акции
              </h3>
              <div className="space-y-3">
                {FLASH_SALES.map((sale, index) => (
                  <div
                    key={index}
                    className="border border-orange-500/30 bg-orange-500/5 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon
                          name={sale.icon as any}
                          size={20}
                          className="text-orange-500"
                        />
                        <span className="font-semibold">{sale.title}</span>
                      </div>
                      <Badge variant="destructive">
                        -{sale.discount}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Clock" size={14} />
                      <span>
                        Осталось: {timeLeft[index] || 'Загрузка...'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="Ticket" size={18} className="text-primary" />
                Промокоды
              </h3>
              <div className="space-y-3">
                {AVAILABLE_PROMO_CODES.filter((p) => p.active).map(
                  (promo) => (
                    <div
                      key={promo.code}
                      className="border rounded-lg p-4 hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <code className="bg-primary/10 px-2 py-1 rounded text-sm font-mono font-semibold">
                              {promo.code}
                            </code>
                            {promo.type === 'firstPurchase' && (
                              <Badge variant="secondary">
                                Первая покупка
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {promo.description}
                          </p>
                        </div>
                        <Badge>
                          {promo.type === 'percent'
                            ? `-${promo.discount}%`
                            : `-${promo.discount}₽`}
                        </Badge>
                      </div>

                      {promo.minPurchase && (
                        <div className="text-xs text-muted-foreground mt-2">
                          Минимальная сумма: {promo.minPurchase}₽
                        </div>
                      )}

                      {promo.expiresAt && (
                        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Icon name="Calendar" size={12} />
                          До{' '}
                          {promo.expiresAt.toLocaleDateString('ru-RU')}
                        </div>
                      )}

                      {promo.usesLeft && (
                        <div className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                          <Icon name="AlertCircle" size={12} />
                          Осталось использований: {promo.usesLeft}
                        </div>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-3 w-full"
                        onClick={() => {
                          setPromoCode(promo.code);
                          toast({
                            title: 'Промокод скопирован',
                            description: `${promo.code} добавлен в поле ввода`,
                          });
                        }}
                      >
                        Скопировать код
                      </Button>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Gift" size={20} className="text-purple-500" />
                <h4 className="font-semibold">Реферальная программа</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Приглашай друзей и получай по 500₽ за каждого! Твой друг
                тоже получит скидку 15% на первую покупку.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Icon name="Share2" size={16} className="mr-2" />
                Пригласить друга
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
