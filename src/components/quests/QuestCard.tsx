import { Quest } from '@/types/quests';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface QuestCardProps {
  quest: Quest;
  onClaim?: (questId: string) => void;
}

const difficultyConfig = {
  easy: { color: 'bg-green-500/20 text-green-500 border-green-500/30', icon: 'Star' },
  medium: { color: 'bg-blue-500/20 text-blue-500 border-blue-500/30', icon: 'Zap' },
  hard: { color: 'bg-orange-500/20 text-orange-500 border-orange-500/30', icon: 'Flame' },
  legendary: { color: 'bg-purple-500/20 text-purple-500 border-purple-500/30', icon: 'Crown' },
};

export default function QuestCard({ quest, onClaim }: QuestCardProps) {
  const diffConfig = difficultyConfig[quest.difficulty];
  const progressPercent = (quest.progress / quest.target) * 100;
  const isCompleted = quest.status === 'completed';
  const isClaimed = quest.status === 'claimed';
  const isExpired = quest.status === 'expired';

  return (
    <Card className={cn(
      'transition-all',
      isCompleted && 'border-green-500/30 bg-green-500/5',
      isClaimed && 'opacity-60',
      isExpired && 'opacity-40'
    )}>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">{quest.title}</CardTitle>
              {quest.gameName && (
                <Badge variant="outline" className="text-xs">
                  {quest.gameName}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{quest.description}</p>
          </div>
          <Badge variant="outline" className={cn('border-2', diffConfig.color)}>
            <Icon name={diffConfig.icon} className="h-3 w-3 mr-1" />
            {quest.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {quest.progress} / {quest.target}
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        <div className="flex flex-wrap gap-2">
          {quest.rewards.map((reward, idx) => (
            <Badge key={idx} variant="secondary" className="gap-1">
              {reward.type === 'currency' && <Icon name="Coins" className="h-3 w-3" />}
              {reward.type === 'xp' && <Icon name="TrendingUp" className="h-3 w-3" />}
              {reward.type === 'item' && <Icon name="Gift" className="h-3 w-3" />}
              {reward.type === 'badge' && <Icon name="Award" className="h-3 w-3" />}
              {reward.type === 'title' && <Icon name="Crown" className="h-3 w-3" />}
              {reward.amount && `${reward.amount} `}
              {reward.itemName || reward.type}
            </Badge>
          ))}
        </div>

        {isCompleted && !isClaimed && onClaim && (
          <Button onClick={() => onClaim(quest.id)} className="w-full">
            <Icon name="Gift" className="h-4 w-4 mr-2" />
            Claim Rewards
          </Button>
        )}

        {isClaimed && (
          <div className="flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground">
            <Icon name="CheckCircle2" className="h-4 w-4" />
            Rewards Claimed
          </div>
        )}

        {isExpired && (
          <div className="flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground">
            <Icon name="XCircle" className="h-4 w-4" />
            Quest Expired
          </div>
        )}
      </CardContent>
    </Card>
  );
}
