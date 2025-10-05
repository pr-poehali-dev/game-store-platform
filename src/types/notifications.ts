export type NotificationType = 
  | 'friend_request'
  | 'friend_accepted'
  | 'game_invite'
  | 'team_invite'
  | 'new_game'
  | 'game_discount'
  | 'achievement'
  | 'message'
  | 'tournament'
  | 'friend_online'
  | 'stream_started';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  icon?: string;
  image?: string;
  timestamp: number;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  priority: 'low' | 'medium' | 'high';
  data?: Record<string, any>;
}

export interface ActivityFeedItem {
  id: string;
  userId: number;
  username: string;
  avatar: string;
  type: 'game_purchase' | 'achievement' | 'review' | 'friend_added' | 'tournament_win' | 'level_up';
  title: string;
  description: string;
  timestamp: number;
  gameId?: number;
  gameName?: string;
  gameImage?: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: number;
  senderName: string;
  senderAvatar: string;
  recipientId: number;
  content: string;
  timestamp: number;
  read: boolean;
  type: 'text' | 'image' | 'game_invite' | 'voice';
  attachments?: ChatAttachment[];
}

export interface ChatAttachment {
  id: string;
  type: 'image' | 'video' | 'file';
  url: string;
  name: string;
  size: number;
}

export interface ChatConversation {
  id: string;
  participantId: number;
  participantName: string;
  participantAvatar: string;
  participantStatus: 'online' | 'offline' | 'in-game' | 'away';
  lastMessage: string;
  lastMessageTime: number;
  unreadCount: number;
  isPinned: boolean;
}

export interface Stream {
  id: string;
  streamerId: number;
  streamerName: string;
  streamerAvatar: string;
  title: string;
  gameId: number;
  gameName: string;
  gameImage: string;
  viewers: number;
  thumbnail: string;
  startedAt: number;
  tags: string[];
  isLive: boolean;
}
