export interface Tournament {
  id: number;
  title: string;
  game: string;
  platform: 'Xbox' | 'PlayStation' | 'Both';
  prizePool: number;
  participants: number;
  maxParticipants: number;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'finished';
  image: string;
  format: string;
  rules: string[];
}

export const initialTournaments: Tournament[] = [
  {
    id: 1,
    title: 'FIFA 24 Championship',
    game: 'FIFA 24',
    platform: 'Both',
    prizePool: 50000,
    participants: 145,
    maxParticipants: 256,
    startDate: '2025-10-15',
    endDate: '2025-10-20',
    status: 'upcoming',
    image: '/img/07b31484-fafc-4615-a8a0-3f3514bc568a.jpg',
    format: 'Single Elimination',
    rules: ['Возраст 16+', 'Без читов', 'Максимум 3 замены']
  },
  {
    id: 2,
    title: 'Call of Duty Warzone Battle',
    game: 'Call of Duty: Warzone',
    platform: 'Xbox',
    prizePool: 100000,
    participants: 64,
    maxParticipants: 128,
    startDate: '2025-10-08',
    endDate: '2025-10-12',
    status: 'active',
    image: '/img/07b31484-fafc-4615-a8a0-3f3514bc568a.jpg',
    format: 'Battle Royale',
    rules: ['Только соло', 'Запрещены взрывчатки', 'Убийства = очки']
  },
  {
    id: 3,
    title: 'Rocket League Pro League',
    game: 'Rocket League',
    platform: 'PlayStation',
    prizePool: 75000,
    participants: 32,
    maxParticipants: 64,
    startDate: '2025-10-10',
    endDate: '2025-10-14',
    status: 'upcoming',
    image: '/img/07b31484-fafc-4615-a8a0-3f3514bc568a.jpg',
    format: '3v3 Teams',
    rules: ['Командная игра', 'Без модификаций', 'Стандартные арены']
  },
  {
    id: 4,
    title: 'Elden Ring Speedrun',
    game: 'Elden Ring',
    platform: 'Both',
    prizePool: 25000,
    participants: 89,
    maxParticipants: 100,
    startDate: '2025-09-25',
    endDate: '2025-09-30',
    status: 'finished',
    image: '/img/07b31484-fafc-4615-a8a0-3f3514bc568a.jpg',
    format: 'Any% Speedrun',
    rules: ['Любые глитчи разрешены', 'Без модов', 'Таймер обязателен']
  }
];
