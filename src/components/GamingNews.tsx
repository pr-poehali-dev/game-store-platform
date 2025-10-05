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
  url: string;
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: 'GTA 6 — новый трейлер и дата релиза 2025!',
    summary: 'Rockstar Games официально подтвердила выход GTA VI осенью 2025 года. Игра выйдет на PlayStation 5 и Xbox Series X/S с революционной графикой и огромным открытым миром.',
    category: 'announcement',
    date: '2025-10-03',
    source: 'Rockstar Games',
    url: 'https://www.rockstargames.com/gta-vi'
  },
  {
    id: 2,
    title: 'Elden Ring: Shadow of the Erdtree — DLC года',
    summary: 'Масштабное дополнение для Elden Ring получило 95/100 на Metacritic. Новые боссы, локации и 40+ часов геймплея. FromSoftware снова устанавливает новые стандарты.',
    category: 'release',
    date: '2025-10-02',
    source: 'FromSoftware',
    url: 'https://www.eldenring.com/shadowoftheerdtree'
  },
  {
    id: 3,
    title: 'The International 2025 по Dota 2 — призовой фонд $40 млн',
    summary: 'Крупнейший турнир по Dota 2 стартует в Сиэтле. Team Spirit, Team Liquid и PSG.LGD поборются за титул чемпионов. Финал 12 октября в Climate Pledge Arena.',
    category: 'esport',
    date: '2025-10-01',
    source: 'Valve',
    url: 'https://www.dota2.com/international'
  },
  {
    id: 4,
    title: 'Steam — осенняя распродажа! Скидки до 90%',
    summary: 'Baldur\'s Gate 3 (-30%), Cyberpunk 2077 (-50%), Red Dead Redemption 2 (-67%). Более 15,000 игр по сниженным ценам. Акция до 15 октября!',
    category: 'sale',
    date: '2025-09-30',
    source: 'Steam',
    url: 'https://store.steampowered.com/'
  },
  {
    id: 5,
    title: 'Call of Duty: Black Ops 6 — бета побила рекорды',
    summary: 'Открытая бета собрала 12 млн игроков за выходные. Новые карты Nuketown и Raid вернулись. Полный релиз 25 октября в Game Pass с первого дня.',
    category: 'update',
    date: '2025-09-29',
    source: 'Activision',
    url: 'https://www.callofduty.com/blackops6'
  },
  {
    id: 6,
    title: 'EA Sports FC 25 — режим Ultimate Team обновлён',
    summary: 'Новые Иконы: Зидан, Роналдиньо, Бекхэм. Улучшенный ИИ, реалистичная физика мяча и режим Rush 5v5. HyperMotionV технология для PS5/Xbox Series.',
    category: 'update',
    date: '2025-09-28',
    source: 'EA Sports',
    url: 'https://www.ea.com/games/ea-sports-fc/fc-25'
  },
  {
    id: 7,
    title: 'Hollow Knight: Silksong — новый геймплей!',
    summary: 'Team Cherry показала 10 минут нового геймплея. Релиз запланирован на начало 2026 года для всех платформ одновременно. Игра уже доступна для предзаказа.',
    category: 'announcement',
    date: '2025-09-27',
    source: 'Team Cherry',
    url: 'https://www.hollowknightsilksong.com/'
  },
  {
    id: 8,
    title: 'Counter-Strike 2 — Major в Копенгагене',
    summary: 'PGL Copenhagen Major собрал 24 лучшие команды мира. Natus Vincere, FaZe Clan и G2 Esports в плей-офф. Призовой фонд $1,250,000. Финал 13 октября.',
    category: 'esport',
    date: '2025-09-26',
    source: 'PGL Esports',
    url: 'https://www.counter-strike.net/'
  },
  {
    id: 9,
    title: 'Xbox Game Pass — октябрьские игры объявлены',
    summary: 'В подписку добавлены: Persona 5 Tactica, Payday 3, Jusant и еще 8 игр. Новый уровень Game Pass Ultimate с облачным геймингом 4K/60fps.',
    category: 'update',
    date: '2025-09-25',
    source: 'Xbox',
    url: 'https://www.xbox.com/xbox-game-pass'
  },
  {
    id: 10,
    title: 'Cyberpunk 2077: Phantom Liberty — миллион копий за неделю',
    summary: 'Дополнение с Идрисом Эльбой стало самым быстропродаваемым DLC в истории CD Projekt RED. Средняя оценка 89/100. Поддержка игры продолжается до 2026 года.',
    category: 'release',
    date: '2025-09-24',
    source: 'CD Projekt RED',
    url: 'https://www.cyberpunk.net/phantom-liberty'
  },
  {
    id: 11,
    title: 'Minecraft — обновление 1.21 "Tricky Trials"',
    summary: 'Новые структуры Trial Chambers, мобы Breeze и Bogged, медные лампочки и автокрафтер. Самое большое техническое обновление за 3 года.',
    category: 'update',
    date: '2025-09-23',
    source: 'Mojang Studios',
    url: 'https://www.minecraft.net/'
  },
  {
    id: 12,
    title: 'PlayStation 5 Pro — предзаказы стартовали',
    summary: 'Обновлённая консоль с GPU на 67% мощнее, рейтрейсингом в реальном времени и 2TB SSD. Цена $699. Релиз 7 ноября. Spider-Man 2 и GT7 с бесплатным апгрейдом.',
    category: 'announcement',
    date: '2025-09-22',
    source: 'PlayStation',
    url: 'https://www.playstation.com/ps5-pro'
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
    <div className="container mx-auto px-4 py-12" data-section="news">
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
              <Card 
                className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 hover:border-primary/50 bg-card/80 backdrop-blur-sm h-full cursor-pointer"
                onClick={() => window.open(news.url, '_blank')}
              >
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