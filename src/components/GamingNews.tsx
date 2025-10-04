import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  category: 'release' | 'update' | 'esport' | 'sale' | 'announcement';
  date: string;
  image?: string;
  source: string;
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: 'GTA 6 — новый трейлер и дата релиза!',
    summary: 'Rockstar Games представила новый геймплейный трейлер GTA 6. Выход игры запланирован на 2025 год.',
    category: 'announcement',
    date: '2024-10-03',
    source: 'Rockstar Games'
  },
  {
    id: 2,
    title: 'PlayStation Plus — новые игры октября',
    summary: 'В каталог PS Plus добавлены Cyberpunk 2077, Mortal Kombat 11 и еще 5 хитов.',
    category: 'update',
    date: '2024-10-02',
    source: 'PlayStation Blog'
  },
  {
    id: 3,
    title: 'Скидки до 80% на игры Ubisoft',
    summary: 'Грандиозная распродажа Assassin\'s Creed, Far Cry и Watch Dogs. Акция до 15 октября.',
    category: 'sale',
    date: '2024-10-01',
    source: 'Ubisoft Store'
  },
  {
    id: 4,
    title: 'The Game Awards 2024 — номинанты объявлены',
    summary: 'Baldur\'s Gate 3, Starfield и Alan Wake 2 поборются за звание игры года.',
    category: 'esport',
    date: '2024-09-30',
    source: 'The Game Awards'
  },
  {
    id: 5,
    title: 'Call of Duty: Modern Warfare III — новый сезон',
    summary: 'Вышел 6 сезон с новыми картами, оружием и режимом "Захват флага".',
    category: 'update',
    date: '2024-09-29',
    source: 'Activision'
  },
  {
    id: 6,
    title: 'EA Sports FC 25 бьёт рекорды продаж',
    summary: 'Новый футбольный симулятор от EA стал самым продаваемым за первую неделю.',
    category: 'release',
    date: '2024-09-28',
    source: 'Electronic Arts'
  }
];

const categoryConfig = {
  release: { label: 'Релиз', icon: 'Rocket', color: 'bg-primary' },
  update: { label: 'Обновление', icon: 'Download', color: 'bg-secondary' },
  esport: { label: 'Киберспорт', icon: 'Trophy', color: 'bg-accent' },
  sale: { label: 'Скидки', icon: 'Tag', color: 'bg-destructive' },
  announcement: { label: 'Анонс', icon: 'Megaphone', color: 'bg-yellow-500' }
};

export default function GamingNews() {
  const [filter, setFilter] = useState<string>('all');

  const filteredNews = filter === 'all' 
    ? mockNews 
    : mockNews.filter(news => news.category === filter);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
          📰 Новости гейминга
        </h2>
        <p className="text-muted-foreground">
          Самые свежие новости из мира игр
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <Badge
          variant={filter === 'all' ? 'default' : 'outline'}
          className="cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setFilter('all')}
        >
          Все новости
        </Badge>
        {Object.entries(categoryConfig).map(([key, config]) => (
          <Badge
            key={key}
            variant={filter === key ? 'default' : 'outline'}
            className="cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setFilter(key)}
          >
            <Icon name={config.icon as any} size={12} className="mr-1" />
            {config.label}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((news, index) => {
          const config = categoryConfig[news.category];
          
          return (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 hover:border-primary/50 bg-card/80 backdrop-blur-sm h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge className={`${config.color} text-white`}>
                      <Icon name={config.icon as any} size={12} className="mr-1" />
                      {config.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(news.date).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {news.title}
                  </CardTitle>
                  <CardDescription className="text-xs flex items-center gap-1 mt-1">
                    <Icon name="Newspaper" size={10} />
                    {news.source}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {news.summary}
                  </p>
                  
                  <div className="mt-4 flex items-center gap-2 text-xs text-primary group-hover:gap-3 transition-all">
                    <span>Читать далее</span>
                    <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
