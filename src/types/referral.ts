export interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarned: number;
  currency: 'coins' | 'gems' | 'real';
  referralCode: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
}

export interface ReferredUser {
  id: string;
  username: string;
  avatar: string;
  joinedAt: number;
  level: number;
  isActive: boolean;
  earnedFromUser: number;
}

export interface ReferralReward {
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  referralsRequired: number;
  bonusPercentage: number;
  rewards: {
    coins: number;
    gems: number;
    special?: string;
  };
}

export const REFERRAL_TIERS: ReferralReward[] = [
  { tier: 'bronze', referralsRequired: 0, bonusPercentage: 5, rewards: { coins: 100, gems: 0 } },
  { tier: 'silver', referralsRequired: 5, bonusPercentage: 10, rewards: { coins: 500, gems: 10 } },
  { tier: 'gold', referralsRequired: 15, bonusPercentage: 15, rewards: { coins: 2000, gems: 50, special: 'Золотой бейдж' } },
  { tier: 'platinum', referralsRequired: 50, bonusPercentage: 25, rewards: { coins: 10000, gems: 200, special: 'Платиновый скин' } },
  { tier: 'diamond', referralsRequired: 100, bonusPercentage: 50, rewards: { coins: 50000, gems: 1000, special: 'Алмазный титул' } },
];
