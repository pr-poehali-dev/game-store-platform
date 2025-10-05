export interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  uploadDate: string;
  author: {
    name: string;
    avatar: string;
  };
  description: string;
  tags: string[];
  comments: VideoComment[];
  videoUrl: string;
}

export interface VideoComment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  likes: number;
  timestamp: string;
}

export const mockVideos: Video[] = [
  {
    id: 1,
    title: 'CS2 - ACE на Mirage! Невероятная катка 1v5',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    duration: '12:34',
    views: 45200,
    likes: 3420,
    uploadDate: '2 дня назад',
    author: {
      name: 'ProGamerRU',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProGamerRU'
    },
    description: 'Лучший момент недели! Смог вытащить раунд 1 против 5 на Mirage. Смотрите как правильно использовать позиции и тайминги.',
    tags: ['CS2', 'ACE', 'Clutch', 'Highlights'],
    videoUrl: 'dQw4w9WgXcQ',
    comments: [
      {
        id: 1,
        author: 'GamerBoy228',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GamerBoy',
        text: 'Невероятно! Как ты так аимишь? 🔥',
        likes: 45,
        timestamp: '1 час назад'
      },
      {
        id: 2,
        author: 'CS_Fan',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CSFan',
        text: 'Респект за клатч! Научи играть',
        likes: 23,
        timestamp: '3 часа назад'
      }
    ]
  },
  {
    id: 2,
    title: 'Elden Ring - Битва с боссом Malenia (No Hit)',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
    duration: '8:45',
    views: 67800,
    likes: 5120,
    uploadDate: '1 неделю назад',
    author: {
      name: 'SpeedRunner228',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SpeedRunner'
    },
    description: 'После 200+ попыток наконец получилось! Malenia без единого урона. Разбор стратегии и паттернов босса.',
    tags: ['Elden Ring', 'Boss Fight', 'No Hit', 'Souls-like'],
    videoUrl: 'jNQXAC9IVRw',
    comments: [
      {
        id: 3,
        author: 'SoulsLover',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Souls',
        text: 'Легенда! Я 500 раз умер на этом боссе',
        likes: 89,
        timestamp: '2 дня назад'
      }
    ]
  },
  {
    id: 3,
    title: 'Valorant - Top 5 играх недели от сообщества',
    thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
    duration: '15:20',
    views: 32100,
    likes: 2340,
    uploadDate: '3 дня назад',
    author: {
      name: 'RPGMaster',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RPGMaster'
    },
    description: 'Собрал лучшие клипы от зрителей! Невероятные ACE, 200 IQ моменты и эпичные фейлы.',
    tags: ['Valorant', 'Top 5', 'Community', 'Highlights'],
    videoUrl: 'dQw4w9WgXcQ',
    comments: []
  },
  {
    id: 4,
    title: 'Baldurs Gate 3 - Секретная концовка! (Спойлеры)',
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80',
    duration: '22:10',
    views: 18900,
    likes: 1560,
    uploadDate: '5 дней назад',
    author: {
      name: 'RPGMaster',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RPGMaster'
    },
    description: 'Нашел скрытую концовку игры! Все секреты и пасхалки третьего акта.',
    tags: ['Baldurs Gate 3', 'Секреты', 'RPG', 'Гайд'],
    videoUrl: 'jNQXAC9IVRw',
    comments: [
      {
        id: 4,
        author: 'RPG_Veteran',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Veteran',
        text: 'Спасибо! Не знал про эту концовку',
        likes: 67,
        timestamp: '1 день назад'
      }
    ]
  },
  {
    id: 5,
    title: 'Cyberpunk 2077 - Phantom Liberty полное прохождение #1',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    duration: '45:30',
    views: 89300,
    likes: 6780,
    uploadDate: '2 недели назад',
    author: {
      name: 'HorrorQueen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HorrorQueen'
    },
    description: 'Начинаю проходить новое DLC! Сюжет, графика, геймплей - все в этом видео.',
    tags: ['Cyberpunk 2077', 'Phantom Liberty', 'Прохождение', 'DLC'],
    videoUrl: 'dQw4w9WgXcQ',
    comments: []
  },
  {
    id: 6,
    title: 'Hollow Knight - All Bosses Speedrun (32:14 WR)',
    thumbnail: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&q=80',
    duration: '32:14',
    views: 123400,
    likes: 9870,
    uploadDate: '1 месяц назад',
    author: {
      name: 'SpeedRunner228',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SpeedRunner'
    },
    description: 'НОВЫЙ МИРОВОЙ РЕКОРД! Все боссы за 32 минуты 14 секунд. Разбор маршрута и оптимизации.',
    tags: ['Hollow Knight', 'Speedrun', 'World Record', 'All Bosses'],
    videoUrl: 'jNQXAC9IVRw',
    comments: [
      {
        id: 5,
        author: 'SpeedrunFan',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fan',
        text: 'Безумие! Поздравляю с рекордом!',
        likes: 234,
        timestamp: '1 неделю назад'
      }
    ]
  }
];

export const formatViews = (views: number): string => {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString();
};
