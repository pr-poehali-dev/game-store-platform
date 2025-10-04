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