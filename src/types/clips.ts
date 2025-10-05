export interface GameClip {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  gameId: number;
  gameName: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  views: number;
  likes: number;
  comments: number;
  createdAt: number;
  tags: string[];
}

export interface Screenshot {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  gameId: number;
  gameName: string;
  imageUrl: string;
  description: string;
  views: number;
  likes: number;
  comments: number;
  createdAt: number;
  tags: string[];
}

export interface ClipComment {
  id: string;
  clipId: string;
  userId: string;
  username: string;
  userAvatar: string;
  text: string;
  createdAt: number;
  likes: number;
}
