import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { 
  checkNotificationPermission,
  subscribeToPushNotifications,
  unsubscribeFromPushNotifications,
  isSubscribedToPush,
  showLocalNotification,
  createGameDiscountNotification
} from '@/utils/pushNotifications';

export default function NotificationSettings() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadNotificationStatus();
  }, []);

  const loadNotificationStatus = async () => {
    const currentPermission = await checkNotificationPermission();
    const subscribed = await isSubscribedToPush();
    
    setPermission(currentPermission);
    setIsSubscribed(subscribed);
  };

  const handleToggleNotifications = async () => {
    setIsLoading(true);
    
    try {
      if (isSubscribed) {
        const success = await unsubscribeFromPushNotifications();
        if (success) {
          setIsSubscribed(false);
        }
      } else {
        const subscription = await subscribeToPushNotifications();
        if (subscription) {
          setIsSubscribed(true);
          setPermission('granted');
        }
      }
    } catch (error) {
      console.error('Failed to toggle notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestNotification = async () => {
    const testNotification = createGameDiscountNotification(
      'Call of Duty: Modern Warfare III',
      35,
      2799,
      1,
      '/img/36482244-6d19-4c94-aaad-64a3828fa165.jpg'
    );
    
    await showLocalNotification(testNotification);
  };

  const getPermissionStatus = () => {
    switch (permission) {
      case 'granted':
        return { text: 'Разрешено', color: 'text-green-500', icon: 'CheckCircle2' };
      case 'denied':
        return { text: 'Заблокировано', color: 'text-red-500', icon: 'XCircle' };
      default:
        return { text: 'Не настроено', color: 'text-yellow-500', icon: 'AlertCircle' };
    }
  };

  const status = getPermissionStatus();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Bell" size={24} />
          Уведомления
        </CardTitle>
        <CardDescription>
          Получайте уведомления о скидках и новых играх
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-base">Push-уведомления</Label>
            <p className="text-sm text-muted-foreground">
              Статус: <span className={status.color}>{status.text}</span>
            </p>
          </div>
          <Switch
            checked={isSubscribed}
            onCheckedChange={handleToggleNotifications}
            disabled={isLoading || permission === 'denied'}
          />
        </div>

        {permission === 'denied' && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex gap-3">
              <Icon name="AlertTriangle" size={20} className="text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-destructive mb-1">
                  Уведомления заблокированы
                </p>
                <p className="text-xs text-muted-foreground">
                  Разрешите уведомления в настройках браузера, чтобы получать оповещения о скидках
                </p>
              </div>
            </div>
          </div>
        )}

        {isSubscribed && (
          <div className="space-y-4">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex gap-3">
                <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium mb-1">
                    Уведомления включены
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Вы будете получать уведомления о:
                  </p>
                  <ul className="text-xs text-muted-foreground mt-2 space-y-1 ml-4">
                    <li>• Новых скидках на игры</li>
                    <li>• Снижении цен в избранном</li>
                    <li>• Новых играх в каталоге</li>
                    <li>• Специальных акциях</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button
              onClick={handleTestNotification}
              variant="outline"
              className="w-full"
            >
              <Icon name="Zap" size={16} className="mr-2" />
              Тестовое уведомление
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
