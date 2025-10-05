export interface Clan {
  id: string;
  name: string;
  tag: string;
  logo: string;
  banner?: string;
  description: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  leaderId: number;
  leaderName: string;
  members: ClanMember[];
  maxMembers: number;
  isPublic: boolean;
  joinRequirements: ClanRequirements;
  stats: ClanStats;
  perks: ClanPerk[];
  wars: ClanWar[];
  vault: ClanVault;
  createdAt: number;
}

export interface ClanMember {
  userId: number;
  username: string;
  avatar: string;
  role: 'leader' | 'officer' | 'veteran' | 'member' | 'recruit';
  joinedAt: number;
  contributionPoints: number;
  rank: number;
  isOnline: boolean;
}

export interface ClanRequirements {
  minLevel: number;
  minGamesOwned: number;
  minAchievements: number;
  requireApplication: boolean;
}

export interface ClanStats {
  totalMembers: number;
  totalWins: number;
  totalLosses: number;
  winRate: number;
  tournamentWins: number;
  totalContribution: number;
  ranking: number;
}

export interface ClanPerk {
  id: string;
  name: string;
  description: string;
  icon: string;
  level: number;
  isUnlocked: boolean;
  cost: number;
  effect: string;
}

export interface ClanWar {
  id: string;
  opponentClanId: string;
  opponentClanName: string;
  opponentClanLogo: string;
  status: 'upcoming' | 'active' | 'completed';
  startTime: number;
  endTime: number;
  ourScore: number;
  theirScore: number;
  winner?: string;
  rewards: {
    coins: number;
    xp: number;
    items?: string[];
  };
}

export interface ClanVault {
  coins: number;
  gems: number;
  items: ClanVaultItem[];
}

export interface ClanVaultItem {
  id: string;
  name: string;
  type: 'boost' | 'cosmetic' | 'resource';
  quantity: number;
  icon: string;
}
