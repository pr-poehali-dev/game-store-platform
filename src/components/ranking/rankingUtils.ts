import { RankTier, RANK_THRESHOLDS } from '@/types/ranking';

export const getRankIcon = (tier: RankTier): string => {
  const icons: Record<RankTier, string> = {
    iron: 'Minus',
    bronze: 'Award',
    silver: 'Zap',
    gold: 'Star',
    platinum: 'Gem',
    diamond: 'Diamond',
    master: 'Crown',
    grandmaster: 'Trophy',
    challenger: 'Flame',
  };
  return icons[tier] || 'Medal';
};

export const getRankColor = (tier: RankTier): string => {
  const colors: Record<RankTier, string> = {
    iron: 'text-gray-500',
    bronze: 'text-orange-700',
    silver: 'text-gray-400',
    gold: 'text-yellow-500',
    platinum: 'text-cyan-400',
    diamond: 'text-blue-400',
    master: 'text-purple-500',
    grandmaster: 'text-red-500',
    challenger: 'text-amber-400',
  };
  return colors[tier] || 'text-gray-500';
};

export const getRankGradient = (tier: RankTier): string => {
  const gradients: Record<RankTier, string> = {
    iron: 'from-gray-600 to-gray-800',
    bronze: 'from-orange-600 to-orange-900',
    silver: 'from-gray-300 to-gray-500',
    gold: 'from-yellow-400 to-yellow-600',
    platinum: 'from-cyan-400 to-cyan-600',
    diamond: 'from-blue-400 to-blue-600',
    master: 'from-purple-500 to-purple-700',
    grandmaster: 'from-red-500 to-red-700',
    challenger: 'from-amber-400 to-amber-600',
  };
  return gradients[tier] || 'from-gray-500 to-gray-700';
};

export const getNextTier = (currentTier: RankTier): RankTier | null => {
  const tiers: RankTier[] = ['iron', 'bronze', 'silver', 'gold', 'platinum', 'diamond', 'master', 'grandmaster', 'challenger'];
  const currentIndex = tiers.indexOf(currentTier);
  return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
};

export const calculateProgress = (currentElo: number, currentTier: RankTier): number => {
  const nextTier = getNextTier(currentTier);
  if (!nextTier) return 100;
  
  const currentThreshold = RANK_THRESHOLDS[currentTier];
  const nextThreshold = RANK_THRESHOLDS[nextTier];
  const progress = ((currentElo - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
  
  return Math.max(0, Math.min(100, progress));
};

export const formatTimeAgo = (timestamp: number): string => {
  const hours = Math.floor((Date.now() - timestamp) / 3600000);
  if (hours === 0) return 'Just now';
  if (hours === 1) return '1 hour ago';
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
};
