export interface GameEvent {
  id: string;
  title: string;
  description: string;
  type: 'limited-time' | 'seasonal' | 'holiday' | 'special' | 'tournament';
  gameId: number;
  gameName: string;
  bannerImage: string;
  startDate: number;
  endDate: number;
  active: boolean;
  rewards: EventReward[];
  challenges: EventChallenge[];
  participants: number;
  leaderboard: EventLeaderboardEntry[];
}

export interface EventReward {
  id: string;
  name: string;
  description: string;
  type: 'skin' | 'emote' | 'badge' | 'title' | 'currency' | 'lootbox';
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'exclusive';
  requirement: string;
}

export interface EventChallenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  points: number;
  completed: boolean;
}

export interface EventLeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  points: number;
  completedChallenges: number;
}
