import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { GamerProfile } from '@/types/social';

interface GamerProfileCardProps {
  profile: GamerProfile;
  isOwnProfile?: boolean;
  onAddFriend?: () => void;
  onSendMessage?: () => void;
  onEditProfile?: () => void;
}

export const GamerProfileCard = ({
  profile,
  isOwnProfile = false,
  onAddFriend,
  onSendMessage,
  onEditProfile,
}: GamerProfileCardProps) => {
  const xpProgress = (profile.xp / profile.xpToNextLevel) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'in-game':
        return 'bg-blue-500';
      case 'away':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return 'В сети';
      case 'in-game':
        return `Играет: ${profile.currentGame}`;
      case 'away':
        return 'Отошёл';
      default:
        return 'Не в сети';
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-primary/30 via-purple-500/30 to-pink-500/30" />
      
      <div className="p-6 -mt-16">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-background overflow-hidden bg-background">
              <img
                src={profile.avatar || '/api/placeholder/96/96'}
                alt={profile.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-background ${getStatusColor(profile.status)}`}
            />
          </div>

          <div className="flex-1 mt-12">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {profile.username}
                  {profile.level >= 50 && (
                    <Icon name="Crown" size={20} className="text-yellow-500" />
                  )}
                </h2>
                {profile.title && (
                  <Badge variant="outline" className="mt-1">
                    {profile.title}
                  </Badge>
                )}
                <p className="text-sm text-muted-foreground mt-1">
                  {getStatusText(profile.status)}
                </p>
              </div>

              <div className="flex gap-2">
                {isOwnProfile ? (
                  <Button onClick={onEditProfile} variant="outline" size="sm">
                    <Icon name="Settings" size={16} className="mr-2" />
                    Редактировать
                  </Button>
                ) : (
                  <>
                    <Button onClick={onAddFriend} size="sm">
                      <Icon name="UserPlus" size={16} className="mr-2" />
                      В друзья
                    </Button>
                    <Button onClick={onSendMessage} variant="outline" size="sm">
                      <Icon name="MessageSquare" size={16} />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {profile.bio && (
          <p className="mt-4 text-muted-foreground">{profile.bio}</p>
        )}

        <div className="mt-6 space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Уровень {profile.level}</span>
              <span className="text-sm text-muted-foreground">
                {profile.xp.toLocaleString()} / {profile.xpToNextLevel.toLocaleString()} XP
              </span>
            </div>
            <Progress value={xpProgress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{profile.stats.gamesOwned}</p>
              <p className="text-xs text-muted-foreground">Игр в коллекции</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {Math.floor(profile.stats.totalPlayTime / 60)}ч
              </p>
              <p className="text-xs text-muted-foreground">Время в игре</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {profile.stats.achievementsUnlocked}
              </p>
              <p className="text-xs text-muted-foreground">Достижений</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{profile.friends.length}</p>
              <p className="text-xs text-muted-foreground">Друзей</p>
            </div>
          </div>
        </div>

        {profile.badges.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3">Значки</h3>
            <div className="flex flex-wrap gap-2">
              {profile.badges.slice(0, 6).map((badge) => (
                <div
                  key={badge.id}
                  className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group relative"
                  title={badge.description}
                >
                  <Icon name={badge.icon as any} size={20} />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-background border rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {badge.name}
                  </div>
                </div>
              ))}
              {profile.badges.length > 6 && (
                <div className="p-3 rounded-lg bg-muted/50 flex items-center justify-center text-sm font-semibold">
                  +{profile.badges.length - 6}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 pt-6 border-t grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={16} />
            <span>С нами с {new Date(profile.joinDate).toLocaleDateString('ru')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Clock" size={16} />
            <span>Был в сети {new Date(profile.lastOnline).toLocaleString('ru')}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
