import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPWAPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Проверяем, не установлено ли уже приложение
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Проверяем, не отклонил ли пользователь ранее
    const dismissed = localStorage.getItem('pwa_install_dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      // Показываем снова через 7 дней
      if (Date.now() - dismissedTime < 7 * 24 * 60 * 60 * 1000) {
        return;
      }
    }

    // Слушаем событие beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Показываем промпт через 30 секунд после загрузки
      setTimeout(() => {
        setShowPrompt(true);
      }, 30000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Слушаем событие успешной установки
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPrompt(false);
      localStorage.removeItem('pwa_install_dismissed');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('✅ Пользователь установил PWA');
      setShowPrompt(false);
    } else {
      console.log('❌ Пользователь отклонил установку PWA');
    }

    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa_install_dismissed', Date.now().toString());
  };

  if (isInstalled || !showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 animate-in slide-in-from-bottom-5 duration-500">
      <Card className="w-[350px] border-2 border-primary/50 bg-gradient-to-br from-background via-background to-primary/5 shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-purple rounded-lg blur-md opacity-50"></div>
                <div className="relative bg-gradient-to-br from-neon-green via-neon-pink to-neon-purple p-2 rounded-lg">
                  <Icon name="Smartphone" size={24} className="text-background" />
                </div>
              </div>
              <div>
                <CardTitle className="text-base">Установить приложение</CardTitle>
                <CardDescription className="text-xs mt-1">
                  GodStoreGame PWA
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-6 w-6 p-0 hover:bg-destructive/10"
            >
              <Icon name="X" size={14} />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Zap" size={14} className="text-neon-green" />
              <span>Мгновенная загрузка</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Bell" size={14} className="text-neon-pink" />
              <span>Push-уведомления о скидках</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Wifi" size={14} className="text-neon-purple" />
              <span>Работает офлайн</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Smartphone" size={14} className="text-blue-500" />
              <span>Установка на главный экран</span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleInstallClick}
              className="flex-1 bg-gradient-to-r from-neon-green via-neon-pink to-neon-purple hover:opacity-90"
            >
              <Icon name="Download" size={16} className="mr-2" />
              Установить
            </Button>
            <Button
              onClick={handleDismiss}
              variant="outline"
              className="flex-1"
            >
              Позже
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Бесплатно, без регистрации, занимает ~5 МБ
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
