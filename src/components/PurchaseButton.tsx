import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { savePendingPurchase } from '@/utils/backgroundSync';

interface PurchaseButtonProps {
  gameId: number;
  gameName: string;
  price: number;
  onPurchase?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function PurchaseButton({
  gameId,
  gameName,
  price,
  onPurchase,
  className = '',
  disabled = false,
}: PurchaseButtonProps) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { toast } = useToast();

  const handlePurchase = async () => {
    if (disabled || isPurchasing) return;

    setIsPurchasing(true);

    try {
      if (!navigator.onLine) {
        await savePendingPurchase({
          gameId,
          gameName,
          price,
          userId: 1,
          paymentMethod: 'card',
        });

        toast({
          title: '📦 Покупка сохранена',
          description: 'Нет подключения к интернету. Покупка будет отправлена при восстановлении связи.',
        });

        if (onPurchase) {
          onPurchase();
        }

        return;
      }

      const response = await fetch('/api/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          game_id: gameId,
          user_id: 1,
          payment_method: 'card',
          amount: price,
        }),
      });

      if (!response.ok) {
        if (response.status >= 500) {
          await savePendingPurchase({
            gameId,
            gameName,
            price,
            userId: 1,
            paymentMethod: 'card',
          });

          toast({
            title: '📦 Покупка сохранена',
            description: 'Сервер временно недоступен. Покупка будет отправлена позже.',
          });

          if (onPurchase) {
            onPurchase();
          }

          return;
        }

        throw new Error(`HTTP ${response.status}`);
      }

      toast({
        title: '✅ Покупка успешна!',
        description: `Игра "${gameName}" добавлена в библиотеку`,
      });

      if (onPurchase) {
        onPurchase();
      }

    } catch (error) {
      console.error('Ошибка покупки:', error);

      await savePendingPurchase({
        gameId,
        gameName,
        price,
        userId: 1,
        paymentMethod: 'card',
      });

      toast({
        title: '📦 Покупка сохранена',
        description: 'Произошла ошибка. Покупка будет отправлена автоматически.',
      });

      if (onPurchase) {
        onPurchase();
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <Button
      onClick={handlePurchase}
      disabled={disabled || isPurchasing}
      className={className}
    >
      {isPurchasing ? (
        <>
          <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
          Обработка...
        </>
      ) : (
        <>
          <Icon name="ShoppingCart" size={16} className="mr-2" />
          Купить за {price}₽
        </>
      )}
    </Button>
  );
}
