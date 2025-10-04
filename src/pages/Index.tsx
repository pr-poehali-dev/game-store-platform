import { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import GamesSection from '@/components/GamesSection';
import SubscriptionsSection from '@/components/SubscriptionsSection';
import SteamTopup from '@/components/SteamTopup';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import GameForm from '@/components/GameForm';
import { initialGames, type Game } from '@/data/games';

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
  const { toast } = useToast();

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
    if (adminPassword === 'godstore2024') {
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
      />

      <SubscriptionsSection
        filteredSubs={filteredSubs}
        addToCart={addToCart}
      />

      <SteamTopup onTopup={handleSteamTopup} />

      <FeaturesSection />

      <Footer />
    </div>
  );
}