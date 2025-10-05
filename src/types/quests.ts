export type QuestType = 'daily' | 'weekly' | 'seasonal' | 'special';
export type QuestDifficulty = 'easy' | 'medium' | 'hard' | 'legendary';
export type QuestStatus = 'active' | 'completed' | 'claimed' | 'expired';

export interface QuestReward {
  type: 'currency' | 'xp' | 'item' | 'badge' | 'title';
  amount?: number;
  itemId?: string;
  itemName?: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  difficulty: QuestDifficulty;
  status: QuestStatus;
  progress: number;
  target: number;
  rewards: QuestReward[];
  expiresAt?: number;
  gameId?: number;
  gameName?: string;
}

export interface QuestCategory {
  type: QuestType;
  title: string;
  description: string;
  icon: string;
  quests: Quest[];
}
