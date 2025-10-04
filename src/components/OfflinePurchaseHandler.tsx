import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { savePendingPurchase, type PendingPurchase } from '@/utils/backgroundSync';

interface OfflinePurchaseHandlerProps {
  onPurchaseAttempt?: (purchase: Omit<PendingPurchase, 'id' | 'timestamp'>) => void;
}

export default function OfflinePurchaseHandler({ onPurchaseAttempt }: OfflinePurchaseHandlerProps) {
  const { toast } = useToast();

  useEffect(() => {
    const handleOfflinePurchase = async (event: CustomEvent) => {
      const purchase = event.detail;

      if (!navigator.onLine) {
        await savePendingPurchase(purchase);
        
        toast({
          title: '📦 Покупка сохранена',
          description: 'Нет подключения к интернету. Покупка будет отправлена при восстановлении связи.',
        });

        if (onPurchaseAttempt) {
          onPurchaseAttempt(purchase);
        }
      }
    };

    window.addEventListener('offline-purchase' as any, handleOfflinePurchase);

    return () => {
      window.removeEventListener('offline-purchase' as any, handleOfflinePurchase);
    };
  }, [toast, onPurchaseAttempt]);

  return null;
}

export function triggerOfflinePurchase(purchase: Omit<PendingPurchase, 'id' | 'timestamp'>) {
  const event = new CustomEvent('offline-purchase', { detail: purchase });
  window.dispatchEvent(event);
}
