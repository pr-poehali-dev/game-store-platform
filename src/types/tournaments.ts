export type TournamentStatus = 'upcoming' | 'registration' | 'live' | 'completed';
export type TournamentFormat = 'single-elimination' | 'double-elimination' | 'round-robin' | 'swiss';

export interface Tournament {
  id: string;
  name: string;
  gameId: number;
  gameName: string;
  gameImage: string;
  description: string;
  format: TournamentFormat;
  status: TournamentStatus;
  startDate: number;
  endDate?: number;
  registrationDeadline: number;
  maxParticipants: number;
  currentParticipants: number;
  prizePool: number;
  currency: 'coins' | 'gems' | 'real';
  entryFee?: number;
  organizer: string;
  organizerAvatar: string;
  rules: string[];
  prizes: TournamentPrize[];
  matches: Match[];
  participants: TournamentParticipant[];
  tags: string[];
}

export interface TournamentPrize {
  place: number;
  reward: number;
  currency: 'coins' | 'gems' | 'real';
  badge?: string;
  title?: string;
}

export interface Match {
  id: string;
  tournamentId: string;
  round: number;
  matchNumber: number;
  participant1?: TournamentParticipant;
  participant2?: TournamentParticipant;
  score1?: number;
  score2?: number;
  winner?: string;
  scheduledTime: number;
  status: 'scheduled' | 'live' | 'completed';
  streamUrl?: string;
}

export interface TournamentParticipant {
  id: string;
  type: 'player' | 'team';
  name: string;
  avatar: string;
  members?: string[];
  seed?: number;
  wins: number;
  losses: number;
  points: number;
}

export interface Leaderboard {
  tournamentId: string;
  entries: LeaderboardEntry[];
  lastUpdated: number;
}

export interface LeaderboardEntry {
  rank: number;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  wins: number;
  losses: number;
  points: number;
  prize?: TournamentPrize;
  trend?: 'up' | 'down' | 'same';
}
