import { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import GamesSection from '@/components/GamesSection';
import SubscriptionsSection from '@/components/SubscriptionsSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import GameForm from '@/components/GameForm';

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
  { id: 1, title: 'Starfield', platform: 'Xbox', price: 2999, description: 'Космическая RPG от Bethesda', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/header.jpg', category: 'RPG', rating: 8.5, release_year: 2023 },
  { id: 2, title: 'Spider-Man 2', platform: 'PlayStation', price: 3499, description: 'Продолжение приключений Человека-паука', image_url: 'https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/1c7b75d8ed9271516546560d219ad0b22ee0a263b4537bd8.png', category: 'Action', rating: 9.2, release_year: 2023 },
  { id: 3, title: 'Forza Horizon 5', platform: 'Xbox', price: 2499, description: 'Лучший гоночный симулятор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg', category: 'Racing', rating: 9.0, release_year: 2021 },
  { id: 4, title: 'God of War Ragnarök', platform: 'PlayStation', price: 3999, description: 'Эпическое приключение Кратоса', image_url: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0A.png', category: 'Action', rating: 9.5, release_year: 2022 },
  { id: 5, title: 'Halo Infinite', platform: 'Xbox', price: 1999, description: 'Культовый шутер от 343 Industries', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1240440/header.jpg', category: 'Shooter', rating: 8.0, release_year: 2021 },
  { id: 6, title: 'The Last of Us Part II', platform: 'PlayStation', price: 2999, description: 'Постапокалиптический экшен', image_url: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2618/Y02ljdBodKFBiziorYgqftLE.png', category: 'Action', rating: 9.3, release_year: 2020 },
  { id: 7, title: 'Cyberpunk 2077', platform: 'Both', price: 2799, description: 'Футуристическая RPG в Найт-Сити', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg', category: 'RPG', rating: 8.7, release_year: 2020 },
  { id: 8, title: 'Hogwarts Legacy', platform: 'Both', price: 3299, description: 'Магический мир Гарри Поттера', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg', category: 'RPG', rating: 8.8, release_year: 2023 },
  { id: 9, title: 'Elden Ring', platform: 'Both', price: 3799, description: 'Темное фэнтези от FromSoftware', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg', category: 'RPG', rating: 9.7, release_year: 2022 },
  { id: 10, title: 'Resident Evil 4', platform: 'Both', price: 3299, description: 'Ремейк легендарного хоррора', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg', category: 'Horror', rating: 9.4, release_year: 2023 },
  { id: 11, title: 'Gears 5', platform: 'Xbox', price: 1999, description: 'Шутер третьего лица', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1097840/header.jpg', category: 'Shooter', rating: 8.3, release_year: 2019 },
  { id: 12, title: 'Horizon Forbidden West', platform: 'PlayStation', price: 3999, description: 'Постапокалиптическое приключение', image_url: 'https://image.api.playstation.com/vulcan/ap/rnd/202107/3100/ki0STHGAkIF06Q4AU8Ow4OkN.png', category: 'Action', rating: 9.1, release_year: 2022 },
  { id: 13, title: 'FIFA 24', platform: 'Both', price: 2999, description: 'Футбольный симулятор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/header.jpg', category: 'Sports', rating: 7.8, release_year: 2023 },
  { id: 14, title: 'Call of Duty: Modern Warfare III', platform: 'Both', price: 4299, description: 'Легендарный шутер возвращается', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2519060/header.jpg', category: 'Shooter', rating: 8.2, release_year: 2023 },
  { id: 15, title: 'Assassins Creed Mirage', platform: 'Both', price: 3199, description: 'Возвращение к истокам серии', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2369980/header.jpg', category: 'Action', rating: 8.4, release_year: 2023 },
  { id: 16, title: 'Alan Wake 2', platform: 'Both', price: 3499, description: 'Психологический хоррор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/header.jpg', category: 'Horror', rating: 9.0, release_year: 2023 },
  { id: 17, title: 'Sea of Thieves', platform: 'Xbox', price: 1799, description: 'Пиратские приключения', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172620/header.jpg', category: 'Adventure', rating: 8.5, release_year: 2018 },
  { id: 18, title: 'Ratchet & Clank: Rift Apart', platform: 'PlayStation', price: 3699, description: 'Платформер-экшен', image_url: 'https://image.api.playstation.com/vulcan/ap/rnd/202101/2921/DwVvI8KdQLsVBqvV4LpMcAFH.png', category: 'Action', rating: 9.0, release_year: 2021 },
  { id: 19, title: 'Baldurs Gate 3', platform: 'Both', price: 3999, description: 'Эпическая RPG по D&D', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg', category: 'RPG', rating: 9.8, release_year: 2023 },
  { id: 20, title: 'Lies of P', platform: 'Both', price: 2899, description: 'Soulslike по мотивам Пиноккио', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1627720/header.jpg', category: 'Action', rating: 8.6, release_year: 2023 },
  { id: 21, title: 'Gran Turismo 7', platform: 'PlayStation', price: 3499, description: 'Реалистичный гоночный симулятор', image_url: 'https://image.api.playstation.com/vulcan/ap/rnd/202110/2915/aYWv7MF5UvQ0aTB8ynwKRchL.png', category: 'Racing', rating: 8.7, release_year: 2022 },
  { id: 22, title: 'Diablo IV', platform: 'Both', price: 3799, description: 'Возвращение легендарной ARPG', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2344520/header.jpg', category: 'RPG', rating: 8.9, release_year: 2023 },
  { id: 23, title: 'Dead Space Remake', platform: 'Both', price: 3199, description: 'Ремейк культового хоррора', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1693980/header.jpg', category: 'Horror', rating: 9.2, release_year: 2023 },
  { id: 24, title: 'Mortal Kombat 1', platform: 'Both', price: 3299, description: 'Легендарный файтинг', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/header.jpg', category: 'Fighting', rating: 8.5, release_year: 2023 }
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
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [platformFilter, setPlatformFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
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
        addToCart={addToCart}
      />

      <SubscriptionsSection
        filteredSubs={filteredSubs}
        addToCart={addToCart}
      />

      <FeaturesSection />

      <Footer />
    </div>
  );
}