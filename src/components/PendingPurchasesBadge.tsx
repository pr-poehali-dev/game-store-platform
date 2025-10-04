import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { 
  getPendingPurchases, 
  getPendingPurchasesCount, 
  syncPendingPurchases,
  clearPendingPurchases,
  type PendingPurchase 
} from '@/utils/backgroundSync';

export default function PendingPurchasesBadge() {
  const [count, setCount] = useState(0);
  const [purchases, setPurchases] = useState<PendingPurchase[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPendingPurchases();

    const interval = setInterval(loadPendingPurchases, 5000);

    window.addEventListener('online', handleOnline);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  const loadPendingPurchases = async () => {
    const pendingCount = await getPendingPurchasesCount();
    setCount(pendingCount);
    
    if (isOpen) {
      const pendingList = await getPendingPurchases();
      setPurchases(pendingList);
    }
  };

  const handleOnline = async () => {
    const pendingCount = await getPendingPurchasesCount();
    if (pendingCount > 0) {
      toast({
        title: '🌐 Сеть восстановлена',
        description: `Синхронизация ${pendingCount} отложенных покупок...`,
      });
      await handleSync();
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    
    try {
      const result = await syncPendingPurchases();
      
      if (result.success > 0) {
        toast({
          title: '✅ Синхронизация завершена',
          description: result.failed > 0
            ? `Отправлено ${result.success} покупок, ${result.failed} не удалось`
            : `Все покупки отправлены (${result.success})`,
        });
      } else if (result.failed > 0) {
        toast({
          title: '❌ Ошибка синхронизации',
          description: `Не удалось отправить ${result.failed} покупок`,
          variant: 'destructive',
        });
      }
      
      await loadPendingPurchases();
    } catch (error) {
      toast({
        title: '❌ Ошибка',
        description: 'Не удалось синхронизировать покупки',
        variant: 'destructive',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleClear = async () => {
    await clearPendingPurchases();
    await loadPendingPurchases();
    setIsOpen(false);
    
    toast({
      title: 'Очищено',
      description: 'Все отложенные покупки удалены',
    });
  };

  const handleOpenDialog = async () => {
    setIsOpen(true);
    const pendingList = await getPendingPurchases();
    setPurchases(pendingList);
  };

  if (count === 0) {
    return null;
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="relative border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
        onClick={handleOpenDialog}
      >
        <Icon name="Clock" size={16} className="mr-2" />
        Отложенные покупки
        <Badge 
          variant="destructive" 
          className="ml-2 bg-amber-500 hover:bg-amber-600"
        >
          {count}
        </Badge>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Clock" size={24} />
              Отложенные покупки
            </DialogTitle>
            <DialogDescription>
              Покупки, ожидающие отправки на сервер
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                onClick={handleSync}
                disabled={isSyncing || !navigator.onLine}
                className="flex-1"
              >
                {isSyncing ? (
                  <>
                    <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                    Синхронизация...
                  </>
                ) : (
                  <>
                    <Icon name="RefreshCw" size={16} className="mr-2" />
                    Синхронизировать сейчас
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleClear}
                className="border-red-500/50 text-red-500 hover:bg-red-500/10"
              >
                <Icon name="Trash2" size={16} className="mr-2" />
                Очистить всё
              </Button>
            </div>

            {!navigator.onLine && (
              <Card className="bg-amber-500/10 border-amber-500/50">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-amber-500">
                    <Icon name="WifiOff" size={20} />
                    <p className="text-sm">
                      Нет подключения к интернету. Покупки будут отправлены автоматически при восстановлении связи.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              {purchases.map((purchase) => (
                <Card key={purchase.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center justify-between">
                      <span>{purchase.gameName}</span>
                      <Badge variant="secondary">{purchase.price}₽</Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={12} />
                        {new Date(purchase.timestamp).toLocaleString('ru-RU')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="CreditCard" size={12} />
                        {purchase.paymentMethod || 'card'}
                      </span>
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {purchases.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="CheckCircle2" size={48} className="mx-auto mb-2 opacity-50" />
                <p>Нет отложенных покупок</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
