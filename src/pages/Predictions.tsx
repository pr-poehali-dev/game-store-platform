import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Match {
  id: number;
  team1: string;
  team2: string;
  game: string;
  date: string;
  prediction: {
    team1Win: number;
    team2Win: number;
    confidence: number;
  };
  status: 'upcoming' | 'live' | 'finished';
  result?: string;
}

export default function Predictions() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'live' | 'finished'>('upcoming');

  const matches: Match[] = [
    {
      id: 1,
      team1: 'Team Spirit',
      team2: 'Natus Vincere',
      game: 'Dota 2',
      date: '2025-10-06 18:00',
      prediction: { team1Win: 65, team2Win: 35, confidence: 87 },
      status: 'upcoming',
    },
    {
      id: 2,
      team1: 'FaZe Clan',
      team2: 'G2 Esports',
      game: 'CS:GO',
      date: '2025-10-06 20:00',
      prediction: { team1Win: 52, team2Win: 48, confidence: 72 },
      status: 'live',
    },
    {
      id: 3,
      team1: 'T1',
      team2: 'Gen.G',
      game: 'League of Legends',
      date: '2025-10-05 15:00',
      prediction: { team1Win: 58, team2Win: 42, confidence: 81 },
      status: 'finished',
      result: 'team1',
    },
  ];

  const filteredMatches = matches.filter(m => m.status === activeTab);

  const getPredictionColor = (percentage: number) => {
    if (percentage >= 60) return 'text-green-500';
    if (percentage >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Brain" size={40} className="text-primary" />
            <h1 className="text-4xl font-bold">ИИ Прогнозы матчей</h1>
          </div>
          <p className="text-muted-foreground">
            Нейросеть анализирует статистику команд и даёт прогнозы на матчи
          </p>
        </div>

        <Card className="p-6 mb-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">87%</div>
              <div className="text-sm text-muted-foreground">Точность прогнозов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">1,247</div>
              <div className="text-sm text-muted-foreground">Всего прогнозов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">523</div>
              <div className="text-sm text-muted-foreground">Успешных ставок</div>
            </div>
          </div>
        </Card>

        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'upcoming' ? 'default' : 'outline'}
            onClick={() => setActiveTab('upcoming')}
          >
            <Icon name="Calendar" size={16} className="mr-2" />
            Предстоящие
          </Button>
          <Button
            variant={activeTab === 'live' ? 'default' : 'outline'}
            onClick={() => setActiveTab('live')}
          >
            <Icon name="Radio" size={16} className="mr-2" />
            Live
          </Button>
          <Button
            variant={activeTab === 'finished' ? 'default' : 'outline'}
            onClick={() => setActiveTab('finished')}
          >
            <Icon name="CheckCircle" size={16} className="mr-2" />
            Завершённые
          </Button>
        </div>

        <div className="space-y-4">
          {filteredMatches.map((match) => (
            <Card key={match.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline">{match.game}</Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  {match.date}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">{match.team1}</div>
                  <div className={`text-3xl font-bold ${getPredictionColor(match.prediction.team1Win)}`}>
                    {match.prediction.team1Win}%
                  </div>
                </div>

                <div className="text-center">
                  <Icon name="Swords" size={32} className="mx-auto text-muted-foreground mb-2" />
                  <div className="text-sm text-muted-foreground">VS</div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">{match.team2}</div>
                  <div className={`text-3xl font-bold ${getPredictionColor(match.prediction.team2Win)}`}>
                    {match.prediction.team2Win}%
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Уверенность ИИ:</span>
                  <span className="font-bold">{match.prediction.confidence}%</span>
                </div>
                <Progress value={match.prediction.confidence} className="h-2" />
              </div>

              {match.status === 'live' && (
                <Badge className="mt-4 bg-red-500 animate-pulse">
                  <Icon name="Radio" size={12} className="mr-1" />
                  Матч идёт сейчас
                </Badge>
              )}

              {match.status === 'finished' && match.result && (
                <div className="mt-4 p-3 bg-green-500/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon name="CheckCircle" size={20} className="text-green-500" />
                    <span className="font-bold">
                      Прогноз сбылся! Победа: {match.result === 'team1' ? match.team1 : match.team2}
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Icon name="BarChart3" size={16} className="mr-2" />
                  Статистика команд
                </Button>
                <Button className="flex-1">
                  <Icon name="TrendingUp" size={16} className="mr-2" />
                  Подробный анализ
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <Card className="p-12 text-center">
            <Icon name="Search" size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-muted-foreground">Нет матчей в этой категории</p>
          </Card>
        )}
      </div>
    </div>
  );
}
