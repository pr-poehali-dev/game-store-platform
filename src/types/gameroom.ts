export interface GameRoom {
  id: string;
  name: string;
  gameId: number;
  gameName: string;
  hostId: string;
  hostName: string;
  maxPlayers: number;
  currentPlayers: number;
  isPrivate: boolean;
  password?: string;
  status: 'waiting' | 'starting' | 'in-progress' | 'finished';
  players: RoomPlayer[];
  createdAt: number;
  settings: RoomSettings;
}

export interface RoomPlayer {
  userId: string;
  username: string;
  avatar: string;
  level: number;
  ready: boolean;
  team?: 'A' | 'B';
  isHost: boolean;
}

export interface RoomSettings {
  map?: string;
  mode?: string;
  difficulty?: 'easy' | 'normal' | 'hard' | 'expert';
  roundTime?: number;
  allowSpectators: boolean;
  autoBalance: boolean;
}
