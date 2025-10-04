export interface GameVersion {
  id: string;
  name: string;
  price: number;
  description: string;
  platform?: string;
  region?: string;
}

export interface Game {
  id: number;
  title: string;
  platform: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
  rating: number;
  release_year: number;
  discount?: number;
  isHot?: boolean;
  isNew?: boolean;
  region?: string;
  franchise?: string;
  fullDescription?: string;
  consoleModels?: string;
  competitorPrices?: {
    store: string;
    price: number;
    url?: string;
  }[];
  versions?: GameVersion[];
  reviewCount?: number;
  avgReviewRating?: number;
  cover_image?: string;
  screenshots?: string[];
  video_url?: string;
  metacritic_score?: number;
  release_date?: string;
}

export interface UserLevel {
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  experience_points: number;
  total_spent: number;
  purchases_count: number;
  level_info: {
    min: number;
    max: number;
    discount: number;
    next: string | null;
  };
  achievements: Achievement[];
}

export interface Achievement {
  type: string;
  achieved_at: string;
  metadata?: Record<string, any>;
}

export interface WishlistItem {
  id: number;
  game_id: number;
  notify_on_sale: boolean;
  added_at: string;
  game: {
    title: string;
    price: number;
    discount?: number;
    platform: string;
  };
}

export interface CashbackBalance {
  cashback_balance: number;
  bonus_points: number;
  updated_at: string;
}

export interface PriceHistory {
  price: number;
  discount: number;
  date: string;
}

export interface Gift {
  id: number;
  recipient_email: string;
  game_id: number;
  gift_code: string;
  message?: string;
  created_at: string;
  redeemed: boolean;
  game_title: string;
}

export interface Subscription {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  discount?: number;
  popular?: boolean;
}