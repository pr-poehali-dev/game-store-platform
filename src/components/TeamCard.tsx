import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Team } from '@/types/social';

interface TeamCardProps {
  team: Team;
  isOwner?: boolean;
  isMember?: boolean;
  onJoin?: () => void;
  onLeave?: () => void;
  onManage?: () => void;
  onViewDetails?: () => void;
}

export const TeamCard = ({
  team,
  isOwner = false,
  isMember = false,
  onJoin,
  onLeave,
  onManage,
  onViewDetails,
}: TeamCardProps) => {
  const memberCount = team.members.length;
  const spotsLeft = team.maxMembers - memberCount;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-24 bg-gradient-to-r from-primary/30 via-purple-500/30 to-pink-500/30 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          {team.logo ? (
            <img src={team.logo} alt={team.name} className="w-16 h-16 object-contain" />
          ) : (
            <Icon name="Shield" size={48} className="text-white/80" />
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              {team.name}
              {!team.isPublic && (
                <Icon name="Lock" size={16} className="text-muted-foreground" />
              )}
            </h3>
            <p className="text-sm text-muted-foreground">[{team.tag}]</p>
          </div>
          <Badge variant="outline" className="text-xs">
            #{team.stats.ranking} место
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {team.description}
        </p>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-lg font-bold text-primary">{team.stats.tournamentsWon}</p>
            <p className="text-xs text-muted-foreground">Побед</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-primary">
              {team.stats.winRate.toFixed(0)}%
            </p>
            <p className="text-xs text-muted-foreground">Винрейт</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-primary">{team.stats.totalMatches}</p>
            <p className="text-xs text-muted-foreground">Матчей</p>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Участники</span>
            <span className="font-semibold">
              {memberCount} / {team.maxMembers}
            </span>
          </div>
          <div className="flex -space-x-2">
            {team.members.slice(0, 5).map((member) => (
              <div
                key={member.userId}
                className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-muted"
                title={member.username}
              >
                <img
                  src={member.avatar || '/api/placeholder/32/32'}
                  alt={member.username}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {memberCount > 5 && (
              <div className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-semibold">
                +{memberCount - 5}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {isOwner ? (
            <>
              <Button onClick={onManage} className="flex-1" size="sm">
                <Icon name="Settings" size={16} className="mr-2" />
                Управление
              </Button>
              <Button onClick={onViewDetails} variant="outline" size="sm">
                <Icon name="Eye" size={16} />
              </Button>
            </>
          ) : isMember ? (
            <>
              <Button onClick={onViewDetails} className="flex-1" size="sm">
                <Icon name="Eye" size={16} className="mr-2" />
                Открыть
              </Button>
              <Button onClick={onLeave} variant="outline" size="sm">
                <Icon name="LogOut" size={16} />
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={onJoin}
                disabled={spotsLeft === 0}
                className="flex-1"
                size="sm"
              >
                <Icon name="UserPlus" size={16} className="mr-2" />
                {spotsLeft === 0 ? 'Мест нет' : 'Вступить'}
              </Button>
              <Button onClick={onViewDetails} variant="outline" size="sm">
                <Icon name="Eye" size={16} />
              </Button>
            </>
          )}
        </div>

        <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
          <span>Создана {new Date(team.createdAt).toLocaleDateString('ru')}</span>
          <Badge variant="secondary" className="text-xs">
            {team.isPublic ? 'Открытая' : 'Закрытая'}
          </Badge>
        </div>
      </div>
    </Card>
  );
};
