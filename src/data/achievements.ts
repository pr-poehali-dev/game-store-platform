import { Achievement } from '@/types/achievements';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-purchase',
    title: 'Первая покупка',
    description: 'Купите свою первую игру в магазине',
    icon: 'ShoppingCart',
    rarity: 'common',
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    reward: { points: 100, badge: '🎮' },
    category: 'purchase'
  },
  {
    id: 'collector-5',
    title: 'Начинающий коллекционер',
    description: 'Соберите коллекцию из 5 игр',
    icon: 'Library',
    rarity: 'common',
    progress: 0,
    maxProgress: 5,
    unlocked: false,
    reward: { points: 200, badge: '📚' },
    category: 'collection'
  },
  {
    id: 'collector-10',
    title: 'Опытный коллекционер',
    description: 'Соберите коллекцию из 10 игр',
    icon: 'BookMarked',
    rarity: 'rare',
    progress: 0,
    maxProgress: 10,
    unlocked: false,
    reward: { points: 500, badge: '🏆' },
    category: 'collection'
  },
  {
    id: 'collector-25',
    title: 'Мастер коллекционер',
    description: 'Соберите коллекцию из 25 игр',
    icon: 'Crown',
    rarity: 'epic',
    progress: 0,
    maxProgress: 25,
    unlocked: false,
    reward: { points: 1500, badge: '👑', title: 'Коллекционер' },
    category: 'collection'
  },
  {
    id: 'big-spender',
    title: 'Щедрый геймер',
    description: 'Потратьте 10000₽ на игры',
    icon: 'Wallet',
    rarity: 'rare',
    progress: 0,
    maxProgress: 10000,
    unlocked: false,
    reward: { points: 800, badge: '💰' },
    category: 'purchase'
  },
  {
    id: 'whale',
    title: 'Легенда магазина',
    description: 'Потратьте 50000₽ на игры',
    icon: 'Sparkles',
    rarity: 'legendary',
    progress: 0,
    maxProgress: 50000,
    unlocked: false,
    reward: { points: 5000, badge: '💎', title: 'VIP Покупатель' },
    category: 'purchase'
  },
  {
    id: 'social-5',
    title: 'Дружелюбный',
    description: 'Добавьте 5 друзей',
    icon: 'Users',
    rarity: 'common',
    progress: 0,
    maxProgress: 5,
    unlocked: false,
    reward: { points: 150, badge: '👥' },
    category: 'social'
  },
  {
    id: 'social-20',
    title: 'Популярный',
    description: 'Добавьте 20 друзей',
    icon: 'UserPlus',
    rarity: 'rare',
    progress: 0,
    maxProgress: 20,
    unlocked: false,
    reward: { points: 600, badge: '🌟' },
    category: 'social'
  },
  {
    id: 'reviewer',
    title: 'Критик',
    description: 'Напишите 5 отзывов на игры',
    icon: 'MessageSquare',
    rarity: 'rare',
    progress: 0,
    maxProgress: 5,
    unlocked: false,
    reward: { points: 400, badge: '✍️' },
    category: 'social'
  },
  {
    id: 'discount-hunter',
    title: 'Охотник за скидками',
    description: 'Купите 10 игр со скидкой',
    icon: 'Tag',
    rarity: 'rare',
    progress: 0,
    maxProgress: 10,
    unlocked: false,
    reward: { points: 500, badge: '🏷️' },
    category: 'purchase'
  },
  {
    id: 'early-bird',
    title: 'Ранняя пташка',
    description: 'Купите предзаказ игры',
    icon: 'Clock',
    rarity: 'epic',
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    reward: { points: 1000, badge: '⏰' },
    category: 'special'
  },
  {
    id: 'tournament-player',
    title: 'Участник турнира',
    description: 'Примите участие в турнире',
    icon: 'Trophy',
    rarity: 'rare',
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    reward: { points: 700, badge: '🏅' },
    category: 'tournament'
  },
  {
    id: 'tournament-winner',
    title: 'Чемпион',
    description: 'Победите в турнире',
    icon: 'Medal',
    rarity: 'legendary',
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    reward: { points: 3000, badge: '🥇', title: 'Чемпион' },
    category: 'tournament'
  },
  {
    id: 'wishlist-master',
    title: 'Мечтатель',
    description: 'Добавьте 20 игр в список желаний',
    icon: 'Heart',
    rarity: 'common',
    progress: 0,
    maxProgress: 20,
    unlocked: false,
    reward: { points: 200, badge: '💝' },
    category: 'collection'
  },
  {
    id: 'day-one',
    title: 'Первопроходец',
    description: 'Зарегистрируйтесь в первый день запуска',
    icon: 'Zap',
    rarity: 'mythic',
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    reward: { points: 10000, badge: '⚡', title: 'Легенда' },
    category: 'special'
  },
  {
    id: 'veteran',
    title: 'Ветеран',
    description: 'Пользуйтесь платформой 90 дней',
    icon: 'Calendar',
    rarity: 'epic',
    progress: 0,
    maxProgress: 90,
    unlocked: false,
    reward: { points: 2000, badge: '📅', title: 'Ветеран' },
    category: 'special'
  }
];

export function checkAchievements(stats: any): Achievement[] {
  const achievements = [...ACHIEVEMENTS];
  
  achievements.forEach(achievement => {
    switch (achievement.id) {
      case 'first-purchase':
        achievement.progress = Math.min(stats.totalPurchases, 1);
        achievement.unlocked = stats.totalPurchases >= 1;
        break;
      case 'collector-5':
        achievement.progress = Math.min(stats.gamesOwned, 5);
        achievement.unlocked = stats.gamesOwned >= 5;
        break;
      case 'collector-10':
        achievement.progress = Math.min(stats.gamesOwned, 10);
        achievement.unlocked = stats.gamesOwned >= 10;
        break;
      case 'collector-25':
        achievement.progress = Math.min(stats.gamesOwned, 25);
        achievement.unlocked = stats.gamesOwned >= 25;
        break;
      case 'big-spender':
        achievement.progress = Math.min(stats.totalSpent, 10000);
        achievement.unlocked = stats.totalSpent >= 10000;
        break;
      case 'whale':
        achievement.progress = Math.min(stats.totalSpent, 50000);
        achievement.unlocked = stats.totalSpent >= 50000;
        break;
      case 'social-5':
        achievement.progress = Math.min(stats.friendsCount, 5);
        achievement.unlocked = stats.friendsCount >= 5;
        break;
      case 'social-20':
        achievement.progress = Math.min(stats.friendsCount, 20);
        achievement.unlocked = stats.friendsCount >= 20;
        break;
      case 'reviewer':
        achievement.progress = Math.min(stats.reviewsWritten, 5);
        achievement.unlocked = stats.reviewsWritten >= 5;
        break;
      case 'wishlist-master':
        achievement.progress = Math.min(stats.wishlistSize, 20);
        achievement.unlocked = stats.wishlistSize >= 20;
        break;
    }
  });
  
  return achievements;
}
