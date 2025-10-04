import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { DailyReward } from '@/types/economy';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface DailyRewardsProps {
  onClaimReward: (reward: DailyReward) => void;
}

export const DailyRewards = ({ onClaimReward }: DailyRewardsProps) => {
  const { toast } = useToast();
  const [currentDay, setCurrentDay] = useState(1);
  const [lastClaimDate, setLastClaimDate] = useState<string | null>(null);
  const [canClaim, setCanClaim] = useState(true);

  const dailyRewards: DailyReward[] = [
    { day: 1, coins: 100, gems: 0, claimed: false },
    { day: 2, coins: 150, gems: 0, claimed: false },
    { day: 3, coins: 200, gems: 5, claimed: false },
    { day: 4, coins: 250, gems: 0, claimed: false },
    { day: 5, coins: 300, gems: 10, claimed: false },
    { day: 6, coins: 400, gems: 0, claimed: false },
    { day: 7, coins: 500, gems: 25, bonus: '🎁 Бонусный сундук', claimed: false },
  ];

  useEffect(() => {
    const savedDay = localStorage.getItem('dailyRewardDay');
    const savedDate = localStorage.getItem('lastClaimDate');
    
    if (savedDay) setCurrentDay(parseInt(savedDay));
    if (savedDate) {
      setLastClaimDate(savedDate);
      const today = new Date().toDateString();
      setCanClaim(savedDate !== today);
    }
  }, []);

  const handleClaim = () => {
    if (!canClaim) return;

    const reward = dailyRewards[currentDay - 1];
    const today = new Date().toDateString();

    onClaimReward({ ...reward, claimed: true });

    toast({
      title: '🎉 Награда получена!',
      description: `День ${currentDay}: +${reward.coins} GCoins${reward.gems > 0 ? `, +${reward.gems} гемов` : ''}`,
    });

    const nextDay = currentDay === 7 ? 1 : currentDay + 1;
    setCurrentDay(nextDay);
    setLastClaimDate(today);
    setCanClaim(false);

    localStorage.setItem('dailyRewardDay', nextDay.toString());
    localStorage.setItem('lastClaimDate', today);
  };

  const getTimeUntilNextClaim = () => {
    if (!lastClaimDate) return 'Доступно сейчас';
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}ч ${minutes}м`;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Icon name="Gift" size={24} className="text-primary" />
            Ежедневные награды
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {canClaim ? '✨ Награда доступна!' : `⏰ Следующая награда через: ${getTimeUntilNextClaim()}`}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Текущая серия</p>
          <p className="text-3xl font-bold text-primary">{currentDay}/7</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        {dailyRewards.map((reward) => (
          <div
            key={reward.day}
            className={`relative p-4 rounded-lg border-2 transition-all ${
              reward.day === currentDay
                ? 'border-primary bg-primary/10 scale-105'
                : reward.day < currentDay
                ? 'border-green-500/50 bg-green-500/10'
                : 'border-muted bg-muted/20'
            }`}
          >
            {reward.day < currentDay && (
              <div className="absolute top-2 right-2">
                <Icon name="Check" size={16} className="text-green-500" />
              </div>
            )}
            <div className="text-center">
              <p className="text-xs font-semibold mb-2">День {reward.day}</p>
              <div className="space-y-1">
                <p className="text-lg font-bold flex items-center justify-center gap-1">
                  <Icon name="Coins" size={14} className="text-yellow-500" />
                  {reward.coins}
                </p>
                {reward.gems > 0 && (
                  <p className="text-sm font-semibold flex items-center justify-center gap-1">
                    <Icon name="Gem" size={12} className="text-purple-500" />
                    {reward.gems}
                  </p>
                )}
                {reward.bonus && (
                  <p className="text-xs mt-1">{reward.bonus}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={handleClaim}
        disabled={!canClaim}
        className="w-full h-12 text-lg"
        size="lg"
      >
        {canClaim ? (
          <>
            <Icon name="Gift" size={20} className="mr-2" />
            Забрать награду дня {currentDay}
          </>
        ) : (
          <>
            <Icon name="Clock" size={20} className="mr-2" />
            Возвращайтесь завтра
          </>
        )}
      </Button>

      <div className="mt-4 p-4 rounded-lg bg-muted/50">
        <p className="text-sm text-center text-muted-foreground">
          💡 <strong>Совет:</strong> Заходи каждый день, чтобы получить максимальную награду на 7-й день!
        </p>
      </div>
    </Card>
  );
};
