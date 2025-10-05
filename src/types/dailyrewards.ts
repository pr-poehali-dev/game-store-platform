export interface DailyReward {
  day: number;
  type: 'coins' | 'gems' | 'lootbox' | 'item' | 'xp';
  amount: number;
  name: string;
  image?: string;
  claimed: boolean;
}

export interface DailyStreak {
  currentStreak: number;
  longestStreak: number;
  lastClaimDate: number;
  nextRewardDay: number;
  rewards: DailyReward[];
}

export interface WheelSegment {
  id: string;
  type: 'coins' | 'gems' | 'lootbox' | 'item' | 'xp' | 'nothing';
  value: number;
  label: string;
  color: string;
  probability: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  rewardType: 'coins' | 'gems' | 'xp';
  rewardAmount: number;
  progress: number;
  target: number;
  completed: boolean;
}
