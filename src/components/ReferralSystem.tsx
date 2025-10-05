import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ReferralStats, ReferredUser, REFERRAL_TIERS } from '@/types/referral';
import Icon from '@/components/ui/icon';

const tierColors = {
  bronze: 'from-amber-700 to-amber-900',
  silver: 'from-gray-400 to-gray-600',
  gold: 'from-yellow-400 to-yellow-600',
  platinum: 'from-cyan-400 to-cyan-600',
  diamond: 'from-blue-400 to-purple-600',
};

const tierIcons = {
  bronze: '🥉',
  silver: '🥈',
  gold: '🥇',
  platinum: '💎',
  diamond: '💠',
};

export default function ReferralSystem() {
  const [stats] = useState<ReferralStats>({
    totalReferrals: 23,
    activeReferrals: 18,
    totalEarned: 12500,
    currency: 'coins',
    referralCode: 'PROG4M3R',
    tier: 'gold',
  });

  const [referredUsers] = useState<ReferredUser[]>([
    {
      id: '1',
      username: 'NewPlayer123',
      avatar: '/api/placeholder/40/40',
      joinedAt: Date.now() - 86400000 * 7,
      level: 15,
      isActive: true,
      earnedFromUser: 450,
    },
    {
      id: '2',
      username: 'GamerPro',
      avatar: '/api/placeholder/40/40',
      joinedAt: Date.now() - 86400000 * 14,
      level: 28,
      isActive: true,
      earnedFromUser: 890,
    },
    {
      id: '3',
      username: 'PlayerX',
      avatar: '/api/placeholder/40/40',
      joinedAt: Date.now() - 86400000 * 30,
      level: 42,
      isActive: true,
      earnedFromUser: 1200,
    },
  ]);

  const currentTier = REFERRAL_TIERS.find((t) => t.tier === stats.tier)!;
  const nextTier = REFERRAL_TIERS[REFERRAL_TIERS.findIndex((t) => t.tier === stats.tier) + 1];
  const progressToNext = nextTier
    ? ((stats.totalReferrals - currentTier.referralsRequired) /
        (nextTier.referralsRequired - currentTier.referralsRequired)) *
      100
    : 100;

  const copyReferralLink = () => {
    const link = `https://gamestore.com/ref/${stats.referralCode}`;
    navigator.clipboard.writeText(link);
    alert('Реферальная ссылка скопирована!');
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">🎁 Реферальная программа</h1>
        <p className="text-muted-foreground">Приглашай друзей и получай награды!</p>
      </div>

      <Card className={`p-8 bg-gradient-to-r ${tierColors[stats.tier]} text-white`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-6xl">{tierIcons[stats.tier]}</span>
              <div>
                <h2 className="text-3xl font-bold capitalize">{stats.tier} уровень</h2>
                <p className="text-white/80">+{currentTier.bonusPercentage}% к наградам</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold">{stats.totalReferrals}</div>
            <div className="text-sm">Рефералов</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/20 rounded-lg p-4">
            <Icon name="Users" size={24} className="mb-2" />
            <div className="text-2xl font-bold">{stats.activeReferrals}</div>
            <div className="text-sm">Активных</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <Icon name="Coins" size={24} className="mb-2" />
            <div className="text-2xl font-bold">{stats.totalEarned}</div>
            <div className="text-sm">Заработано 🪙</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <Icon name="TrendingUp" size={24} className="mb-2" />
            <div className="text-2xl font-bold">+{currentTier.bonusPercentage}%</div>
            <div className="text-sm">Бонус</div>
          </div>
        </div>

        {nextTier && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">До {nextTier.tier} уровня:</span>
              <span className="text-sm">
                {stats.totalReferrals}/{nextTier.referralsRequired} рефералов
              </span>
            </div>
            <Progress value={progressToNext} className="h-3 bg-white/20" />
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">Твоя реферальная ссылка</h3>
        <div className="flex gap-2">
          <Input
            value={`https://gamestore.com/ref/${stats.referralCode}`}
            readOnly
            className="font-mono"
          />
          <Button onClick={copyReferralLink}>
            <Icon name="Copy" size={16} className="mr-2" />
            Копировать
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Делись ссылкой с друзьями и получай {currentTier.bonusPercentage}% от их покупок!
        </p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">🏆 Уровни программы</h3>
          <div className="space-y-3">
            {REFERRAL_TIERS.map((tier) => (
              <Card
                key={tier.tier}
                className={`p-4 ${
                  tier.tier === stats.tier ? `bg-gradient-to-r ${tierColors[tier.tier]} text-white` : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{tierIcons[tier.tier]}</span>
                    <div>
                      <h4 className="font-bold capitalize">{tier.tier}</h4>
                      <p className={`text-sm ${tier.tier === stats.tier ? 'text-white/80' : 'text-muted-foreground'}`}>
                        {tier.referralsRequired} рефералов
                      </p>
                    </div>
                  </div>
                  <Badge className={tier.tier === stats.tier ? 'bg-white/20' : ''}>
                    +{tier.bonusPercentage}%
                  </Badge>
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className={tier.tier === stats.tier ? 'border-white/50' : ''}>
                    {tier.rewards.coins} 🪙
                  </Badge>
                  <Badge variant="outline" className={tier.tier === stats.tier ? 'border-white/50' : ''}>
                    {tier.rewards.gems} 💎
                  </Badge>
                  {tier.rewards.special && (
                    <Badge variant="outline" className={tier.tier === stats.tier ? 'border-white/50' : ''}>
                      {tier.rewards.special}
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">👥 Твои рефералы</h3>
          <div className="space-y-3">
            {referredUsers.map((user) => (
              <Card key={user.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.username} className="w-12 h-12 rounded-full" />
                    <div>
                      <p className="font-bold">{user.username}</p>
                      <p className="text-sm text-muted-foreground">
                        Уровень {user.level} • {new Date(user.joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-500">+{user.earnedFromUser} 🪙</p>
                    {user.isActive && <Badge className="bg-green-500 text-white text-xs mt-1">Активен</Badge>}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <div className="flex items-center gap-4">
          <Icon name="Gift" size={48} />
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">Специальный бонус!</h3>
            <p className="text-white/80">
              Приведи 50 друзей и получи эксклюзивный платиновый скин!
            </p>
          </div>
          <Button variant="secondary" size="lg">
            Пригласить друзей
          </Button>
        </div>
      </Card>
    </div>
  );
}
