export interface GamerProfile {
  id: number;
  username: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  gems: number;
  title?: string;
  bio?: string;
  joinDate: string;
  lastOnline: string;
  status: 'online' | 'offline' | 'in-game' | 'away';
  currentGame?: string;
  stats: ProfileStats;
  badges: Badge[];
  friends: number[];
  teams: string[];
}

export interface ProfileStats {
  gamesOwned: number;
  totalPlayTime: number;
  achievementsUnlocked: number;
  totalSpent: number;
  favoritePlatform: string;
  favoriteGenre: string;
  reviewsWritten: number;
  tournamentsWon: number;
  winRate?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: number;
}

export interface Friend {
  id: number;
  username: string;
  avatar: string;
  level: number;
  status: 'online' | 'offline' | 'in-game' | 'away';
  currentGame?: string;
  mutualFriends: number;
  friendSince: string;
}

export interface Team {
  id: string;
  name: string;
  tag: string;
  logo: string;
  description: string;
  ownerId: number;
  members: TeamMember[];
  maxMembers: number;
  createdAt: string;
  stats: TeamStats;
  isPublic: boolean;
}

export interface TeamMember {
  userId: number;
  username: string;
  avatar: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
  contribution: number;
}

export interface TeamStats {
  tournamentsWon: number;
  totalMatches: number;
  winRate: number;
  ranking: number;
}

export interface FriendRequest {
  id: string;
  fromUserId: number;
  fromUsername: string;
  fromAvatar: string;
  fromLevel: number;
  message?: string;
  timestamp: number;
}
