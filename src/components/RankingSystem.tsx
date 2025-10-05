import { useState } from 'react';
import { PlayerRanking, RankProgress, MatchResult, RankTier, RANK_THRESHOLDS } from '@/types/ranking';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

// Mock data
const mockPlayerRanking: PlayerRanking = {
  userId: '1',
  username: 'ProGamer123',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProGamer123',
  gameId: 1,
  gameName: 'Valorant',
  tier: 'platinum',
  division: 2,
  elo: 1750,
  wins: 145,
  losses: 98,
  winRate: 59.67,
  streak: 5,
  peakElo: 1890,
  rank: 1247,
  region: 'NA',
};

const mockRecentMatches: MatchResult[] = [
  {
    id: '1',
    gameId: 1,
    result: 'win',
    eloChange: 25,
    kda: '18/5/12',
    mvp: true,
    timestamp: Date.now() - 3600000,
  },
  {
    id: '2',
    gameId: 1,
    result: 'win',
    eloChange: 22,
    kda: '15/8/9',
    mvp: false,
    timestamp: Date.now() - 7200000,
  },
  {
    id: '3',
    gameId: 1,
    result: 'loss',
    eloChange: -18,
    kda: '12/14/7',
    mvp: false,
    timestamp: Date.now() - 86400000,
  },
  {
    id: '4',
    gameId: 1,
    result: 'win',
    eloChange: 24,
    kda: '21/6/15',
    mvp: true,
    timestamp: Date.now() - 172800000,
  },
  {
    id: '5',
    gameId: 1,
    result: 'win',
    eloChange: 20,
    kda: '14/9/11',
    mvp: false,
    timestamp: Date.now() - 259200000,
  },
];

const mockLeaderboard: PlayerRanking[] = [
  {
    userId: '101',
    username: 'ChampionX',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ChampionX',
    gameId: 1,
    gameName: 'Valorant',
    tier: 'challenger',
    division: 1,
    elo: 3456,
    wins: 523,
    losses: 198,
    winRate: 72.54,
    streak: 12,
    peakElo: 3567,
    rank: 1,
    region: 'NA',
  },
  {
    userId: '102',
    username: 'LegendKiller',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LegendKiller',
    gameId: 1,
    gameName: 'Valorant',
    tier: 'grandmaster',
    division: 4,
    elo: 3189,
    wins: 467,
    losses: 234,
    winRate: 66.62,
    streak: -2,
    peakElo: 3289,
    rank: 2,
    region: 'NA',
  },
  {
    userId: '103',
    username: 'MasterAce',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MasterAce',
    gameId: 1,
    gameName: 'Valorant',
    tier: 'grandmaster',
    division: 3,
    elo: 3045,
    wins: 401,
    losses: 256,
    winRate: 61.02,
    streak: 7,
    peakElo: 3145,
    rank: 3,
    region: 'NA',
  },
  {
    userId: '104',
    username: 'ShadowElite',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShadowElite',
    gameId: 1,
    gameName: 'Valorant',
    tier: 'grandmaster',
    division: 1,
    elo: 2890,
    wins: 378,
    losses: 289,
    winRate: 56.65,
    streak: 3,
    peakElo: 2990,
    rank: 4,
    region: 'NA',
  },
  {
    userId: '105',
    username: 'DiamondPro',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DiamondPro',
    gameId: 1,
    gameName: 'Valorant',
    tier: 'master',
    division: 4,
    elo: 2756,
    wins: 345,
    losses: 267,
    winRate: 56.37,
    streak: -1,
    peakElo: 2856,
    rank: 5,
    region: 'NA',
  },
];

const RankingSystem = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const getRankIcon = (tier: RankTier) => {
    const icons: Record<RankTier, string> = {
      iron: 'Minus',
      bronze: 'Award',
      silver: 'Zap',
      gold: 'Star',
      platinum: 'Gem',
      diamond: 'Diamond',
      master: 'Crown',
      grandmaster: 'Trophy',
      challenger: 'Flame',
    };
    return icons[tier] || 'Medal';
  };

  const getRankColor = (tier: RankTier) => {
    const colors: Record<RankTier, string> = {
      iron: 'text-gray-500',
      bronze: 'text-orange-700',
      silver: 'text-gray-400',
      gold: 'text-yellow-500',
      platinum: 'text-cyan-400',
      diamond: 'text-blue-400',
      master: 'text-purple-500',
      grandmaster: 'text-red-500',
      challenger: 'text-amber-400',
    };
    return colors[tier] || 'text-gray-500';
  };

  const getRankGradient = (tier: RankTier) => {
    const gradients: Record<RankTier, string> = {
      iron: 'from-gray-600 to-gray-800',
      bronze: 'from-orange-600 to-orange-900',
      silver: 'from-gray-300 to-gray-500',
      gold: 'from-yellow-400 to-yellow-600',
      platinum: 'from-cyan-400 to-cyan-600',
      diamond: 'from-blue-400 to-blue-600',
      master: 'from-purple-500 to-purple-700',
      grandmaster: 'from-red-500 to-red-700',
      challenger: 'from-amber-400 to-amber-600',
    };
    return gradients[tier] || 'from-gray-500 to-gray-700';
  };

  const getNextTier = (currentTier: RankTier): RankTier | null => {
    const tiers: RankTier[] = ['iron', 'bronze', 'silver', 'gold', 'platinum', 'diamond', 'master', 'grandmaster', 'challenger'];
    const currentIndex = tiers.indexOf(currentTier);
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
  };

  const calculateProgress = (currentElo: number, currentTier: RankTier): number => {
    const nextTier = getNextTier(currentTier);
    if (!nextTier) return 100;
    
    const currentThreshold = RANK_THRESHOLDS[currentTier];
    const nextThreshold = RANK_THRESHOLDS[nextTier];
    const progress = ((currentElo - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    
    return Math.max(0, Math.min(100, progress));
  };

  const formatTimeAgo = (timestamp: number) => {
    const hours = Math.floor((Date.now() - timestamp) / 3600000);
    if (hours === 0) return 'Just now';
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  const progress = calculateProgress(mockPlayerRanking.elo, mockPlayerRanking.tier);
  const nextTier = getNextTier(mockPlayerRanking.tier);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Ranking System</h2>
          <p className="text-sm text-muted-foreground">Track your competitive progress</p>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="matches">Match History</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          {/* Current Rank Card */}
          <Card className="overflow-hidden">
            <div className={cn('h-32 bg-gradient-to-br', getRankGradient(mockPlayerRanking.tier))} />
            <CardContent className="relative -mt-16 pb-6">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
                <div className={cn(
                  'h-32 w-32 rounded-full border-4 border-background flex items-center justify-center',
                  'bg-gradient-to-br shadow-lg',
                  getRankGradient(mockPlayerRanking.tier)
                )}>
                  <Icon name={getRankIcon(mockPlayerRanking.tier)} className="h-16 w-16 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <h3 className="text-3xl font-bold capitalize">{mockPlayerRanking.tier}</h3>
                    <Badge variant="secondary" className="text-lg">
                      Division {mockPlayerRanking.division}
                    </Badge>
                  </div>
                  <p className="text-xl text-muted-foreground mt-1">
                    {mockPlayerRanking.elo} ELO
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-sm">
                    <span className="flex items-center gap-1">
                      <Icon name="TrendingUp" className="h-4 w-4 text-green-500" />
                      Peak: {mockPlayerRanking.peakElo}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="MapPin" className="h-4 w-4" />
                      Rank #{mockPlayerRanking.rank}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Globe" className="h-4 w-4" />
                      {mockPlayerRanking.region}
                    </span>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Progress to Next Tier */}
              {nextTier && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Progress to {nextTier}</span>
                    <span className="text-muted-foreground">
                      {mockPlayerRanking.elo} / {RANK_THRESHOLDS[nextTier]} ELO
                    </span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <p className="text-xs text-muted-foreground">
                    {RANK_THRESHOLDS[nextTier] - mockPlayerRanking.elo} ELO needed for promotion
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Wins</CardDescription>
                <CardTitle className="text-2xl text-green-500">{mockPlayerRanking.wins}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Losses</CardDescription>
                <CardTitle className="text-2xl text-red-500">{mockPlayerRanking.losses}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Win Rate</CardDescription>
                <CardTitle className="text-2xl">{mockPlayerRanking.winRate.toFixed(1)}%</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Current Streak</CardDescription>
                <CardTitle className={cn(
                  'text-2xl flex items-center gap-1',
                  mockPlayerRanking.streak > 0 ? 'text-green-500' : 'text-red-500'
                )}>
                  {mockPlayerRanking.streak > 0 ? (
                    <Icon name="TrendingUp" className="h-5 w-5" />
                  ) : (
                    <Icon name="TrendingDown" className="h-5 w-5" />
                  )}
                  {Math.abs(mockPlayerRanking.streak)}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </TabsContent>

        {/* Match History Tab */}
        <TabsContent value="matches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Matches</CardTitle>
              <CardDescription>Your last {mockRecentMatches.length} ranked games</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-3">
                  {mockRecentMatches.map((match) => (
                    <div
                      key={match.id}
                      className={cn(
                        'p-4 rounded-lg border-2 transition-colors',
                        match.result === 'win' && 'border-green-500/20 bg-green-500/5',
                        match.result === 'loss' && 'border-red-500/20 bg-red-500/5',
                        match.result === 'draw' && 'border-yellow-500/20 bg-yellow-500/5'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            'h-12 w-12 rounded-full flex items-center justify-center font-bold',
                            match.result === 'win' && 'bg-green-500 text-white',
                            match.result === 'loss' && 'bg-red-500 text-white',
                            match.result === 'draw' && 'bg-yellow-500 text-white'
                          )}>
                            {match.result === 'win' && 'W'}
                            {match.result === 'loss' && 'L'}
                            {match.result === 'draw' && 'D'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold capitalize">{match.result}</p>
                              {match.mvp && (
                                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500">
                                  <Icon name="Star" className="h-3 w-3 mr-1" />
                                  MVP
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {formatTimeAgo(match.timestamp)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={cn(
                            'text-xl font-bold',
                            match.eloChange > 0 ? 'text-green-500' : 'text-red-500'
                          )}>
                            {match.eloChange > 0 ? '+' : ''}{match.eloChange}
                          </div>
                          {match.kda && (
                            <p className="text-sm text-muted-foreground">KDA: {match.kda}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Players</CardTitle>
              <CardDescription>Highest ranked players in {mockPlayerRanking.region}</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-3">
                  {mockLeaderboard.map((player) => (
                    <div
                      key={player.userId}
                      className={cn(
                        'p-4 rounded-lg border transition-colors hover:bg-muted',
                        player.rank <= 3 && 'bg-gradient-to-r border-2',
                        player.rank === 1 && 'from-yellow-500/10 to-transparent border-yellow-500/30',
                        player.rank === 2 && 'from-gray-400/10 to-transparent border-gray-400/30',
                        player.rank === 3 && 'from-orange-600/10 to-transparent border-orange-600/30'
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          'h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg',
                          player.rank === 1 && 'bg-yellow-500 text-white',
                          player.rank === 2 && 'bg-gray-400 text-white',
                          player.rank === 3 && 'bg-orange-600 text-white',
                          player.rank > 3 && 'bg-muted text-muted-foreground'
                        )}>
                          {player.rank}
                        </div>
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={player.avatar} alt={player.username} />
                          <AvatarFallback>{player.username[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{player.username}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Icon
                              name={getRankIcon(player.tier)}
                              className={cn('h-4 w-4', getRankColor(player.tier))}
                            />
                            <span className="text-sm capitalize">
                              {player.tier} {player.division}
                            </span>
                            {player.streak > 0 && (
                              <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500">
                                <Icon name="Flame" className="h-2.5 w-2.5 mr-1" />
                                {player.streak}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">{player.elo}</p>
                          <p className="text-xs text-muted-foreground">
                            {player.wins}W / {player.losses}L
                          </p>
                          <p className="text-xs text-green-500">{player.winRate.toFixed(1)}% WR</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RankingSystem;
