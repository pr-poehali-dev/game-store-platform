export interface BattlePassReward {
  id: string;
  level: number;
  type: 'free' | 'premium';
  rewardType: 'skin' | 'emote' | 'currency' | 'item' | 'badge' | 'title';
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';
  claimed: boolean;
}

export interface BattlePassChallenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  xpReward: number;
  completed: boolean;
}

export interface BattlePassSeason {
  id: string;
  number: number;
  name: string;
  theme: string;
  startDate: number;
  endDate: number;
  active: boolean;
}

export interface BattlePassProgress {
  currentLevel: number;
  currentXP: number;
  xpForNextLevel: number;
  hasPremium: boolean;
  totalXPEarned: number;
}
