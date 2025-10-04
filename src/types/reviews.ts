export interface Review {
  id: string;
  gameId: number;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  helpful: number;
  notHelpful: number;
  createdAt: Date;
  verified: boolean;
  reactions: {
    like: number;
    funny: number;
    love: number;
    wow: number;
  };
}

export type ReviewFilter = 'all' | 'positive' | 'negative' | 'verified';

export interface ReviewFormData {
  rating: number;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
}
