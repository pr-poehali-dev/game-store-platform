import { useState, useMemo, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import GamesSection from '@/components/GamesSection';
import SubscriptionsSection from '@/components/SubscriptionsSection';
import SteamTopup from '@/components/SteamTopup';
import InfoSection from '@/components/InfoSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import GameForm from '@/components/GameForm';
import ChatWidget from '@/components/ChatWidget';
import RecommendedGames from '@/components/RecommendedGames';
import { initialGames, type Game } from '@/data/games';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

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
  type: 'game' | 'subscription' | 'steam-topup';
  item: Game | Subscription | { id: number; price: number; title: string };
  quantity: number;
}

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
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [platformFilter, setPlatformFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [isAdminAuth, setIsAdminAuth] = useState<boolean>(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewHistory, setViewHistory] = useState<number[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [activeTab, setActiveTab] = useState<string>('games');
  const { toast } = useToast();

  useEffect(() => {
    const savedFavorites = localStorage.getItem('godstore-favorites');
    const savedHistory = localStorage.getItem('godstore-history');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedHistory) setViewHistory(JSON.parse(savedHistory));
  }, []);

  const toggleFavorite = (gameId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(gameId)
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId];
      localStorage.setItem('godstore-favorites', JSON.stringify(newFavorites));
      toast({
        title: prev.includes(gameId) ? 'Удалено из избранного' : 'Добавлено в избранное',
        description: prev.includes(gameId) ? '❌ Игра удалена' : '⭐ Игра сохранена в избранном',
      });
      return newFavorites;
    });
  };

  const addToViewHistory = (gameId: number) => {
    setViewHistory(prev => {
      const newHistory = [gameId, ...prev.filter(id => id !== gameId)].slice(0, 20);
      localStorage.setItem('godstore-history', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const handleViewGame = (game: Game) => {
    setSelectedGame(game);
    addToViewHistory(game.id);
  };

  const categories = useMemo(() => {
    const cats = new Set(games.map(g => g.category));
    return ['All', ...Array.from(cats)];
  }, [games]);

  const filteredGames = useMemo(() => {
    const filtered = games.filter(g => {
      const matchesPlatform = platformFilter === 'All' || g.platform === platformFilter || g.platform === 'Both';
      const matchesCategory = categoryFilter === 'All' || g.category === categoryFilter;
      const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           g.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = g.price >= priceRange[0] && g.price <= priceRange[1];
      return matchesPlatform && matchesCategory && matchesSearch && matchesPrice;
    });

    switch (sortBy) {
      case 'price-asc':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return filtered.sort((a, b) => b.price - a.price);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'year':
        return filtered.sort((a, b) => b.release_year - a.release_year);
      case 'discount':
        return filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      case 'name':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  }, [games, platformFilter, categoryFilter, searchQuery, sortBy, priceRange]);

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
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'godstore2024';
    if (adminPassword === correctPassword) {
      setIsAdminAuth(true);
      toast({ title: 'Вход выполнен', description: 'Добро пожаловать в админ-панель GodStoreGame' });
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

  const handleSaveSubscription = (sub: Partial<Subscription>) => {
    if (editingSubscription) {
      setSubscriptions(subscriptions.map(s => s.id === editingSubscription.id ? { ...s, ...sub } : s));
      toast({ title: 'Подписка обновлена', description: `${sub.name} успешно обновлена` });
    } else {
      const newSub = { ...sub, id: Date.now() } as Subscription;
      setSubscriptions([...subscriptions, newSub]);
      toast({ title: 'Подписка добавлена', description: `${sub.name} добавлена в каталог` });
    }
    setEditingSubscription(null);
  };

  const handleDeleteSubscription = (id: number) => {
    setSubscriptions(subscriptions.filter(s => s.id !== id));
    toast({ title: 'Подписка удалена', description: 'Подписка удалена из каталога' });
  };

  const handleSteamTopup = (amount: number) => {
    const topupItem = {
      id: Date.now(),
      title: `Пополнение Steam на ${amount - Math.ceil(amount * 0.02)}₽`,
      price: amount
    };
    
    setCart([...cart, { 
      id: `steam-topup-${Date.now()}`, 
      type: 'steam-topup' as const, 
      item: topupItem, 
      quantity: 1 
    }]);
    
    setIsCartOpen(true);
    
    toast({ 
      title: 'Пополнение добавлено в корзину', 
      description: `Сумма к оплате: ${amount}₽`,
      duration: 3000
    });
  };

  return (
    <div className="min-h-screen bg-background dark">
      <Header
        cart={cart}
        cartCount={cartCount}
        cartTotal={cartTotal}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        isCheckoutOpen={isCheckoutOpen}
        setIsCheckoutOpen={setIsCheckoutOpen}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        handleCheckout={handleCheckout}
        adminPassword={adminPassword}
        setAdminPassword={setAdminPassword}
        isAdminAuth={isAdminAuth}
        handleAdminLogin={handleAdminLogin}
        games={games}
        subscriptions={subscriptions}
        editingGame={editingGame}
        setEditingGame={setEditingGame}
        editingSubscription={editingSubscription}
        setEditingSubscription={setEditingSubscription}
        handleSaveGame={handleSaveGame}
        handleDeleteGame={handleDeleteGame}
        handleSaveSubscription={handleSaveSubscription}
        handleDeleteSubscription={handleDeleteSubscription}
      />

      <Hero />

      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-muted h-12">
              <TabsTrigger value="games" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-green data-[state=active]:to-neon-purple data-[state=active]:text-background">
                <Icon name="Gamepad2" size={18} className="mr-2" />
                Игры
              </TabsTrigger>
              <TabsTrigger value="subscriptions" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-pink data-[state=active]:to-neon-purple data-[state=active]:text-background">
                <Icon name="Star" size={18} className="mr-2" />
                Подписки
              </TabsTrigger>
            </TabsList>

            <TabsContent value="games" className="mt-0">
              <GamesSection
                filteredGames={filteredGames}
                categories={categories}
                platformFilter={platformFilter}
                setPlatformFilter={setPlatformFilter}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                addToCart={addToCart}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onViewGame={handleViewGame}
              />
            </TabsContent>

            <TabsContent value="subscriptions" className="mt-0">
              <SubscriptionsSection
                filteredSubs={filteredSubs}
                addToCart={addToCart}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Dialog open={!!selectedGame} onOpenChange={(open) => !open && setSelectedGame(null)}>
        <DialogContent className="max-w-4xl bg-card border-border">
          {selectedGame && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <DialogTitle className="text-2xl mb-2">{selectedGame.title}</DialogTitle>
                    <DialogDescription className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline">{selectedGame.platform}</Badge>
                      <Badge variant="outline">{selectedGame.category}</Badge>
                      <Badge variant="outline">
                        <Icon name="Star" size={12} className="mr-1 text-yellow-500" />
                        {selectedGame.rating}/10
                      </Badge>
                      <Badge variant="outline">{selectedGame.release_year}</Badge>
                    </DialogDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(selectedGame.id)}
                  >
                    <Icon 
                      name="Heart" 
                      size={24} 
                      className={favorites.includes(selectedGame.id) ? 'fill-red-500 text-red-500' : ''} 
                    />
                  </Button>
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <img 
                  src={selectedGame.image_url} 
                  alt={selectedGame.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <p className="text-muted-foreground">{selectedGame.description}</p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    {selectedGame.discount && selectedGame.discount > 0 ? (
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-neon-green">
                          {Math.round(selectedGame.price * (1 - selectedGame.discount / 100))}₽
                        </span>
                        <span className="text-xl text-muted-foreground line-through">
                          {selectedGame.price}₽
                        </span>
                        <Badge className="bg-red-600 text-white">-{selectedGame.discount}%</Badge>
                      </div>
                    ) : (
                      <span className="text-3xl font-bold text-neon-green">{selectedGame.price}₽</span>
                    )}
                  </div>
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-neon-purple to-neon-pink"
                    onClick={() => {
                      addToCart(selectedGame, 'game');
                      setSelectedGame(null);
                    }}
                  >
                    <Icon name="ShoppingCart" size={20} className="mr-2" />
                    Купить сейчас
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <ChatWidget />

      <RecommendedGames
        games={games}
        favorites={favorites}
        viewHistory={viewHistory}
        onBuy={(game) => addToCart(game, 'game')}
        onToggleFavorite={toggleFavorite}
        onViewGame={handleViewGame}
      />

      <SteamTopup onTopup={handleSteamTopup} />

      <InfoSection />

      <FeaturesSection />

      <Footer />
    </div>
  );
}