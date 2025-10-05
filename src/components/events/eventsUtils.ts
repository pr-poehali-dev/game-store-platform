import { GameEvent, EventReward } from '@/types/events';

export const getEventTypeIcon = (type: GameEvent['type']) => {
  switch (type) {
    case 'limited-time':
      return 'Clock';
    case 'seasonal':
      return 'Calendar';
    case 'holiday':
      return 'PartyPopper';
    case 'special':
      return 'Sparkles';
    case 'tournament':
      return 'Trophy';
    default:
      return 'Star';
  }
};

export const getEventTypeBadge = (type: GameEvent['type']) => {
  const badges: Record<GameEvent['type'], string> = {
    'limited-time': 'bg-red-500/20 text-red-500 border-red-500/30',
    seasonal: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
    holiday: 'bg-purple-500/20 text-purple-500 border-purple-500/30',
    special: 'bg-pink-500/20 text-pink-500 border-pink-500/30',
    tournament: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  };
  return badges[type];
};

export const getRarityColor = (rarity: EventReward['rarity']) => {
  const colors: Record<EventReward['rarity'], string> = {
    common: 'text-gray-500',
    rare: 'text-blue-500',
    epic: 'text-purple-500',
    legendary: 'text-orange-500',
    exclusive: 'text-pink-500',
  };
  return colors[rarity];
};

export const getRarityGradient = (rarity: EventReward['rarity']) => {
  const gradients: Record<EventReward['rarity'], string> = {
    common: 'from-gray-500/20 to-transparent',
    rare: 'from-blue-500/20 to-transparent',
    epic: 'from-purple-500/20 to-transparent',
    legendary: 'from-orange-500/20 to-transparent',
    exclusive: 'from-pink-500/20 to-transparent',
  };
  return gradients[rarity];
};

export const formatTimeRemaining = (endDate: number) => {
  const remaining = endDate - Date.now();
  if (remaining < 0) return 'Ended';
  
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  
  if (days > 0) return `${days}d ${hours}h remaining`;
  if (hours > 0) return `${hours}h remaining`;
  return 'Less than 1h remaining';
};

export const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};
