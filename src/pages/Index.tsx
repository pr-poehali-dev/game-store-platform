import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Game {
  id: number;
  title: string;
  platform: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
  rating: number;
  release_year: number;
}

interface Subscription {
  id: number;
  name: string;
  platform: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
}

interface CartItem {
  id: string;
  type: 'game' | 'subscription';
  item: Game | Subscription;
  quantity: number;
}

const initialGames: Game[] = [
  { id: 1, title: 'Starfield', platform: 'Xbox', price: 2999, description: 'Космическая RPG от Bethesda', image_url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800', category: 'RPG', rating: 8.5, release_year: 2023 },
  { id: 2, title: 'Spider-Man 2', platform: 'PlayStation', price: 3499, description: 'Продолжение приключений Человека-паука', image_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800', category: 'Action', rating: 9.2, release_year: 2023 },
  { id: 3, title: 'Forza Horizon 5', platform: 'Xbox', price: 2499, description: 'Лучший гоночный симулятор', image_url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800', category: 'Racing', rating: 9.0, release_year: 2021 },
  { id: 4, title: 'God of War Ragnarök', platform: 'PlayStation', price: 3999, description: 'Эпическое приключение Кратоса', image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800', category: 'Action', rating: 9.5, release_year: 2022 },
  { id: 5, title: 'Halo Infinite', platform: 'Xbox', price: 1999, description: 'Культовый шутер от 343 Industries', image_url: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800', category: 'Shooter', rating: 8.0, release_year: 2021 },
  { id: 6, title: 'The Last of Us Part II', platform: 'PlayStation', price: 2999, description: 'Постапокалиптический экшен', image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800', category: 'Action', rating: 9.3, release_year: 2020 },
  { id: 7, title: 'Cyberpunk 2077', platform: 'Both', price: 2799, description: 'Футуристическая RPG в Найт-Сити', image_url: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800', category: 'RPG', rating: 8.7, release_year: 2020 },
  { id: 8, title: 'Hogwarts Legacy', platform: 'Both', price: 3299, description: 'Магический мир Гарри Поттера', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', category: 'RPG', rating: 8.8, release_year: 2023 }
];

const initialSubscriptions: Subscription[] = [
  { id: 1, name: 'Game Pass Ultimate', platform: 'Xbox', price: 599, duration: '1 месяц', description: 'Доступ к 100+ играм', features: ['Онлайн-мультиплеер', 'Игры EA Play', 'Cloud Gaming', 'Скидки до 20%'] },
  { id: 2, name: 'Game Pass Ultimate', platform: 'Xbox', price: 1699, duration: '3 месяца', description: 'Доступ к 100+ играм на 3 месяца', features: ['Онлайн-мультиплеер', 'Игры EA Play', 'Cloud Gaming', 'Скидки до 20%'] },
  { id: 3, name: 'PlayStation Plus Extra', platform: 'PlayStation', price: 699, duration: '1 месяц', description: 'Коллекция из 400+ игр', features: ['Онлайн-мультиплеер', 'Ежемесячные игры', 'Каталог классики', 'Скидки'] },
  { id: 4, name: 'PlayStation Plus Premium', platform: 'PlayStation', price: 899, duration: '1 месяц', description: 'Премиум доступ ко всем функциям', features: ['Онлайн-мультиплеер', '700+ игр', 'Классические игры', 'Облачный гейминг'] },
  { id: 5, name: 'EA Play', platform: 'Xbox', price: 299, duration: '1 месяц', description: 'Игры от Electronic Arts', features: ['50+ игр EA', 'Ранний доступ', 'Скидки 10%'] },
  { id: 6, name: 'PlayStation Plus Essential', platform: 'PlayStation', price: 499, duration: '1 месяц', description: 'Базовая подписка', features: ['Онлайн-мультиплеер', 'Ежемесячные игры', 'Облачные сохранения'] }
];

export default function Index() {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [subscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [platformFilter, setPlatformFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [isAdminAuth, setIsAdminAuth] = useState<boolean>(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const categories = useMemo(() => {
    const cats = new Set(games.map(g => g.category));
    return ['All', ...Array.from(cats)];
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter(g => {
      const matchesPlatform = platformFilter === 'All' || g.platform === platformFilter || g.platform === 'Both';
      const matchesCategory = categoryFilter === 'All' || g.category === categoryFilter;
      const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           g.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPlatform && matchesCategory && matchesSearch;
    });
  }, [games, platformFilter, categoryFilter, searchQuery]);

  const filteredSubs = useMemo(() => {
    return subscriptions.filter(s => 
      platformFilter === 'All' || s.platform === platformFilter
    );
  }, [subscriptions, platformFilter]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = 'price' in item.item ? item.item.price : 0;
      return sum + (price * item.quantity);
    }, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const addToCart = (item: Game | Subscription, type: 'game' | 'subscription') => {
    const itemId = `${type}-${item.id}`;
    const existingItem = cart.find(ci => ci.id === itemId);
    
    if (existingItem) {
      setCart(cart.map(ci => 
        ci.id === itemId ? { ...ci, quantity: ci.quantity + 1 } : ci
      ));
    } else {
      setCart([...cart, { id: itemId, type, item, quantity: 1 }]);
    }
    
    toast({ 
      title: 'Добавлено в корзину', 
      description: `${'title' in item ? item.title : item.name} добавлен в корзину`,
      duration: 2000
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(ci => ci.id !== itemId));
    toast({ title: 'Удалено из корзины', duration: 2000 });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(cart.map(ci => {
      if (ci.id === itemId) {
        const newQuantity = ci.quantity + delta;
        return newQuantity > 0 ? { ...ci, quantity: newQuantity } : ci;
      }
      return ci;
    }).filter(ci => ci.quantity > 0));
  };

  const handleCheckout = () => {
    toast({ 
      title: 'Заказ оформлен!', 
      description: `Сумма заказа: ${cartTotal}₽. Спасибо за покупку!`,
      duration: 4000
    });
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  const handleAdminLogin = () => {
    if (adminPassword === 'pixelvault123') {
      setIsAdminAuth(true);
      toast({ title: 'Вход выполнен', description: 'Добро пожаловать в админ-панель' });
    } else {
      toast({ title: 'Ошибка', description: 'Неверный пароль', variant: 'destructive' });
    }
  };

  const handleSaveGame = (game: Partial<Game>) => {
    if (editingGame) {
      setGames(games.map(g => g.id === editingGame.id ? { ...g, ...game } : g));
      toast({ title: 'Игра обновлена', description: `${game.title} успешно обновлена` });
    } else {
      const newGame = { ...game, id: Date.now() } as Game;
      setGames([...games, newGame]);
      toast({ title: 'Игра добавлена', description: `${game.title} добавлена в каталог` });
    }
    setEditingGame(null);
  };

  const handleDeleteGame = (id: number) => {
    setGames(games.filter(g => g.id !== id));
    toast({ title: 'Игра удалена', description: 'Игра удалена из каталога' });
  };

  return (
    <div className="min-h-screen bg-background dark">
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="/img/7c012c19-01a6-4326-8859-ccbee27e9f29.jpg" 
                alt="PixelVault Logo" 
                className="w-12 h-12 rounded-lg glow-green"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-neon-green via-neon-pink to-neon-purple bg-clip-text text-transparent">
                  PIXELVAULT
                </h1>
                <p className="text-xs text-muted-foreground hidden md:block">Твоё игровое хранилище</p>
              </div>
            </div>
            
            <nav className="flex items-center gap-3 md:gap-6">
              <a href="#games" className="text-sm md:text-base text-foreground hover:text-neon-green transition-colors hidden md:block">
                Игры
              </a>
              <a href="#subscriptions" className="text-sm md:text-base text-foreground hover:text-neon-pink transition-colors hidden md:block">
                Подписки
              </a>
              
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="relative border-neon-green text-neon-green hover:bg-neon-green/10">
                    <Icon name="ShoppingCart" size={18} />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-neon-pink text-white px-1.5 py-0.5 text-xs">
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-card border-border w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                    <SheetDescription>
                      {cartCount} {cartCount === 1 ? 'товар' : 'товаров'} на сумму {cartTotal}₽
                    </SheetDescription>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-250px)] mt-6">
                    {cart.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Корзина пустая</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((cartItem) => {
                          const item = cartItem.item;
                          const name = 'title' in item ? item.title : item.name;
                          const price = item.price;
                          return (
                            <Card key={cartItem.id} className="bg-muted/50">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm">{name}</CardTitle>
                                <CardDescription>{price}₽</CardDescription>
                              </CardHeader>
                              <CardFooter className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => updateQuantity(cartItem.id, -1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="w-8 text-center">{cartItem.quantity}</span>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => updateQuantity(cartItem.id, 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                </div>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => removeFromCart(cartItem.id)}
                                >
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </CardFooter>
                            </Card>
                          );
                        })}
                      </div>
                    )}
                  </ScrollArea>
                  {cart.length > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-card border-t border-border">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold">Итого:</span>
                        <span className="text-2xl font-bold text-neon-green">{cartTotal}₽</span>
                      </div>
                      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-neon-pink text-white hover:bg-neon-pink/90 glow-pink">
                            Оформить заказ
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-card border-border">
                          <DialogHeader>
                            <DialogTitle>Оформление заказа</DialogTitle>
                            <DialogDescription>Заполните данные для доставки</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Имя</Label>
                              <Input placeholder="Ваше имя" />
                            </div>
                            <div>
                              <Label>Email</Label>
                              <Input type="email" placeholder="email@example.com" />
                            </div>
                            <div>
                              <Label>Телефон</Label>
                              <Input type="tel" placeholder="+7 (999) 123-45-67" />
                            </div>
                            <div>
                              <Label>Способ оплаты</Label>
                              <Select defaultValue="card">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="card">Банковская карта</SelectItem>
                                  <SelectItem value="qr">QR-код (СБП)</SelectItem>
                                  <SelectItem value="crypto">Криптовалюта</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleCheckout} className="w-full bg-neon-green text-background hover:bg-neon-green/90">
                              Оплатить {cartTotal}₽
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </SheetContent>
              </Sheet>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-neon-purple">
                    <Icon name="Settings" size={18} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  {!isAdminAuth ? (
                    <>
                      <DialogHeader>
                        <DialogTitle>Вход в админ-панель</DialogTitle>
                        <DialogDescription>Введите пароль для доступа</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Пароль</Label>
                          <Input 
                            type="password" 
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            placeholder="pixelvault123"
                          />
                        </div>
                        <Button onClick={handleAdminLogin} className="w-full bg-neon-green text-background hover:bg-neon-green/90">
                          Войти
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <DialogHeader>
                        <DialogTitle>Админ-панель</DialogTitle>
                        <DialogDescription>Управление товарами</DialogDescription>
                      </DialogHeader>
                      <Tabs defaultValue="games" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="games">Игры</TabsTrigger>
                          <TabsTrigger value="subscriptions">Подписки</TabsTrigger>
                        </TabsList>
                        <TabsContent value="games" className="space-y-4 max-h-[400px] overflow-y-auto">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="w-full bg-neon-green text-background" onClick={() => setEditingGame(null)}>
                                <Icon name="Plus" size={16} className="mr-2" />
                                Добавить игру
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-card">
                              <GameForm game={editingGame} onSave={handleSaveGame} />
                            </DialogContent>
                          </Dialog>
                          {games.map(game => (
                            <Card key={game.id} className="bg-muted/50">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm">{game.title}</CardTitle>
                                <CardDescription>{game.platform} - {game.price}₽</CardDescription>
                              </CardHeader>
                              <CardFooter className="gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" onClick={() => setEditingGame(game)}>
                                      <Icon name="Edit" size={14} />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="bg-card">
                                    <GameForm game={game} onSave={handleSaveGame} />
                                  </DialogContent>
                                </Dialog>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteGame(game.id)}>
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </CardFooter>
                            </Card>
                          ))}
                        </TabsContent>
                        <TabsContent value="subscriptions" className="space-y-4 max-h-[400px] overflow-y-auto">
                          {subscriptions.map(sub => (
                            <Card key={sub.id} className="bg-muted/50">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm">{sub.name}</CardTitle>
                                <CardDescription>{sub.platform} - {sub.price}₽ / {sub.duration}</CardDescription>
                              </CardHeader>
                            </Card>
                          ))}
                        </TabsContent>
                      </Tabs>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-background via-background to-neon-purple/5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6 animate-slide-up">
            <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple px-4 py-2 text-sm animate-pulse-glow">
              🎮 Лучшие цены на игры и подписки
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-neon-green via-neon-pink to-neon-purple bg-clip-text text-transparent">
                PixelVault
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Огромный каталог лицензионных игр для Xbox и PlayStation. Подписки Game Pass и PS Plus по лучшим ценам.
            </p>
            <div className="flex flex-wrap gap-3 justify-center pt-4">
              <Button size="lg" className="bg-neon-green text-background hover:bg-neon-green/90 glow-green" onClick={() => document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' })}>
                <Icon name="GamepadIcon" size={20} className="mr-2" />
                Каталог игр
              </Button>
              <Button size="lg" variant="outline" className="border-neon-pink text-neon-pink hover:bg-neon-pink/10" onClick={() => document.getElementById('subscriptions')?.scrollIntoView({ behavior: 'smooth' })}>
                <Icon name="Star" size={20} className="mr-2" />
                Подписки
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="games" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <h3 className="text-4xl font-bold">Каталог игр</h3>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <Input 
                placeholder="Поиск игр..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="md:w-64"
              />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="md:w-40">
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs value={platformFilter} onValueChange={setPlatformFilter} className="mb-6">
            <TabsList className="bg-muted">
              <TabsTrigger value="All">Все платформы</TabsTrigger>
              <TabsTrigger value="Xbox" className="data-[state=active]:bg-xbox data-[state=active]:text-white">
                <Icon name="Gamepad2" size={16} className="mr-2" />
                Xbox
              </TabsTrigger>
              <TabsTrigger value="PlayStation" className="data-[state=active]:bg-playstation data-[state=active]:text-white">
                <Icon name="Gamepad" size={16} className="mr-2" />
                PlayStation
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGames.map((game, idx) => (
              <Card 
                key={game.id} 
                className="group overflow-hidden border-border bg-card hover:border-neon-green/50 transition-all duration-300 hover:glow-green animate-slide-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={game.image_url} 
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge 
                      className={
                        game.platform === 'Xbox' 
                          ? 'bg-xbox text-white' 
                          : game.platform === 'PlayStation'
                          ? 'bg-playstation text-white'
                          : 'bg-neon-purple text-white'
                      }
                    >
                      {game.platform}
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-background/90 text-neon-green border-neon-green">
                      <Icon name="Star" size={12} className="mr-1" />
                      {game.rating}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg line-clamp-1">{game.title}</CardTitle>
                  <CardDescription className="line-clamp-2 text-xs">{game.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-between pt-0">
                  <div className="text-xl font-bold text-neon-green">{game.price}₽</div>
                  <Button 
                    size="sm"
                    className="bg-neon-pink text-white hover:bg-neon-pink/90"
                    onClick={() => addToCart(game, 'game')}
                  >
                    <Icon name="ShoppingCart" size={14} className="mr-1" />
                    Купить
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="Search" size={48} className="mx-auto mb-4 opacity-50" />
              <p>Игры не найдены</p>
            </div>
          )}
        </div>
      </section>

      <section id="subscriptions" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold mb-8">Подписки</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubs.map((sub, idx) => (
              <Card 
                key={sub.id}
                className="border-border bg-card hover:border-neon-purple/50 transition-all duration-300 hover:glow-purple animate-slide-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={sub.platform === 'Xbox' ? 'bg-xbox text-white' : 'bg-playstation text-white'}>
                      {sub.platform}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{sub.duration}</span>
                  </div>
                  <CardTitle className="text-2xl">{sub.name}</CardTitle>
                  <CardDescription>{sub.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {sub.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-neon-green mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-neon-purple">{sub.price}₽</div>
                  <Button 
                    className="bg-neon-purple text-white hover:bg-neon-purple/90 glow-purple"
                    onClick={() => addToCart(sub, 'subscription')}
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Купить
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-neon-green/10 via-neon-pink/10 to-neon-purple/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-4xl font-bold">Почему PixelVault?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card className="bg-card/50 backdrop-blur border-neon-green/30">
                <CardHeader>
                  <Icon name="Shield" size={40} className="mx-auto text-neon-green mb-2" />
                  <CardTitle className="text-lg">100% лицензия</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Только официальные ключи и подписки</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur border-neon-pink/30">
                <CardHeader>
                  <Icon name="Zap" size={40} className="mx-auto text-neon-pink mb-2" />
                  <CardTitle className="text-lg">Мгновенная доставка</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Ключи приходят на почту за секунды</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur border-neon-purple/30">
                <CardHeader>
                  <Icon name="HeadphonesIcon" size={40} className="mx-auto text-neon-purple mb-2" />
                  <CardTitle className="text-lg">Поддержка 24/7</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Всегда на связи и готовы помочь</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/img/7c012c19-01a6-4326-8859-ccbee27e9f29.jpg" 
                alt="PixelVault" 
                className="w-10 h-10 rounded-lg"
              />
              <div>
                <span className="font-bold bg-gradient-to-r from-neon-green to-neon-pink bg-clip-text text-transparent">
                  PIXELVAULT
                </span>
                <p className="text-xs text-muted-foreground">Твоё игровое хранилище</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 PixelVault. Все права защищены.
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-neon-green transition-colors">
                <Icon name="Mail" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-neon-pink transition-colors">
                <Icon name="MessageCircle" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-neon-purple transition-colors">
                <Icon name="Send" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function GameForm({ game, onSave }: { game: Game | null; onSave: (game: Partial<Game>) => void }) {
  const [formData, setFormData] = useState<Partial<Game>>(game || {
    title: '',
    platform: 'Xbox',
    price: 0,
    description: '',
    image_url: '',
    category: '',
    rating: 0,
    release_year: new Date().getFullYear()
  });

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{game ? 'Редактировать игру' : 'Добавить игру'}</DialogTitle>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-4 pr-4">
          <div>
            <Label>Название</Label>
            <Input 
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <Label>Платформа</Label>
            <Select value={formData.platform} onValueChange={(v) => setFormData({ ...formData, platform: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Xbox">Xbox</SelectItem>
                <SelectItem value="PlayStation">PlayStation</SelectItem>
                <SelectItem value="Both">Обе</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Цена (₽)</Label>
            <Input 
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            />
          </div>
          <div>
            <Label>Описание</Label>
            <Textarea 
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div>
            <Label>URL изображения</Label>
            <Input 
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Категория</Label>
              <Input 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </div>
            <div>
              <Label>Рейтинг</Label>
              <Input 
                type="number"
                step="0.1"
                max="10"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>
      </ScrollArea>
      <DialogFooter className="mt-4">
        <Button onClick={handleSubmit} className="bg-neon-green text-background">
          Сохранить
        </Button>
      </DialogFooter>
    </>
  );
}
