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