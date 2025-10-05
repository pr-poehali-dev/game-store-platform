export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: AchievementRarity;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: string;
  reward: {
    points: number;
    badge?: string;
    title?: string;
  };
  category: 'purchase' | 'social' | 'collection' | 'special' | 'tournament';
}

export interface UserStats {
  totalPurchases: number;
  totalSpent: number;
  gamesOwned: number;
  wishlistSize: number;
  friendsCount: number;
  reviewsWritten: number;
  tournamentsParticipated: number;
  level: number;
  xp: number;
  nextLevelXp: number;
  totalAchievements: number;
  unlockedAchievements: number;
}

export const ACHIEVEMENT_COLORS: Record<AchievementRarity, string> = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-orange-400 to-orange-600',
  mythic: 'from-pink-400 via-purple-500 to-cyan-500'
};

export const ACHIEVEMENT_POINTS: Record<AchievementRarity, number> = {
  common: 100,
  rare: 300,
  epic: 800,
  legendary: 2000,
  mythic: 5000
};
