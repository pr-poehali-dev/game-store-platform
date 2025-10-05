import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { PlayerStats as PlayerStatsType } from '@/types/stats';
import Icon from '@/components/ui/icon';

export default function PlayerStats() {
  const [stats] = useState<PlayerStatsType>({
    userId: '1',
    totalHoursPlayed: 1234,
    gamesOwned: 87,
    achievementScore: 12450,
    level: 47,
    xp: 23400,
    joinDate: Date.now() - 365 * 24 * 60 * 60 * 1000,
    topGames: [
      {
        gameId: 1,
        gameName: 'Cyberpunk 2077',
        hoursPlayed: 342,
        lastPlayed: Date.now() - 86400000,
        achievementsUnlocked: 45,
        totalAchievements: 60,
      },
      {
        gameId: 2,
        gameName: 'Valorant',
        hoursPlayed: 287,
        lastPlayed: Date.now() - 3600000,
        achievementsUnlocked: 32,
        totalAchievements: 50,
      },
      {
        gameId: 3,
        gameName: 'CS:GO',
        hoursPlayed: 198,
        lastPlayed: Date.now() - 172800000,
        achievementsUnlocked: 28,
        totalAchievements: 40,
      },
    ],
    activityByDay: [
      { date: '2024-01-01', hours: 8 },
      { date: '2024-01-02', hours: 6 },
      { date: '2024-01-03', hours: 12 },
      { date: '2024-01-04', hours: 4 },
      { date: '2024-01-05', hours: 10 },
      { date: '2024-01-06', hours: 7 },
      { date: '2024-01-07', hours: 9 },
    ],
    activityByHour: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      sessions: Math.floor(Math.random() * 50),
    })),
  });

  const nextLevelXP = 50000;
  const xpProgress = (stats.xp / nextLevelXP) * 100;

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img
              src="/api/placeholder/80/80"
              alt="Avatar"
              className="w-20 h-20 rounded-full border-4 border-white"
            />
            <div>
              <h2 className="text-3xl font-bold">Твоя статистика</h2>
              <p className="text-white/80">
                На платформе с {new Date(stats.joinDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold">{stats.level}</div>
            <div className="text-sm">Уровень</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Прогресс до {stats.level + 1} уровня</span>
            <span className="text-sm">{stats.xp.toLocaleString()} / {nextLevelXP.toLocaleString()} XP</span>
          </div>
          <Progress value={xpProgress} className="h-3 bg-white/20" />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white/20 rounded-lg p-3">
            <Icon name="Clock" size={20} className="mb-2" />
            <div className="text-2xl font-bold">{stats.totalHoursPlayed}</div>
            <div className="text-sm">Часов в игре</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <Icon name="Gamepad2" size={20} className="mb-2" />
            <div className="text-2xl font-bold">{stats.gamesOwned}</div>
            <div className="text-sm">Игр куплено</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <Icon name="Trophy" size={20} className="mb-2" />
            <div className="text-2xl font-bold">{stats.achievementScore}</div>
            <div className="text-sm">Очков достижений</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <Icon name="TrendingUp" size={20} className="mb-2" />
            <div className="text-2xl font-bold">
              {(stats.totalHoursPlayed / ((Date.now() - stats.joinDate) / (1000 * 60 * 60 * 24))).toFixed(1)}
            </div>
            <div className="text-sm">ч/день</div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="games">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="games">Топ игры</TabsTrigger>
          <TabsTrigger value="activity">Активность</TabsTrigger>
          <TabsTrigger value="achievements">Достижения</TabsTrigger>
          <TabsTrigger value="compare">Сравнить</TabsTrigger>
        </TabsList>

        <TabsContent value="games" className="mt-6">
          <div className="space-y-4">
            {stats.topGames.map((game, index) => (
              <Card key={game.gameId} className="p-4 hover:bg-accent transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-muted-foreground w-8">#{index + 1}</div>
                  <img
                    src={`/api/placeholder/80/80`}
                    alt={game.gameName}
                    className="w-20 h-20 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{game.gameName}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        {game.hoursPlayed} часов
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Trophy" size={14} />
                        {game.achievementsUnlocked}/{game.totalAchievements}
                      </span>
                      <span>
                        Последняя игра: {new Date(game.lastPlayed).toLocaleDateString()}
                      </span>
                    </div>
                    <Progress
                      value={(game.achievementsUnlocked / game.totalAchievements) * 100}
                      className="mt-2"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">📅 Активность по дням</h3>
              <div className="space-y-2">
                {stats.activityByDay.map((day) => (
                  <div key={day.date} className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-24">{day.date}</span>
                    <Progress value={(day.hours / 12) * 100} className="flex-1" />
                    <span className="text-sm font-medium w-16">{day.hours}ч</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">🕐 Активность по часам</h3>
              <div className="flex items-end gap-1 h-48">
                {stats.activityByHour.map((hour) => (
                  <div
                    key={hour.hour}
                    className="flex-1 bg-primary rounded-t transition-all hover:bg-primary/80"
                    style={{ height: `${(hour.sessions / 50) * 100}%` }}
                    title={`${hour.hour}:00 - ${hour.sessions} сессий`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>0:00</span>
                <span>6:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>23:00</span>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.topGames.map((game) => (
              <Card key={game.gameId} className="p-4">
                <h4 className="font-bold mb-3">{game.gameName}</h4>
                <div className="space-y-2">
                  <Progress
                    value={(game.achievementsUnlocked / game.totalAchievements) * 100}
                    className="h-2"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {game.achievementsUnlocked}/{game.totalAchievements}
                    </span>
                    <Badge>
                      {((game.achievementsUnlocked / game.totalAchievements) * 100).toFixed(0)}%
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compare" className="mt-6">
          <Card className="p-12 text-center">
            <Icon name="Users" size={64} className="mx-auto mb-4 opacity-30" />
            <h3 className="text-xl font-bold mb-2">Сравни с друзьями</h3>
            <p className="text-muted-foreground mb-4">
              Выбери друга, чтобы сравнить статистику
            </p>
            <Button>
              <Icon name="Search" size={16} className="mr-2" />
              Найти друга
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
