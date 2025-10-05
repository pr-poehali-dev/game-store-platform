import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RankCard from '@/components/ranking/RankCard';
import StatsGrid from '@/components/ranking/StatsGrid';
import MatchHistory from '@/components/ranking/MatchHistory';
import Leaderboard from '@/components/ranking/Leaderboard';
import { mockPlayerRanking, mockRecentMatches, mockLeaderboard } from '@/components/ranking/mockData';
import {
  getRankIcon,
  getRankColor,
  getRankGradient,
  getNextTier,
  calculateProgress,
  formatTimeAgo,
} from '@/components/ranking/rankingUtils';

const RankingSystem = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

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

        <TabsContent value="overview" className="space-y-4">
          <RankCard
            player={mockPlayerRanking}
            getRankIcon={getRankIcon}
            getRankGradient={getRankGradient}
            getNextTier={getNextTier}
            calculateProgress={calculateProgress}
          />
          <StatsGrid player={mockPlayerRanking} />
        </TabsContent>

        <TabsContent value="matches" className="space-y-4">
          <MatchHistory matches={mockRecentMatches} formatTimeAgo={formatTimeAgo} />
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Leaderboard
            players={mockLeaderboard}
            region={mockPlayerRanking.region}
            getRankIcon={getRankIcon}
            getRankColor={getRankColor}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RankingSystem;
