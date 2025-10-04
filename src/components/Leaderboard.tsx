import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';

interface Player {
  id: number;
  name: string;
  level: number;
  exp: number;
  maxExp: number;
  achievements: number;
  purchases: number;
  cashback: number;
  avatar: string;
  rank: number;
  title: string;
}

const generateMockPlayers = (): Player[] => {
  const names = [
    'ProGamer2024', 'ShadowHunter', 'NightWolf', 'DragonSlayer', 'PhoenixRising',
    'ThunderStrike', 'IceQueen', 'DarkKnight', 'StarLord', 'MysticMage',
    'CyberNinja', 'GoldenEagle', 'SilverFox', 'IronFist', 'VenomSnake'
  ];
  
  const titles = [
    '🏆 Легенда магазина', '⭐ Мастер скидок', '💎 VIP покупатель', 
    '🎮 Коллекционер', '🔥 Активный игрок', '⚡ Быстрый покупатель',
    '🌟 Ценитель качества', '🎯 Охотник за играми'
  ];

  return names.map((name, index) => ({
    id: index + 1,
    name,
    level: Math.floor(Math.random() * 50) + 10,
    exp: Math.floor(Math.random() * 800) + 200,
    maxExp: 1000,
    achievements: Math.floor(Math.random() * 15) + 5,
    purchases: Math.floor(Math.random() * 30) + 10,
    cashback: Math.floor(Math.random() * 5000) + 1000,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    rank: index + 1,
    title: titles[Math.floor(Math.random() * titles.length)]
  }))
  .sort((a, b) => b.cashback - a.cashback)
  .map((player, index) => ({ ...player, rank: index + 1 }));
};

export default function Leaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer] = useState<Player>({
    id: 999,
    name: localStorage.getItem('playerName') || 'Вы',
    level: parseInt(localStorage.getItem('playerLevel') || '15'),
    exp: 650,
    maxExp: 1000,
    achievements: 7,
    purchases: 12,
    cashback: 2500,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
    rank: 8,
    title: '🎮 Активный игрок'
  });

  useEffect(() => {
    setPlayers(generateMockPlayers());
  }, []);

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-500 to-orange-500';
    if (rank === 2) return 'from-gray-400 to-gray-500';
    if (rank === 3) return 'from-orange-700 to-orange-800';
    return 'from-primary to-secondary';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '👑';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🏅';
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
          🏆 Таблица лидеров
        </h2>
        <p className="text-muted-foreground">
          Лучшие игроки магазина по заработанному кешбэку
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="User" size={20} className="text-primary" />
              Ваша статистика
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-20 h-20 border-4 border-primary">
                <img src={currentPlayer.avatar} alt={currentPlayer.name} />
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold">{currentPlayer.name}</h3>
                  <Badge className="bg-gradient-to-r from-primary to-secondary">
                    LVL {currentPlayer.level}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{currentPlayer.title}</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Опыт до следующего уровня</span>
                    <span className="font-semibold">{currentPlayer.exp}/{currentPlayer.maxExp}</span>
                  </div>
                  <Progress value={(currentPlayer.exp / currentPlayer.maxExp) * 100} className="h-2" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <Icon name="Trophy" size={20} className="mx-auto mb-1 text-primary" />
                <div className="text-2xl font-bold text-primary">{currentPlayer.achievements}</div>
                <div className="text-xs text-muted-foreground">Достижений</div>
              </div>
              <div className="text-center p-3 bg-secondary/10 rounded-lg">
                <Icon name="ShoppingBag" size={20} className="mx-auto mb-1 text-secondary" />
                <div className="text-2xl font-bold text-secondary">{currentPlayer.purchases}</div>
                <div className="text-xs text-muted-foreground">Покупок</div>
              </div>
              <div className="text-center p-3 bg-accent/10 rounded-lg">
                <Icon name="Coins" size={20} className="mx-auto mb-1 text-accent" />
                <div className="text-2xl font-bold text-accent">{currentPlayer.cashback}₽</div>
                <div className="text-xs text-muted-foreground">Кешбэк</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Award" size={20} className="text-yellow-500" />
              Ваше место
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text mb-2">
              #{currentPlayer.rank}
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              в общем рейтинге
            </p>
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1">
              ТОП-10
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Лучшие игроки месяца</CardTitle>
          <CardDescription>Рейтинг обновляется каждый день</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {players.slice(0, 10).map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  className={`overflow-hidden transition-all hover:scale-[1.02] ${
                    player.rank <= 3 ? `bg-gradient-to-r ${getRankColor(player.rank)}/10 border-2` : 'bg-card/50'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`text-3xl font-bold ${
                        player.rank <= 3 ? 'text-4xl' : ''
                      }`}>
                        {getRankIcon(player.rank)}
                      </div>
                      
                      <div className={`text-2xl font-bold ${
                        player.rank <= 3 ? 'text-3xl' : 'text-muted-foreground'
                      }`}>
                        #{player.rank}
                      </div>

                      <Avatar className={`${
                        player.rank === 1 ? 'w-16 h-16 border-4 border-yellow-500' :
                        player.rank === 2 ? 'w-14 h-14 border-4 border-gray-400' :
                        player.rank === 3 ? 'w-14 h-14 border-4 border-orange-700' :
                        'w-12 h-12 border-2 border-border'
                      }`}>
                        <img src={player.avatar} alt={player.name} />
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{player.name}</h3>
                          <Badge variant="outline" className="text-xs">LVL {player.level}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{player.title}</p>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1 text-lg font-bold text-primary mb-1">
                          <Icon name="Coins" size={16} />
                          {player.cashback.toLocaleString()}₽
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon name="Trophy" size={12} />
                            {player.achievements}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="ShoppingBag" size={12} />
                            {player.purchases}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>💡 Зарабатывайте кешбэк покупками и поднимайтесь в рейтинге!</p>
        <p>Топ-3 игроков месяца получают эксклюзивные бонусы 🎁</p>
      </div>
    </div>
  );
}
