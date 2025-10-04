import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { 
  getSyncStatus, 
  manualSyncAll,
  isPeriodicSyncSupported,
  getRegisteredSyncs,
} from '@/utils/periodicSync';

export default function SyncStatusIndicator() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState(getSyncStatus());
  const [registeredSyncs, setRegisteredSyncs] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadSyncInfo();

    const interval = setInterval(() => {
      setSyncStatus(getSyncStatus());
    }, 10000);

    // Слушаем события обновлений
    const handleCatalogUpdate = () => {
      toast({
        title: '✅ Каталог обновлен',
        description: 'Новые игры загружены',
      });
      setSyncStatus(getSyncStatus());
    };

    const handlePricesUpdate = () => {
      toast({
        title: '💰 Цены обновлены',
        description: 'Актуальные цены загружены',
      });
      setSyncStatus(getSyncStatus());
    };

    const handleNewReleases = (e: CustomEvent) => {
      toast({
        title: '🎮 Новые игры!',
        description: `Добавлено ${e.detail.games.length} новых игр`,
      });
      setSyncStatus(getSyncStatus());
    };

    const handleDiscountsUpdate = (e: CustomEvent) => {
      const message = e.detail.wishlist > 0
        ? `${e.detail.wishlist} скидок в избранном`
        : `${e.detail.total} активных скидок`;
      
      toast({
        title: '🔥 Скидки обновлены',
        description: message,
      });
      setSyncStatus(getSyncStatus());
    };

    window.addEventListener('catalog-updated', handleCatalogUpdate as EventListener);
    window.addEventListener('prices-updated', handlePricesUpdate as EventListener);
    window.addEventListener('new-releases', handleNewReleases as EventListener);
    window.addEventListener('discounts-updated', handleDiscountsUpdate as EventListener);

    return () => {
      clearInterval(interval);
      window.removeEventListener('catalog-updated', handleCatalogUpdate as EventListener);
      window.removeEventListener('prices-updated', handlePricesUpdate as EventListener);
      window.removeEventListener('new-releases', handleNewReleases as EventListener);
      window.removeEventListener('discounts-updated', handleDiscountsUpdate as EventListener);
    };
  }, [toast]);

  const loadSyncInfo = async () => {
    setSyncStatus(getSyncStatus());
    
    if (isPeriodicSyncSupported()) {
      const syncs = await getRegisteredSyncs();
      setRegisteredSyncs(syncs);
    }
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    
    try {
      const results = await manualSyncAll();
      
      const successCount = Object.values(results).filter(Boolean).length;
      const totalCount = Object.keys(results).length;
      
      if (successCount === totalCount) {
        toast({
          title: '✅ Синхронизация завершена',
          description: 'Все данные успешно обновлены',
        });
      } else {
        toast({
          title: '⚠️ Частичная синхронизация',
          description: `Обновлено ${successCount} из ${totalCount}`,
          variant: 'destructive',
        });
      }
      
      await loadSyncInfo();
      
    } catch (error) {
      toast({
        title: '❌ Ошибка синхронизации',
        description: 'Не удалось обновить данные',
        variant: 'destructive',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="relative h-8 w-8 sm:h-9 sm:w-9 p-0"
      >
        <Icon name="RefreshCw" size={16} className="sm:w-[18px] sm:h-[18px]" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="RefreshCw" size={24} />
              Фоновая синхронизация
            </DialogTitle>
            <DialogDescription>
              Автоматическое обновление данных в фоне
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon 
                  name={isPeriodicSyncSupported() ? 'CheckCircle2' : 'AlertCircle'} 
                  size={20} 
                  className={isPeriodicSyncSupported() ? 'text-green-500' : 'text-amber-500'}
                />
                <span className="text-sm">
                  {isPeriodicSyncSupported() 
                    ? 'Periodic Background Sync активна' 
                    : 'Fallback режим (setInterval)'}
                </span>
              </div>
              
              <Button
                onClick={handleManualSync}
                disabled={isSyncing || !navigator.onLine}
                size="sm"
              >
                {isSyncing ? (
                  <>
                    <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                    Синхронизация...
                  </>
                ) : (
                  <>
                    <Icon name="RefreshCw" size={16} className="mr-2" />
                    Обновить сейчас
                  </>
                )}
              </Button>
            </div>

            {!navigator.onLine && (
              <Card className="bg-amber-500/10 border-amber-500/50">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-amber-500">
                    <Icon name="WifiOff" size={20} />
                    <p className="text-sm">
                      Нет подключения к интернету. Синхронизация будет выполнена автоматически при восстановлении связи.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Icon name="Database" size={16} />
                      Каталог игр
                    </span>
                    <Badge variant="secondary">Каждые 12 часов</Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-xs">
                    <Icon name="Clock" size={12} />
                    Последнее обновление: {syncStatus.catalog.age}
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Icon name="DollarSign" size={16} />
                      Обновление цен
                    </span>
                    <Badge variant="secondary">Каждые 6 часов</Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-xs">
                    <Icon name="Clock" size={12} />
                    Последнее обновление: {syncStatus.prices.age}
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Icon name="Sparkles" size={16} />
                      Новые релизы
                    </span>
                    <Badge variant="secondary">Каждые 24 часа</Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-xs">
                    <Icon name="Clock" size={12} />
                    Последнее обновление: {syncStatus.releases.age}
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Icon name="Percent" size={16} />
                      Проверка скидок
                    </span>
                    <Badge variant="secondary">Каждые 3 часа</Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-xs">
                    <Icon name="Clock" size={12} />
                    Последнее обновление: {syncStatus.discounts.age}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {isPeriodicSyncSupported() && registeredSyncs.length > 0 && (
              <Card className="bg-green-500/10 border-green-500/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2 text-green-500">
                    <Icon name="CheckCircle2" size={16} />
                    Активные синхронизации
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {registeredSyncs.join(', ')}
                  </CardDescription>
                </CardHeader>
              </Card>
            )}

            <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <p className="font-medium mb-1">ℹ️ Как это работает:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Данные обновляются автоматически в фоне, даже если сайт закрыт</li>
                <li>При обнаружении новых игр или скидок вы получите уведомление</li>
                <li>Кэш хранится локально для мгновенной загрузки</li>
                <li>Экономия трафика - обновляются только изменения</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
