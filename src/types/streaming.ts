export interface StreamSettings {
  title: string;
  gameId: number;
  gameName: string;
  category: string;
  tags: string[];
  language: string;
  isForSubscribersOnly: boolean;
  isAgeRestricted: boolean;
  enableChat: boolean;
  enableDonations: boolean;
  chatMode: 'everyone' | 'followers' | 'subscribers';
}

export interface LiveStream {
  id: string;
  streamerId: number;
  streamerName: string;
  streamerAvatar: string;
  title: string;
  gameId: number;
  gameName: string;
  gameImage: string;
  viewers: number;
  peakViewers: number;
  thumbnail: string;
  streamUrl: string;
  chatUrl: string;
  startedAt: number;
  tags: string[];
  category: string;
  isLive: boolean;
  settings: StreamSettings;
  stats: StreamStats;
}

export interface StreamStats {
  totalViews: number;
  averageViewers: number;
  peakViewers: number;
  duration: number;
  followers: number;
  subscribers: number;
  donations: number;
}

export interface ChatMessage {
  id: string;
  userId: number;
  username: string;
  userAvatar: string;
  message: string;
  timestamp: number;
  isSubscriber: boolean;
  isModerator: boolean;
  isStreamer: boolean;
  badges: string[];
  emotes?: string[];
}

export interface Donation {
  id: string;
  donorId: number;
  donorName: string;
  amount: number;
  currency: 'coins' | 'gems' | 'real';
  message?: string;
  timestamp: number;
  isAnonymous: boolean;
}

export interface Subscription {
  id: string;
  streamerId: number;
  subscriberId: number;
  subscriberName: string;
  tier: 1 | 2 | 3;
  startDate: number;
  endDate: number;
  isActive: boolean;
  autoRenew: boolean;
}

export interface StreamerProfile {
  id: number;
  username: string;
  avatar: string;
  banner?: string;
  bio: string;
  followers: number;
  subscribers: number;
  totalViews: number;
  isLive: boolean;
  isPartner: boolean;
  schedule: StreamSchedule[];
  socialLinks: SocialLinks;
  badges: string[];
}

export interface StreamSchedule {
  day: number;
  startTime: string;
  endTime: string;
  game?: string;
  description?: string;
}

export interface SocialLinks {
  youtube?: string;
  twitter?: string;
  instagram?: string;
  discord?: string;
  website?: string;
}
