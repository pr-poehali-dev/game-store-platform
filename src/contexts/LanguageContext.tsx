import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ru' | 'en' | 'tr' | 'uk' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ru: {
    'nav.home': 'Главная',
    'nav.catalog': 'Каталог',
    'nav.tournaments': 'Турниры',
    'nav.profile': 'Профиль',
    'search.placeholder': 'Поиск игр...',
    'cart.title': 'Корзина',
    'cart.empty': 'Корзина пуста',
    'cart.total': 'Итого',
    'checkout': 'Оформить заказ',
    'add_to_cart': 'В корзину',
    'buy_now': 'Купить сейчас',
    'discount': 'Скидка',
    'new_game': 'Новинка',
    'hot_game': 'Хит',
    'platform': 'Платформа',
    'category': 'Категория',
    'price': 'Цена',
    'rating': 'Рейтинг',
  },
  en: {
    'nav.home': 'Home',
    'nav.catalog': 'Catalog',
    'nav.tournaments': 'Tournaments',
    'nav.profile': 'Profile',
    'search.placeholder': 'Search games...',
    'cart.title': 'Cart',
    'cart.empty': 'Cart is empty',
    'cart.total': 'Total',
    'checkout': 'Checkout',
    'add_to_cart': 'Add to Cart',
    'buy_now': 'Buy Now',
    'discount': 'Discount',
    'new_game': 'New',
    'hot_game': 'Hot',
    'platform': 'Platform',
    'category': 'Category',
    'price': 'Price',
    'rating': 'Rating',
  },
  tr: {
    'nav.home': 'Ana Sayfa',
    'nav.catalog': 'Katalog',
    'nav.tournaments': 'Turnuvalar',
    'nav.profile': 'Profil',
    'search.placeholder': 'Oyun ara...',
    'cart.title': 'Sepet',
    'cart.empty': 'Sepet boş',
    'cart.total': 'Toplam',
    'checkout': 'Ödeme Yap',
    'add_to_cart': 'Sepete Ekle',
    'buy_now': 'Şimdi Satın Al',
    'discount': 'İndirim',
    'new_game': 'Yeni',
    'hot_game': 'Popüler',
    'platform': 'Platform',
    'category': 'Kategori',
    'price': 'Fiyat',
    'rating': 'Değerlendirme',
  },
  uk: {
    'nav.home': 'Головна',
    'nav.catalog': 'Каталог',
    'nav.tournaments': 'Турніри',
    'nav.profile': 'Профіль',
    'search.placeholder': 'Пошук ігор...',
    'cart.title': 'Кошик',
    'cart.empty': 'Кошик порожній',
    'cart.total': 'Разом',
    'checkout': 'Оформити замовлення',
    'add_to_cart': 'До кошика',
    'buy_now': 'Купити зараз',
    'discount': 'Знижка',
    'new_game': 'Новинка',
    'hot_game': 'Хіт',
    'platform': 'Платформа',
    'category': 'Категорія',
    'price': 'Ціна',
    'rating': 'Рейтинг',
  },
  zh: {
    'nav.home': '首页',
    'nav.catalog': '目录',
    'nav.tournaments': '锦标赛',
    'nav.profile': '个人资料',
    'search.placeholder': '搜索游戏...',
    'cart.title': '购物车',
    'cart.empty': '购物车是空的',
    'cart.total': '总计',
    'checkout': '结账',
    'add_to_cart': '加入购物车',
    'buy_now': '立即购买',
    'discount': '折扣',
    'new_game': '新品',
    'hot_game': '热门',
    'platform': '平台',
    'category': '类别',
    'price': '价格',
    'rating': '评分',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'ru';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const LANGUAGES = [
  { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'tr' as Language, name: 'Türkçe', flag: '🇹🇷' },
  { code: 'uk' as Language, name: 'Українська', flag: '🇺🇦' },
  { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
];
