export interface GameStats {
  gameId: number;
  gameName: string;
  hoursPlayed: number;
  lastPlayed: number;
  achievementsUnlocked: number;
  totalAchievements: number;
}

export interface PlayerStats {
  userId: string;
  totalHoursPlayed: number;
  gamesOwned: number;
  achievementScore: number;
  level: number;
  xp: number;
  joinDate: number;
  topGames: GameStats[];
  activityByDay: { date: string; hours: number }[];
  activityByHour: { hour: number; sessions: number }[];
}

export interface ComparisonStats {
  myStats: PlayerStats;
  friendStats: PlayerStats;
  comparison: {
    hoursPlayedDiff: number;
    levelDiff: number;
    achievementsDiff: number;
  };
}
