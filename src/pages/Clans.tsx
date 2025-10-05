import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import Breadcrumbs from '@/components/Breadcrumbs';

interface Clan {
  id: number;
  name: string;
  tag: string;
  emblem: string;
  leader: string;
  members: number;
  maxMembers: number;
  rating: number;
  level: number;
  description: string;
  warWins: number;
  warLosses: number;
  isRecruiting: boolean;
}

interface ClanWar {
  id: number;
  clan1: string;
  clan2: string;
  score1: number;
  score2: number;
  status: 'active' | 'finished';
  endTime: string;
}

export default function Clans() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const handleBack = () => window.history.back();
  const handleHome = () => window.location.href = '/';

  const clans: Clan[] = [
    {
      id: 1,
      name: 'Dragon Slayers',
      tag: '[DS]',
      emblem: '🐉',
      leader: 'DragonKing',
      members: 47,
      maxMembers: 50,
      rating: 2845,
      level: 25,
      description: 'Элитный клан для топ игроков. Требуется KDA > 3.0',
      warWins: 142,
      warLosses: 38,
      isRecruiting: true,
    },
    {
      id: 2,
      name: 'Night Wolves',
      tag: '[NW]',
      emblem: '🐺',
      leader: 'AlphaWolf',
      members: 42,
      maxMembers: 50,
      rating: 2634,
      level: 22,
      description: 'Играем по вечерам, дружная команда',
      warWins: 98,
      warLosses: 45,
      isRecruiting: true,
    },
    {
      id: 3,
      name: 'Phoenix Rising',
      tag: '[PR]',
      emblem: '🔥',
      leader: 'Phoenix',
      members: 50,
      maxMembers: 50,
      rating: 3012,
      level: 28,
      description: 'Топ-1 клан России. Набор закрыт.',
      warWins: 201,
      warLosses: 22,
      isRecruiting: false,
    },
  ];

  const clanWars: ClanWar[] = [
    {
      id: 1,
      clan1: 'Dragon Slayers',
      clan2: 'Night Wolves',
      score1: 8,
      score2: 5,
      status: 'active',
      endTime: '2025-10-06 22:00',
    },
    {
      id: 2,
      clan1: 'Phoenix Rising',
      clan2: 'Storm Raiders',
      score1: 12,
      score2: 3,
      status: 'active',
      endTime: '2025-10-06 21:00',
    },
  ];

  const filteredClans = clans.filter(clan =>
    clan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    clan.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getWinRate = (wins: number, losses: number) => {
    const total = wins + losses;
    return total > 0 ? Math.round((wins / total) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs />
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <Icon name="Shield" size={40} className="text-primary" />
            <h1 className="text-4xl font-bold">Кланы</h1>
            <Button variant="outline" size="sm" onClick={handleHome} className="ml-auto">
              <Icon name="Home" size={16} className="mr-2" />
              На главную
            </Button>
          </div>
          <p className="text-muted-foreground">
            Создай клан, собери команду и участвуй в клановых войнах
          </p>
        </div>

        <Tabs defaultValue="clans" className="mb-6">
          <TabsList>
            <TabsTrigger value="clans">
              <Icon name="Users" size={16} className="mr-2" />
              Все кланы
            </TabsTrigger>
            <TabsTrigger value="wars">
              <Icon name="Swords" size={16} className="mr-2" />
              Клановые войны
            </TabsTrigger>
            <TabsTrigger value="my-clan">
              <Icon name="Shield" size={16} className="mr-2" />
              Мой клан
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clans" className="mt-6">
            <div className="mb-6 flex gap-4">
              <div className="relative flex-1">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Найти клан..."
                  className="pl-10"
                />
              </div>
              <Button>
                <Icon name="Plus" size={16} className="mr-2" />
                Создать клан
              </Button>
            </div>

            <div className="space-y-4">
              {filteredClans.map((clan) => (
                <Card key={clan.id} className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="text-6xl">{clan.emblem}</div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold">{clan.name}</h3>
                        <Badge variant="secondary">{clan.tag}</Badge>
                        <Badge>Уровень {clan.level}</Badge>
                        {clan.isRecruiting && (
                          <Badge className="bg-green-500">Набор открыт</Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Icon name="Crown" size={14} />
                          {clan.leader}
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Users" size={14} />
                          {clan.members}/{clan.maxMembers}
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Trophy" size={14} />
                          Рейтинг: {clan.rating}
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Swords" size={14} />
                          Побед: {clan.warWins}
                        </div>
                      </div>

                      <p className="text-sm mb-4">{clan.description}</p>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Винрейт</div>
                          <div className="flex items-center gap-2">
                            <Progress value={getWinRate(clan.warWins, clan.warLosses)} className="h-2" />
                            <span className="text-sm font-bold">{getWinRate(clan.warWins, clan.warLosses)}%</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Заполнение</div>
                          <div className="flex items-center gap-2">
                            <Progress value={(clan.members / clan.maxMembers) * 100} className="h-2" />
                            <span className="text-sm font-bold">{Math.round((clan.members / clan.maxMembers) * 100)}%</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Всего боёв</div>
                          <div className="text-2xl font-bold">{clan.warWins + clan.warLosses}</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline">
                          <Icon name="Info" size={16} className="mr-2" />
                          Подробнее
                        </Button>
                        {clan.isRecruiting && (
                          <Button>
                            <Icon name="UserPlus" size={16} className="mr-2" />
                            Вступить в клан
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wars" className="mt-6">
            <div className="space-y-4">
              {clanWars.map((war) => (
                <Card key={war.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">Клановая война</Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Clock" size={14} />
                      Завершится: {war.endTime}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 items-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-2">{war.clan1}</div>
                      <div className="text-4xl font-bold text-green-500">{war.score1}</div>
                    </div>

                    <div className="text-center">
                      <Icon name="Swords" size={32} className="mx-auto text-red-500 mb-2" />
                      <Badge className="bg-red-500">ВОЙНА</Badge>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold mb-2">{war.clan2}</div>
                      <div className="text-4xl font-bold text-blue-500">{war.score2}</div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Icon name="Eye" size={16} className="mr-2" />
                      Смотреть матчи
                    </Button>
                    <Button className="flex-1">
                      <Icon name="Play" size={16} className="mr-2" />
                      Участвовать
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-clan" className="mt-6">
            <Card className="p-12 text-center">
              <Icon name="Shield" size={64} className="mx-auto mb-4 opacity-30" />
              <h3 className="text-xl font-bold mb-2">Вы не состоите в клане</h3>
              <p className="text-muted-foreground mb-6">
                Создайте свой клан или вступите в существующий
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={() => setActiveTab('clans')}>
                  <Icon name="Search" size={16} className="mr-2" />
                  Найти клан
                </Button>
                <Button variant="outline">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать клан
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}