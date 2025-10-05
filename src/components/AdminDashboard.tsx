import { useState } from 'react';
import { Shield, Users, Package, Trophy, DollarSign, Settings, BarChart3, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

export default function AdminDashboard() {
  const [stats] = useState({
    totalUsers: 15234,
    activeUsers: 3421,
    totalGames: 342,
    totalRevenue: 125340,
    activeTournaments: 12,
    pendingRequests: 7,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Админ-панель</h1>
            <p className="text-muted-foreground">Полный контроль над платформой</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.location.href = '/'}>
            <Icon name="Home" size={16} className="mr-2" />
            На главную
          </Button>
          <Badge className="bg-red-500 text-white">SUPER ADMIN</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Icon name="Users" size={20} className="text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Пользователи</p>
              <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
            </div>
          </div>
          <p className="text-xs text-green-500">+234 за месяц</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <Icon name="CircleDot" size={20} className="text-green-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Онлайн</p>
              <p className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</p>
            </div>
          </div>
          <p className="text-xs text-green-500">Сейчас активны</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Icon name="Package" size={20} className="text-purple-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Игры</p>
              <p className="text-2xl font-bold">{stats.totalGames}</p>
            </div>
          </div>
          <p className="text-xs text-blue-500">+12 за неделю</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-yellow-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Доход</p>
              <p className="text-2xl font-bold">${(stats.totalRevenue / 1000).toFixed(1)}K</p>
            </div>
          </div>
          <p className="text-xs text-green-500">+15% за месяц</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
              <Icon name="Trophy" size={20} className="text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Турниры</p>
              <p className="text-2xl font-bold">{stats.activeTournaments}</p>
            </div>
          </div>
          <p className="text-xs text-blue-500">Активные</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
              <Icon name="Bell" size={20} className="text-red-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Заявки</p>
              <p className="text-2xl font-bold">{stats.pendingRequests}</p>
            </div>
          </div>
          <p className="text-xs text-red-500">Требуют внимания</p>
        </Card>
      </div>

      <Tabs defaultValue="users">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="users">Пользователи</TabsTrigger>
          <TabsTrigger value="games">Игры</TabsTrigger>
          <TabsTrigger value="tournaments">Турниры</TabsTrigger>
          <TabsTrigger value="marketplace">Маркетплейс</TabsTrigger>
          <TabsTrigger value="requests">Заявки</TabsTrigger>
          <TabsTrigger value="settings">Настройки</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Управление пользователями</h3>
              <div className="flex gap-2">
                <Input placeholder="Поиск..." className="w-64" />
                <Button>
                  <Icon name="Search" size={16} />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded hover:bg-accent">
                  <div className="flex items-center gap-3">
                    <img
                      src={`/api/placeholder/40/40`}
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">Пользователь #{i}</p>
                      <p className="text-sm text-muted-foreground">user{i}@example.com</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Eye" size={14} className="mr-1" />
                      Профиль
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Ban" size={14} className="mr-1" />
                      Бан
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Shield" size={14} className="mr-1" />
                      Админ
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="games" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Управление играми</h3>
              <Button>
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить игру
              </Button>
            </div>

            <div className="space-y-3">
              <p className="text-muted-foreground">
                Здесь админ может добавлять, редактировать и удалять игры из каталога
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tournaments" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Управление турнирами</h3>
              <Button>
                <Icon name="Plus" size={16} className="mr-2" />
                Создать турнир
              </Button>
            </div>

            <div className="space-y-3">
              <p className="text-muted-foreground">
                Здесь админ может создавать, модерировать и завершать турниры
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Управление маркетплейсом</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Модерация лотов</p>
                  <p className="text-sm text-muted-foreground">
                    Автоматическая проверка новых лотов
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Комиссия платформы</p>
                  <p className="text-sm text-muted-foreground">Процент с каждой продажи</p>
                </div>
                <Input type="number" defaultValue="5" className="w-20" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Минимальная цена</p>
                  <p className="text-sm text-muted-foreground">Мин. цена для лота (монеты)</p>
                </div>
                <Input type="number" defaultValue="10" className="w-20" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Заявки на добавление игр</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 border rounded">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold">Название игры #{i}</h4>
                      <p className="text-sm text-muted-foreground">
                        Разработчик: Studio Name
                      </p>
                    </div>
                    <Badge>Новая</Badge>
                  </div>
                  <p className="text-sm mb-3">
                    Описание и причина добавления игры на платформу...
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm">
                      <Icon name="Check" size={14} className="mr-1" />
                      Одобрить
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="X" size={14} className="mr-1" />
                      Отклонить
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Eye" size={14} className="mr-1" />
                      Подробнее
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Настройки платформы</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Название сайта</Label>
                <Input defaultValue="Game Store Platform" />
              </div>
              <div className="space-y-2">
                <Label>Email поддержки</Label>
                <Input type="email" defaultValue="support@gamestore.com" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Режим обслуживания</p>
                  <p className="text-sm text-muted-foreground">
                    Закрыть сайт для технических работ
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Регистрация пользователей</p>
                  <p className="text-sm text-muted-foreground">
                    Разрешить новые регистрации
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Модерация отзывов</p>
                  <p className="text-sm text-muted-foreground">
                    Требовать одобрения для новых отзывов
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Аналитика и статистика</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded">
                <p className="text-sm text-muted-foreground mb-1">Регистрации за неделю</p>
                <p className="text-3xl font-bold">+234</p>
                <p className="text-xs text-green-500 mt-1">↗ +15% от прошлой недели</p>
              </div>
              <div className="p-4 border rounded">
                <p className="text-sm text-muted-foreground mb-1">Продажи за неделю</p>
                <p className="text-3xl font-bold">$12.4K</p>
                <p className="text-xs text-green-500 mt-1">↗ +23% от прошлой недели</p>
              </div>
              <div className="p-4 border rounded">
                <p className="text-sm text-muted-foreground mb-1">Активные турниры</p>
                <p className="text-3xl font-bold">12</p>
                <p className="text-xs text-blue-500 mt-1">3 завершатся сегодня</p>
              </div>
              <div className="p-4 border rounded">
                <p className="text-sm text-muted-foreground mb-1">Новые отзывы</p>
                <p className="text-3xl font-bold">87</p>
                <p className="text-xs text-orange-500 mt-1">12 требуют модерации</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}