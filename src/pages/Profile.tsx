import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from '@/components/UserProfile';
import AchievementsSystem from '@/components/AchievementsSystem';
import DailyQuests from '@/components/DailyQuests';
import { PlayerAchievementsSystem } from '@/components/PlayerAchievementsSystem';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { CurrencyDisplay } from '@/components/CurrencyDisplay';
import { DailyRewards } from '@/components/DailyRewards';
import { CoinShop } from '@/components/CoinShop';
import { GamerProfileCard } from '@/components/GamerProfileCard';
import { FriendsList } from '@/components/FriendsList';
import { TeamCard } from '@/components/TeamCard';
import PriceTrackerEnhanced from '@/components/PriceTrackerEnhanced';
import { Currency, Transaction, DailyReward, CoinShop as CoinShopItem } from '@/types/economy';
import { GamerProfile, Friend, FriendRequest, Team } from '@/types/social';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { initialGames } from '@/data/games';

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAchievements, setShowAchievements] = useState(false);
  const [showQuests, setShowQuests] = useState(false);
  const [showCoinShop, setShowCoinShop] = useState(false);

  const [currency, setCurrency] = useState<Currency>({ coins: 1250, gems: 45 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const mockProfile: GamerProfile = {
    id: 1,
    username: 'GamerPro2024',
    avatar: '/api/placeholder/96/96',
    level: 42,
    xp: 8500,
    xpToNextLevel: 10000,
    coins: currency.coins,
    gems: currency.gems,
    title: '🏆 Чемпион арены',
    bio: 'Люблю соревновательные игры и киберспорт. Ищу команду для турниров!',
    joinDate: '2023-01-15',
    lastOnline: new Date().toISOString(),
    status: 'online',
    currentGame: 'Cyberpunk 2077',
    stats: {
      gamesOwned: 127,
      totalPlayTime: 2450,
      achievementsUnlocked: 342,
      totalSpent: 45000,
      favoritePlatform: 'PC',
      favoriteGenre: 'RPG',
      reviewsWritten: 23,
      tournamentsWon: 5,
      winRate: 67.5,
    },
    badges: [
      { id: '1', name: 'Первая покупка', description: 'Купил первую игру', icon: 'ShoppingBag', rarity: 'common' },
      { id: '2', name: 'Коллекционер', description: '100+ игр в библиотеке', icon: 'Library', rarity: 'epic' },
      { id: '3', name: 'Чемпион', description: 'Выиграл турнир', icon: 'Trophy', rarity: 'legendary' },
    ],
    friends: [2, 3, 4],
    teams: ['team-1'],
  };

  const mockFriends: Friend[] = [
    {
      id: 2,
      username: 'ShadowNinja',
      avatar: '/api/placeholder/48/48',
      level: 38,
      status: 'online',
      currentGame: 'Valorant',
      mutualFriends: 5,
      friendSince: '2023-03-20',
    },
    {
      id: 3,
      username: 'FireMage99',
      avatar: '/api/placeholder/48/48',
      level: 45,
      status: 'in-game',
      currentGame: 'Elden Ring',
      mutualFriends: 3,
      friendSince: '2023-02-10',
    },
  ];

  const mockRequests: FriendRequest[] = [
    {
      id: 'req-1',
      fromUserId: 10,
      fromUsername: 'EpicGamer777',
      fromAvatar: '/api/placeholder/48/48',
      fromLevel: 25,
      message: 'Привет! Давай играть вместе!',
      timestamp: Date.now() - 3600000,
    },
  ];

  const mockTeams: Team[] = [
    {
      id: 'team-1',
      name: 'Cyber Warriors',
      tag: 'CW',
      logo: '',
      description: 'Профессиональная команда по киберспорту',
      ownerId: 1,
      members: [
        { userId: 1, username: 'GamerPro2024', avatar: '', role: 'owner', joinedAt: '2023-01-15', contribution: 1500 },
        { userId: 2, username: 'ShadowNinja', avatar: '', role: 'admin', joinedAt: '2023-03-20', contribution: 800 },
      ],
      maxMembers: 10,
      createdAt: '2023-01-15',
      stats: { tournamentsWon: 12, totalMatches: 45, winRate: 73.3, ranking: 15 },
      isPublic: true,
    },
  ];

  const handleClaimReward = (reward: DailyReward) => {
    setCurrency((prev) => ({
      coins: prev.coins + reward.coins,
      gems: prev.gems + reward.gems,
    }));
    setTransactions((prev) => [
      {
        id: Date.now().toString(),
        type: 'earn',
        amount: reward.coins,
        currency: 'coins',
        reason: `Ежедневная награда — День ${reward.day}`,
        timestamp: Date.now(),
      },
      ...prev,
    ]);
  };

  const handlePurchase = (item: CoinShopItem) => {
    setCurrency((prev) => ({
      ...prev,
      [item.currency]: prev[item.currency] - item.cost,
    }));
    setTransactions((prev) => [
      {
        id: Date.now().toString(),
        type: 'spend',
        amount: item.cost,
        currency: item.currency,
        reason: `Куплено: ${item.name}`,
        timestamp: Date.now(),
      },
      ...prev,
    ]);
  };

  const handleAcceptFriendRequest = (requestId: string) => {
    toast({ title: '✅ Заявка принята', description: 'Теперь вы друзья!' });
  };

  const handleDeclineFriendRequest = (requestId: string) => {
    toast({ title: 'Заявка отклонена' });
  };

  const handleRemoveFriend = (friendId: number) => {
    toast({ title: 'Друг удалён', variant: 'destructive' });
  };

  const handleSendMessage = (friendId: number) => {
    toast({ title: '💬 Открываю чат...' });
  };

  const handleInviteToGame = (friendId: number) => {
    toast({ title: '🎮 Приглашение отправлено!' });
  };

  return (
    <>
      <div className="fixed top-24 right-4 z-30 flex gap-3">
        <Button
          onClick={() => setShowAchievements(true)}
          className="bg-gradient-to-r from-primary to-secondary shadow-lg"
        >
          <Icon name="Trophy" size={18} className="mr-2" />
          Достижения
        </Button>
        <Button
          onClick={() => setShowQuests(true)}
          className="bg-gradient-to-r from-accent to-primary shadow-lg"
        >
          <Icon name="Target" size={18} className="mr-2" />
          Квесты
        </Button>
      </div>
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
        >
          <Icon name="ArrowLeft" size={18} className="mr-2" />
          На главную
        </Button>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="economy">Экономика</TabsTrigger>
            <TabsTrigger value="friends">Друзья</TabsTrigger>
            <TabsTrigger value="teams">Команды</TabsTrigger>
            <TabsTrigger value="tracker">Трекер цен</TabsTrigger>
            <TabsTrigger value="achievements">Достижения</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6 mt-6">
            <GamerProfileCard
              profile={mockProfile}
              isOwnProfile={true}
              onEditProfile={() => toast({ title: 'Редактирование профиля...' })}
            />
            <UserProfile />
          </TabsContent>

          <TabsContent value="economy" className="space-y-6 mt-6">
            <CurrencyDisplay
              currency={currency}
              transactions={transactions}
              onOpenShop={() => setShowCoinShop(true)}
            />
            <DailyRewards onClaimReward={handleClaimReward} />
            {showCoinShop && (
              <CoinShop currency={currency} onPurchase={handlePurchase} />
            )}
          </TabsContent>

          <TabsContent value="friends" className="mt-6">
            <FriendsList
              friends={mockFriends}
              friendRequests={mockRequests}
              onAcceptRequest={handleAcceptFriendRequest}
              onDeclineRequest={handleDeclineFriendRequest}
              onRemoveFriend={handleRemoveFriend}
              onSendMessage={handleSendMessage}
              onInviteToGame={handleInviteToGame}
            />
          </TabsContent>

          <TabsContent value="teams" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Мои команды</h2>
                <Button>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать команду
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockTeams.map((team) => (
                  <TeamCard
                    key={team.id}
                    team={team}
                    isOwner={team.ownerId === mockProfile.id}
                    isMember={true}
                    onManage={() => toast({ title: 'Управление командой...' })}
                    onViewDetails={() => toast({ title: 'Детали команды...' })}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tracker" className="mt-6">
            <PriceTrackerEnhanced games={initialGames} />
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <PlayerAchievementsSystem />
          </TabsContent>
        </Tabs>
      </div>
      
      <AchievementsSystem 
        isOpen={showAchievements} 
        onClose={() => setShowAchievements(false)} 
      />

      <DailyQuests 
        isOpen={showQuests} 
        onClose={() => setShowQuests(false)} 
      />
    </>
  );
}