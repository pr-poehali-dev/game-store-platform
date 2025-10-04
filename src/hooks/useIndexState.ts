import { useState, useMemo, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { initialGames, type Game } from '@/data/games';
import type { GameVersion } from '@/types';

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
  type: 'game' | 'subscription' | 'steam-topup' | 'account' | 'psn-card';
  item: Game | Subscription | { id: number; price: number; title: string; value?: number; region?: string };
  quantity: number;
  selectedVersion?: GameVersion;
}

const initialSubscriptions: Subscription[] = [
  { id: 1, name: 'Xbox Game Pass Ultimate', platform: 'Xbox', price: 599, duration: '1 месяц', description: 'Полный доступ к играм Xbox и EA Play', features: ['100+ игр Xbox Game Pass', 'EA Play (50+ игр)', 'Cloud Gaming', 'Xbox Live Gold', 'Скидки до 20%'] },
  { id: 2, name: 'Xbox Game Pass Ultimate', platform: 'Xbox', price: 1699, duration: '3 месяца', description: 'Ultimate подписка на 3 месяца', features: ['100+ игр Xbox Game Pass', 'EA Play', 'Cloud Gaming', 'Xbox Live Gold', 'Скидки до 20%'] },
  { id: 3, name: 'Xbox Game Pass Core', platform: 'Xbox', price: 399, duration: '1 месяц', description: 'Базовая подписка для онлайн-игр', features: ['Онлайн-мультиплеер', '25 игр в каталоге', 'Скидки участникам', 'Облачные сохранения'] },
  { id: 4, name: 'Xbox Game Pass для ПК', platform: 'Xbox', price: 449, duration: '1 месяц', description: 'Game Pass для PC-геймеров', features: ['100+ игр на ПК', 'Новинки в день релиза', 'EA Play', 'Скидки до 20%'] },
  
  { id: 5, name: 'PlayStation Plus Essential', platform: 'PlayStation', price: 499, duration: '1 месяц', description: 'Базовая подписка PlayStation', features: ['Онлайн-мультиплеер', '2 игры каждый месяц', 'Облачные сохранения', 'Эксклюзивные скидки'] },
  { id: 6, name: 'PlayStation Plus Essential', platform: 'PlayStation', price: 1299, duration: '3 месяца', description: 'Essential на 3 месяца', features: ['Онлайн-мультиплеер', '2 игры каждый месяц', 'Облачные сохранения', 'Эксклюзивные скидки'] },
  { id: 7, name: 'PlayStation Plus Essential', platform: 'PlayStation', price: 2499, duration: '12 месяцев', description: 'Essential на год (выгодно!)', features: ['Онлайн-мультиплеер', '24 игры за год', 'Облачные сохранения', 'Эксклюзивные скидки'] },
  
  { id: 8, name: 'PlayStation Plus Extra', platform: 'PlayStation', price: 899, duration: '1 месяц', description: 'Каталог из 400+ игр PlayStation', features: ['Все из Essential', '400+ игр каталога', 'Игры PS4 и PS5', 'Хиты Ubisoft+'] },
  { id: 9, name: 'PlayStation Plus Extra', platform: 'PlayStation', price: 2499, duration: '3 месяца', description: 'Extra на 3 месяца', features: ['Все из Essential', '400+ игр каталога', 'Игры PS4 и PS5', 'Хиты Ubisoft+'] },
  { id: 10, name: 'PlayStation Plus Extra', platform: 'PlayStation', price: 4999, duration: '12 месяцев', description: 'Extra на год', features: ['Все из Essential', '400+ игр каталога', 'Игры PS4 и PS5', 'Хиты Ubisoft+'] },
  
  { id: 11, name: 'PlayStation Plus Premium', platform: 'PlayStation', price: 1099, duration: '1 месяц', description: 'Максимальная подписка PlayStation', features: ['Все из Extra', '700+ игр с PS1/PS2/PS3', 'Облачный гейминг', 'Пробные версии на 2 часа', 'Классические хиты'] },
  { id: 12, name: 'PlayStation Plus Premium', platform: 'PlayStation', price: 2999, duration: '3 месяца', description: 'Premium на 3 месяца', features: ['Все из Extra', '700+ игр с PS1/PS2/PS3', 'Облачный гейминг', 'Пробные версии', 'Классические хиты'] },
  { id: 13, name: 'PlayStation Plus Premium', platform: 'PlayStation', price: 5999, duration: '12 месяцев', description: 'Premium на год (лучшее предложение!)', features: ['Все из Extra', '700+ игр всех поколений', 'Облачный гейминг', 'Пробные версии', 'Классика PS'] },
  
  { id: 14, name: 'EA Play', platform: 'Both', price: 299, duration: '1 месяц', description: 'Подписка на игры Electronic Arts', features: ['50+ игр EA (FIFA, Battlefield)', 'Ранний доступ к новинкам', 'Скидки 10% на покупки EA', 'Эксклюзивный контент'] },
  { id: 15, name: 'EA Play', platform: 'Both', price: 849, duration: '3 месяца', description: 'EA Play на 3 месяца', features: ['50+ игр EA', 'Ранний доступ', 'Скидки 10%', 'Эксклюзивный контент'] },
  { id: 16, name: 'EA Play Pro', platform: 'Both', price: 999, duration: '1 месяц', description: 'Премиум EA Play для хардкорных фанатов', features: ['Все игры EA в день релиза', 'Unlimited доступ', 'Все DLC и дополнения', 'Скидки 10%'] },
  
  { id: 17, name: 'Nintendo Switch Online', platform: 'Nintendo', price: 249, duration: '1 месяц', description: 'Онлайн-подписка для Nintendo Switch', features: ['Онлайн-мультиплеер', 'Классические NES/SNES игры', 'Облачные сохранения', 'Эксклюзивные предложения'] },
  { id: 18, name: 'Nintendo Switch Online', platform: 'Nintendo', price: 1199, duration: '12 месяцев', description: 'Switch Online на год', features: ['Онлайн-мультиплеер', 'NES/SNES игры', 'Облачные сохранения', 'Эксклюзивные предложения'] },
  { id: 19, name: 'Nintendo Switch Online + DLC', platform: 'Nintendo', price: 499, duration: '1 месяц', description: 'Расширенная подписка Switch', features: ['Все из базовой', 'Игры N64 и SEGA Genesis', 'DLC для Animal Crossing, Splatoon', 'Mario Kart 8 треки'] },
  { id: 20, name: 'Nintendo Switch Online + DLC', platform: 'Nintendo', price: 3999, duration: '12 месяцев', description: 'Расширенная на год', features: ['Все из базовой', 'N64 и SEGA игры', 'DLC для топ-игр', 'Mario Kart 8 треки'] }
];

export function useIndexState() {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [platformFilter, setPlatformFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [franchiseFilter, setFranchiseFilter] = useState<string>('All');
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
  const [selectedVersion, setSelectedVersion] = useState<GameVersion | null>(null);
  const [activeTab, setActiveTab] = useState<string>('games');
  const { toast } = useToast();

  useEffect(() => {
    const savedFavorites = localStorage.getItem('godstore-favorites');
    const savedHistory = localStorage.getItem('godstore-history');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedHistory) setViewHistory(JSON.parse(savedHistory));
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(games.map(g => g.category));
    return ['All', ...Array.from(cats)];
  }, [games]);

  const franchises = useMemo(() => {
    const franchiseSet = new Set(games.filter(g => g.franchise).map(g => g.franchise!));
    return ['All', ...Array.from(franchiseSet).sort()];
  }, [games]);

  const filteredGames = useMemo(() => {
    const filtered = games.filter(g => {
      const matchesPlatform = platformFilter === 'All' || g.platform === platformFilter || g.platform === 'Both';
      const matchesCategory = categoryFilter === 'All' || g.category === categoryFilter;
      const matchesFranchise = franchiseFilter === 'All' || g.franchise === franchiseFilter;
      const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           g.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = g.price >= priceRange[0] && g.price <= priceRange[1];
      return matchesPlatform && matchesCategory && matchesFranchise && matchesSearch && matchesPrice;
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
  }, [games, platformFilter, categoryFilter, franchiseFilter, searchQuery, sortBy, priceRange]);

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
    
    if (game.versions && game.versions.length > 0) {
      setSelectedVersion(game.versions[0]);
    } else {
      setSelectedVersion(null);
    }
  };

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

  const handleBuyAccount = (account: any) => {
    const accountItem = {
      id: Date.now(),
      title: `Аккаунт ${account.platform}${account.region ? ` (${account.region})` : ''}`,
      price: account.price
    };
    
    setCart([...cart, { 
      id: `account-${Date.now()}`, 
      type: 'account' as const, 
      item: accountItem, 
      quantity: 1 
    }]);
    
    setIsCartOpen(true);
    
    toast({ 
      title: 'Аккаунт добавлен в корзину', 
      description: accountItem.title,
      duration: 3000
    });
  };

  const handleBuyPSNCard = (card: any) => {
    const discount = card.discount || 0;
    const finalPrice = discount > 0 ? Math.round(card.price * (1 - discount / 100)) : card.price;
    
    const cardItem = {
      id: Date.now(),
      title: `Карта PSN ${card.value}₽ (${card.region})`,
      price: finalPrice,
      value: card.value,
      region: card.region
    };
    
    setCart([...cart, { 
      id: `psn-card-${Date.now()}`, 
      type: 'psn-card' as const, 
      item: cardItem, 
      quantity: 1 
    }]);
    
    setIsCartOpen(true);
    
    toast({ 
      title: 'Карта PSN добавлена в корзину', 
      description: cardItem.title,
      duration: 3000
    });
  };

  return {
    games,
    subscriptions,
    platformFilter,
    setPlatformFilter,
    categoryFilter,
    setCategoryFilter,
    franchiseFilter,
    setFranchiseFilter,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    cart,
    adminPassword,
    setAdminPassword,
    isAdminAuth,
    editingGame,
    setEditingGame,
    editingSubscription,
    setEditingSubscription,
    isCartOpen,
    setIsCartOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    favorites,
    viewHistory,
    selectedGame,
    setSelectedGame,
    selectedVersion,
    setSelectedVersion,
    activeTab,
    setActiveTab,
    categories,
    franchises,
    filteredGames,
    filteredSubs,
    cartTotal,
    cartCount,
    toggleFavorite,
    handleViewGame,
    addToCart,
    removeFromCart,
    updateQuantity,
    handleCheckout,
    handleAdminLogin,
    handleSaveGame,
    handleDeleteGame,
    handleSaveSubscription,
    handleDeleteSubscription,
    handleSteamTopup,
    handleBuyAccount,
    handleBuyPSNCard
  };
}
