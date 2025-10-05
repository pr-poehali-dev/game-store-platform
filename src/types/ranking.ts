export type RankTier = 'iron' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'master' | 'grandmaster' | 'challenger';

export interface PlayerRanking {
  userId: string;
  username: string;
  avatar: string;
  gameId: number;
  gameName: string;
  tier: RankTier;
  division: number;
  elo: number;
  wins: number;
  losses: number;
  winRate: number;
  streak: number;
  peakElo: number;
  rank: number;
  region: string;
}

export interface RankProgress {
  currentElo: number;
  nextTierElo: number;
  progress: number;
  recentMatches: MatchResult[];
}

export interface MatchResult {
  id: string;
  gameId: number;
  result: 'win' | 'loss' | 'draw';
  eloChange: number;
  kda?: string;
  mvp: boolean;
  timestamp: number;
}

export const RANK_THRESHOLDS: Record<RankTier, number> = {
  iron: 0,
  bronze: 400,
  silver: 800,
  gold: 1200,
  platinum: 1600,
  diamond: 2000,
  master: 2400,
  grandmaster: 2800,
  challenger: 3200,
};
