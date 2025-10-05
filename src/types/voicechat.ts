export interface VoiceChannel {
  id: string;
  name: string;
  type: 'public' | 'clan' | 'party' | 'private';
  maxUsers: number;
  users: VoiceUser[];
  createdBy: string;
  createdAt: number;
}

export interface VoiceUser {
  userId: string;
  username: string;
  avatar: string;
  isMuted: boolean;
  isDeafened: boolean;
  isSpeaking: boolean;
  volume: number;
}

export interface VoiceSettings {
  inputDevice: string;
  outputDevice: string;
  inputVolume: number;
  outputVolume: number;
  noiseSuppression: boolean;
  echoCancellation: boolean;
  pushToTalk: boolean;
  pushToTalkKey?: string;
}
