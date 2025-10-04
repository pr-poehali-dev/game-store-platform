import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface PaymentMethodsProps {
  total: number;
  onPayment: (method: string) => void;
}

const PAYMENT_METHODS = [
  {
    id: 'sbp',
    name: 'Система Быстрых Платежей (СБП)',
    icon: 'Smartphone',
    description: 'Мгновенная оплата через QR-код',
    fee: 0,
    badge: 'Популярно',
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    icon: 'Apple',
    description: 'Оплата в 1 клик',
    fee: 0,
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    icon: 'Smartphone',
    description: 'Быстрая оплата',
    fee: 0,
  },
  {
    id: 'card',
    name: 'Банковская карта',
    icon: 'CreditCard',
    description: 'Visa, Mastercard, МИР',
    fee: 0,
  },
  {
    id: 'wallet',
    name: 'Баланс кошелька',
    icon: 'Wallet',
    description: 'Используйте средства кошелька',
    fee: 0,
    badge: 'Без комиссии',
  },
] as const;

export const PaymentMethods = ({
  total,
  onPayment,
}: PaymentMethodsProps) => {
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState<string>('sbp');
  const [walletBalance] = useState(5000);

  const handlePayment = () => {
    if (selectedMethod === 'wallet' && walletBalance < total) {
      toast({
        title: 'Недостаточно средств',
        description: 'Пополните баланс кошелька',
        variant: 'destructive',
      });
      return;
    }

    onPayment(selectedMethod);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Способ оплаты</h3>

        <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
          <div className="space-y-3">
            {PAYMENT_METHODS.map((method) => (
              <div
                key={method.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-primary/50'
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex items-center gap-4">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon name={method.icon as any} size={20} />
                      <Label
                        htmlFor={method.id}
                        className="font-medium cursor-pointer"
                      >
                        {method.name}
                      </Label>
                      {method.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {method.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {method.description}
                    </p>
                    {method.id === 'wallet' && (
                      <p className="text-sm text-primary mt-1">
                        Доступно: {walletBalance.toLocaleString('ru-RU')} ₽
                      </p>
                    )}
                  </div>
                  {method.fee > 0 && (
                    <span className="text-sm text-muted-foreground">
                      +{method.fee}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className="bg-muted/30 rounded-lg p-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Сумма заказа:</span>
          <span className="font-medium">
            {total.toLocaleString('ru-RU')} ₽
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Комиссия:</span>
          <span className="font-medium">0 ₽</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Итого к оплате:</span>
            <span className="text-xl font-bold">
              {total.toLocaleString('ru-RU')} ₽
            </span>
          </div>
        </div>
      </div>

      <Button onClick={handlePayment} className="w-full" size="lg">
        <Icon name="Lock" size={18} className="mr-2" />
        Оплатить {total.toLocaleString('ru-RU')} ₽
      </Button>

      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Icon name="Shield" size={14} />
          <span>Безопасная оплата</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name="Lock" size={14} />
          <span>SSL шифрование</span>
        </div>
      </div>
    </div>
  );
};
