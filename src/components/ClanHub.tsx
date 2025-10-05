import { Shield, Trophy, Users, Swords, TrendingUp, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clan } from '@/types/clans';
import Icon from '@/components/ui/icon';

interface ClanHubProps {
  clan: Clan;
  isLeader?: boolean;
  onManageClan?: () => void;
  onLeaveClan?: () => void;
  onClanWar?: (warId: string) => void;
}

export default function ClanHub({ clan, isLeader, onManageClan, onLeaveClan, onClanWar }: ClanHubProps) {
  const roleColors = {
    leader: 'text-yellow-500',
    officer: 'text-purple-500',
    veteran: 'text-blue-500',
    member: 'text-gray-500',
    recruit: 'text-green-500',
  };

  const roleBadges = {
    leader: 'Лидер',
    officer: 'Офицер',
    veteran: 'Ветеран',
    member: 'Участник',
    recruit: 'Новичок',
  };

  const xpProgress = (clan.xp / clan.xpToNextLevel) * 100;

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        {clan.banner && (
          <div className="h-32 bg-gradient-to-r from-primary to-secondary relative">
            <img src={clan.banner} alt="Banner" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <img
                src={clan.logo}
                alt={clan.name}
                className="w-24 h-24 rounded-lg border-4 border-background shadow-xl"
              />
              <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary">
                LVL {clan.level}
              </Badge>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-3xl font-bold">{clan.name}</h2>
                    <Badge variant="secondary">[{clan.tag}]</Badge>
                    {!clan.isPublic && (
                      <Badge variant="outline">
                        <Icon name="Lock" size={12} className="mr-1" />
                        Закрытый
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">{clan.description}</p>
                </div>
                <div className="flex gap-2">
                  {isLeader && onManageClan && (
                    <Button onClick={onManageClan}>
                      <Icon name="Settings" size={16} className="mr-2" />
                      Управление
                    </Button>
                  )}
                  {!isLeader && onLeaveClan && (
                    <Button variant="outline" onClick={onLeaveClan}>
                      Покинуть клан
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Прогресс до уровня {clan.level + 1}</span>
                  <span className="font-medium">
                    {clan.xp} / {clan.xpToNextLevel} XP
                  </span>
                </div>
                <Progress value={xpProgress} className="h-2" />
              </div>

              <div className="grid grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Icon name="Users" size={16} className="text-primary" />
                    <span className="font-bold">
                      {clan.stats.totalMembers}/{clan.maxMembers}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Участники</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Icon name="Trophy" size={16} className="text-yellow-500" />
                    <span className="font-bold">{clan.stats.tournamentWins}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Турниры</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Icon name="Target" size={16} className="text-green-500" />
                    <span className="font-bold">{clan.stats.winRate}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Винрейт</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Icon name="TrendingUp" size={16} className="text-blue-500" />
                    <span className="font-bold">#{clan.stats.ranking}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Рейтинг</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Icon name="Coins" size={16} className="text-orange-500" />
                    <span className="font-bold">{clan.vault.coins}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Казна</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="members">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="members">Участники</TabsTrigger>
          <TabsTrigger value="wars">Войны кланов</TabsTrigger>
          <TabsTrigger value="perks">Перки</TabsTrigger>
          <TabsTrigger value="vault">Казна</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clan.members
              .sort((a, b) => b.contributionPoints - a.contributionPoints)
              .map((member, index) => (
                <Card key={member.userId} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={member.avatar} alt={member.username} />
                        <AvatarFallback>{member.username[0]}</AvatarFallback>
                      </Avatar>
                      {member.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-bold truncate ${roleColors[member.role]}`}>
                          {member.username}
                        </h4>
                        <Badge variant="secondary" className="text-xs">
                          {roleBadges[member.role]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>
                          <Icon name="Award" size={12} className="inline mr-1" />
                          {member.contributionPoints} вклад
                        </span>
                        <span>
                          Ранг #{member.rank}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="wars" className="space-y-4">
          {clan.wars.length > 0 ? (
            clan.wars.map((war) => (
              <Card
                key={war.id}
                className="p-4 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => onClanWar?.(war.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-center">
                      <img src={clan.logo} alt={clan.name} className="w-16 h-16 rounded" />
                      <p className="font-bold mt-1">[{clan.tag}]</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="text-3xl font-bold">{war.ourScore}</div>
                      </div>
                      <Icon name="Swords" size={32} className="text-muted-foreground" />
                      <div className="text-center">
                        <div className="text-3xl font-bold">{war.theirScore}</div>
                      </div>
                    </div>

                    <div className="text-center">
                      <img
                        src={war.opponentClanLogo}
                        alt={war.opponentClanName}
                        className="w-16 h-16 rounded"
                      />
                      <p className="font-bold mt-1">[{war.opponentClanName}]</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <Badge
                      className={
                        war.status === 'active'
                          ? 'bg-red-500'
                          : war.status === 'upcoming'
                          ? 'bg-blue-500'
                          : 'bg-gray-500'
                      }
                    >
                      {war.status === 'active'
                        ? 'В бою'
                        : war.status === 'upcoming'
                        ? 'Скоро'
                        : 'Завершено'}
                    </Badge>
                    {war.winner && (
                      <p className="text-sm mt-2">
                        {war.winner === clan.id ? '🏆 Победа' : '💔 Поражение'}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-12 text-center">
              <Icon name="Swords" size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-muted-foreground">Нет активных войн кланов</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="perks" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {clan.perks.map((perk) => (
              <Card key={perk.id} className={`p-4 ${perk.isUnlocked ? 'border-primary' : ''}`}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name={perk.icon as any} size={32} className="text-primary" />
                  </div>
                  <h4 className="font-bold mb-1">{perk.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{perk.description}</p>
                  <Badge variant="secondary">LVL {perk.level}</Badge>
                  {!perk.isUnlocked && (
                    <Button className="w-full mt-3" size="sm">
                      Разблокировать ({perk.cost} XP)
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vault" className="space-y-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="p-4 text-center">
              <Icon name="Coins" size={32} className="mx-auto mb-2 text-yellow-500" />
              <div className="text-3xl font-bold">{clan.vault.coins}</div>
              <p className="text-sm text-muted-foreground">Монеты</p>
            </Card>
            <Card className="p-4 text-center">
              <Icon name="Gem" size={32} className="mx-auto mb-2 text-purple-500" />
              <div className="text-3xl font-bold">{clan.vault.gems}</div>
              <p className="text-sm text-muted-foreground">Кристаллы</p>
            </Card>
          </div>

          <Card className="p-4">
            <h4 className="font-bold mb-4">Предметы клана</h4>
            <div className="grid grid-cols-4 gap-3">
              {clan.vault.items.map((item) => (
                <div key={item.id} className="text-center p-3 border rounded hover:bg-accent">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <p className="text-xs font-medium mb-1">{item.name}</p>
                  <Badge variant="secondary" className="text-xs">
                    x{item.quantity}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
