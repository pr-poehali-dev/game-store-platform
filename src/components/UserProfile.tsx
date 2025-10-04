import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import ReferralProgram from '@/components/ReferralProgram';
import UserLevel from '@/components/UserLevel';
import CashbackDisplay from '@/components/CashbackDisplay';
import NotificationSettings from '@/components/NotificationSettings';
import CurrencyRatesWidget from '@/components/CurrencyRatesWidget';

interface UserData {
  user: {
    email: string;
    name: string;
    phone: string;
    created_at: string;
    total_spent: number;
    loyalty_points: number;
    is_verified: boolean;
  };
  orders: Array<{
    id: number;
    order_number: string;
    status: string;
    total_amount: number;
    discount_amount: number;
    promo_code: string | null;
    payment_method: string;
    created_at: string;
    completed_at: string | null;
    items: Array<{
      item_type: string;
      item_name: string;
      quantity: number;
      price: number;
    }>;
  }>;
  subscriptions: Array<{
    id: number;
    subscription_name: string;
    platform: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    auto_renew: boolean;
  }>;
  library: Array<{
    id: number;
    game_id: number;
    game_title: string;
    platform: string;
    purchase_date: string;
    activation_status: string;
    account_email: string;
  }>;
  stats: {
    total_orders: number;
    active_subscriptions: number;
    games_owned: number;
  };
}

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/368c55f6-e1ab-410d-aa1d-64a0532bcae5?email=demo@godstore.game');
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить профиль',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAutoRenew = async (subscriptionId: number) => {
    try {
      const response = await fetch('https://functions.poehali.dev/368c55f6-e1ab-410d-aa1d-64a0532bcae5', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle_auto_renew',
          email: 'demo@godstore.game',
          subscription_id: subscriptionId
        })
      });

      if (response.ok) {
        loadUserProfile();
        toast({
          title: 'Успешно',
          description: 'Автопродление обновлено',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить настройки',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      completed: { label: 'Выполнен', className: 'bg-green-600' },
      pending: { label: 'В обработке', className: 'bg-yellow-600' },
      cancelled: { label: 'Отменён', className: 'bg-red-600' },
    };
    
    const statusInfo = statusMap[status] || { label: status, className: 'bg-muted' };
    return <Badge className={`${statusInfo.className} text-white`}>{statusInfo.label}</Badge>;
  };

  const getActivationBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      activated: { label: 'Активирована', className: 'bg-green-600' },
      pending: { label: 'Ожидает активации', className: 'bg-yellow-600' },
      failed: { label: 'Ошибка', className: 'bg-red-600' },
    };
    
    const statusInfo = statusMap[status] || { label: status, className: 'bg-muted' };
    return <Badge className={`${statusInfo.className} text-white text-xs`}>{statusInfo.label}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icon name="Loader2" size={48} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Не удалось загрузить профиль</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-green via-neon-pink to-neon-purple bg-clip-text text-transparent">
              Личный кабинет
            </h1>
            <p className="text-muted-foreground mt-1">Управление профилем и покупками</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              <Icon name="Home" size={16} className="mr-2" />
              На главную
            </Button>
            <Button variant="outline" onClick={loadUserProfile}>
              <Icon name="RefreshCw" size={16} className="mr-2" />
              Обновить
            </Button>
            <Button 
              variant="outline" 
              className="border-red-500/50 text-red-500 hover:bg-red-500/10"
              onClick={() => {
                toast({
                  title: 'Выход выполнен',
                  description: 'До скорых встреч!',
                });
                setTimeout(() => window.location.href = '/', 1000);
              }}
            >
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <div className="lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-2 mb-6">
              <Card className="bg-gradient-to-br from-neon-green/20 to-transparent border-neon-green/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">Потрачено всего</CardTitle>
                  <CardDescription className="text-2xl font-bold text-neon-green">
                    {userData.user.total_spent.toLocaleString()}₽
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-neon-pink/20 to-transparent border-neon-pink/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">Баллы лояльности</CardTitle>
                  <CardDescription className="text-2xl font-bold text-neon-pink flex items-center gap-2">
                    <Icon name="Star" size={24} />
                    {userData.user.loyalty_points}
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-neon-purple/20 to-transparent border-neon-purple/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">Заказов</CardTitle>
                  <CardDescription className="text-2xl font-bold text-neon-purple">
                    {userData.stats.total_orders}
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-500/20 to-transparent border-yellow-500/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">Игр в библиотеке</CardTitle>
                  <CardDescription className="text-2xl font-bold text-yellow-500">
                    {userData.stats.games_owned}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <CashbackDisplay userId={1} />
          </div>

          <div className="space-y-6">
            <UserLevel userId={1} />
            <CurrencyRatesWidget />
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="User" size={24} />
              Информация о профиле
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Имя</p>
              <p className="font-semibold">{userData.user.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-semibold flex items-center gap-2">
                {userData.user.email}
                {userData.user.is_verified && (
                  <Badge className="bg-green-600 text-white text-xs">
                    <Icon name="CheckCircle" size={12} className="mr-1" />
                    Подтверждён
                  </Badge>
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Телефон</p>
              <p className="font-semibold">{userData.user.phone || 'Не указан'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Дата регистрации</p>
              <p className="font-semibold">{formatDate(userData.user.created_at)}</p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="orders">
              <Icon name="ShoppingBag" size={16} className="mr-2" />
              История покупок
            </TabsTrigger>
            <TabsTrigger value="subscriptions">
              <Icon name="Star" size={16} className="mr-2" />
              Подписки ({userData.stats.active_subscriptions})
            </TabsTrigger>
            <TabsTrigger value="library">
              <Icon name="Library" size={16} className="mr-2" />
              Библиотека игр
            </TabsTrigger>
            <TabsTrigger value="referrals">
              <Icon name="Users" size={16} className="mr-2" />
              Рефералы
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <ScrollArea className="h-[600px]">
              {userData.orders.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Пока нет заказов</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userData.orders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">Заказ {order.order_number}</CardTitle>
                            <CardDescription>{formatDate(order.created_at)}</CardDescription>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <Icon 
                                  name={item.item_type === 'game' ? 'Gamepad2' : 'Star'} 
                                  size={16} 
                                  className="text-muted-foreground"
                                />
                                <span>{item.item_name}</span>
                                <Badge variant="outline" className="text-xs">x{item.quantity}</Badge>
                              </div>
                              <span className="font-semibold">{item.price}₽</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between border-t pt-4">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">
                            Оплата: {order.payment_method === 'card' ? 'Карта' : order.payment_method === 'sbp' ? 'СБП' : 'Криптовалюта'}
                          </span>
                          {order.promo_code && (
                            <Badge className="bg-green-600 text-white">
                              <Icon name="Tag" size={12} className="mr-1" />
                              {order.promo_code} (-{order.discount_amount}₽)
                            </Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-neon-green">{order.total_amount}₽</p>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-4">
            <ScrollArea className="h-[600px]">
              {userData.subscriptions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="Star" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Нет активных подписок</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {userData.subscriptions.map((sub) => (
                    <Card key={sub.id} className={!sub.is_active ? 'opacity-60' : ''}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">{sub.subscription_name}</CardTitle>
                            <CardDescription>{sub.platform}</CardDescription>
                          </div>
                          <Badge className={sub.is_active ? 'bg-green-600' : 'bg-muted'}>
                            {sub.is_active ? 'Активна' : 'Истекла'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Начало</span>
                          <span>{formatDate(sub.start_date)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Окончание</span>
                          <span className={new Date(sub.end_date) < new Date() ? 'text-red-500' : ''}>
                            {formatDate(sub.end_date)}
                          </span>
                        </div>
                        {sub.is_active && (
                          <div className="flex items-center justify-between pt-2 border-t">
                            <span className="text-sm">Автопродление</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleAutoRenew(sub.id)}
                              className={sub.auto_renew ? 'bg-green-600/10 border-green-600' : ''}
                            >
                              <Icon 
                                name={sub.auto_renew ? 'ToggleRight' : 'ToggleLeft'} 
                                size={20} 
                                className={sub.auto_renew ? 'text-green-600' : ''}
                              />
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="library" className="space-y-4">
            <ScrollArea className="h-[600px]">
              {userData.library.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="Library" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Библиотека пуста</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {userData.library.map((game) => (
                    <Card key={game.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">{game.game_title}</CardTitle>
                            <CardDescription>{game.platform}</CardDescription>
                          </div>
                          {getActivationBadge(game.activation_status)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Дата покупки</span>
                          <span>{formatDate(game.purchase_date)}</span>
                        </div>
                        {game.account_email && (
                          <div className="pt-2 border-t">
                            <p className="text-xs text-muted-foreground mb-1">Аккаунт для игры</p>
                            <p className="text-sm font-mono">{game.account_email}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="referrals" className="space-y-4">
            <ReferralProgram userId={1} />
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <NotificationSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}