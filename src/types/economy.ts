export interface Currency {
  coins: number;
  gems: number;
}

export interface Transaction {
  id: string;
  type: 'earn' | 'spend';
  amount: number;
  currency: 'coins' | 'gems';
  reason: string;
  timestamp: number;
}

export interface DailyReward {
  day: number;
  coins: number;
  gems: number;
  bonus?: string;
  claimed: boolean;
}

export interface CoinShop {
  id: string;
  name: string;
  description: string;
  cost: number;
  currency: 'coins' | 'gems';
  type: 'discount' | 'boost' | 'cosmetic' | 'premium';
  value?: number;
  icon: string;
}

export interface EarnMethod {
  id: string;
  name: string;
  description: string;
  reward: number;
  currency: 'coins' | 'gems';
  cooldown?: number;
  lastClaimed?: number;
  maxDaily?: number;
  currentDaily?: number;
}
