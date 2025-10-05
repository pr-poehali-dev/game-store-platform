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
import GamerStats from '@/components/GamerStats';
import NotificationCenter from '@/components/NotificationCenter';
import ActivityFeed from '@/components/ActivityFeed';
import MessagingCenter from '@/components/MessagingCenter';
import StatusSelector from '@/components/StatusSelector';
import StreamsGallery from '@/components/StreamsGallery';
import TeamChat from '@/components/TeamChat';
import DiscoverGamers from '@/components/DiscoverGamers';
import { Currency, Transaction, DailyReward, CoinShop as CoinShopItem } from '@/types/economy';
import { GamerProfile, Friend, FriendRequest, Team } from '@/types/social';
import { Notification, ActivityFeedItem, ChatConversation, Stream } from '@/types/notifications';
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

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'friend_request',
      title: 'Новая заявка в друзья',
      message: 'EpicGamer777 хочет добавить вас в друзья',
      timestamp: Date.now() - 300000,
      read: false,
      priority: 'high',
    },
    {
      id: '2',
      type: 'game_discount',
      title: 'Скидка 50% на Cyberpunk 2077',
      message: 'Успейте купить игру со скидкой!',
      image: initialGames[0]?.image,
      timestamp: Date.now() - 3600000,
      read: false,
      priority: 'medium',
    },
  ]);

  const [activities, setActivities] = useState<ActivityFeedItem[]>([
    {
      id: '1',
      userId: 2,
      username: 'ShadowNinja',
      avatar: '/api/placeholder/48/48',
      type: 'achievement',
      title: 'Получил достижение',
      description: 'Разблокировал достижение "Мастер снайпер" в Valorant',
      timestamp: Date.now() - 1800000,
      gameId: 1,
      gameName: 'Valorant',
      gameImage: initialGames[1]?.image,
      likes: 15,
      comments: 3,
    },
  ]);

  const [conversations, setConversations] = useState<ChatConversation[]>([
    {
      id: '1',
      participantId: 2,
      participantName: 'ShadowNinja',
      participantAvatar: '/api/placeholder/48/48',
      participantStatus: 'online',
      lastMessage: 'Поиграем в Valorant?',
      lastMessageTime: Date.now() - 900000,
      unreadCount: 2,
      isPinned: false,
    },
  ]);

  const [streams, setStreams] = useState<Stream[]>([
    {
      id: '1',
      streamerId: 3,
      streamerName: 'FireMage99',
      streamerAvatar: '/api/placeholder/48/48',
      title: 'Прохождение Elden Ring - Битва с боссом!',
      gameId: 2,
      gameName: 'Elden Ring',
      gameImage: initialGames[2]?.image || '',
      viewers: 1234,
      thumbnail: initialGames[2]?.image || '',
      startedAt: Date.now() - 7200000,
      tags: ['RPG', 'Souls-like', 'Прохождение'],
      isLive: true,
    },
  ]);

  const [currentConversationId, setCurrentConversationId] = useState<string>();
  const [userStatus, setUserStatus] = useState<'online' | 'in-game' | 'away' | 'offline'>('online');

  return (
    <>
      <div className="fixed top-24 right-4 z-30 flex gap-3">
        <NotificationCenter
          notifications={notifications}
          onMarkAsRead={(id) => setNotifications(notifications.map(n => n.id === id ? {...n, read: true} : n))}
          onMarkAllAsRead={() => setNotifications(notifications.map(n => ({...n, read: true})))}
          onClearAll={() => setNotifications([])}
        />
        <StatusSelector
          currentStatus={userStatus}
          currentGame={mockProfile.currentGame}
          onStatusChange={setUserStatus}
        />
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
          <TabsList className="grid w-full grid-cols-10">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="economy">Экономика</TabsTrigger>
            <TabsTrigger value="social">Соцсеть</TabsTrigger>
            <TabsTrigger value="messages">Сообщения</TabsTrigger>
            <TabsTrigger value="discover">Найти</TabsTrigger>
            <TabsTrigger value="streams">Стримы</TabsTrigger>
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
            <GamerStats stats={mockProfile.stats} />
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

          <TabsContent value="social" className="mt-6">
            <ActivityFeed
              activities={activities}
              onLike={(id) => toast({ title: '❤️ Понравилось!' })}
              onComment={(id) => toast({ title: '💬 Открываю комментарии...' })}
              onShare={(id) => toast({ title: '🔗 Ссылка скопирована!' })}
            />
          </TabsContent>

          <TabsContent value="messages" className="mt-6">
            <MessagingCenter
              conversations={conversations}
              currentConversationId={currentConversationId}
              onSelectConversation={setCurrentConversationId}
              onSendMessage={(convId, msg) => toast({ title: '✉️ Сообщение отправлено!' })}
            />
          </TabsContent>

          <TabsContent value="discover" className="mt-6">
            <DiscoverGamers
              onAddFriend={(userId) => toast({ title: '✅ Заявка отправлена!' })}
              onSendMessage={(userId) => toast({ title: '💬 Открываю чат...' })}
              onViewProfile={(userId) => toast({ title: '👤 Открываю профиль...' })}
            />
          </TabsContent>

          <TabsContent value="streams" className="mt-6">
            <StreamsGallery
              streams={streams}
              onStreamClick={(id) => toast({ title: '📺 Открываю стрим...' })}
            />
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

          <TabsContent value="teams" className="mt-6 space-y-6">
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

            <TeamChat
              teamId="team-1"
              teamName="EliteCybers"
              members={[
                { id: 1, name: 'GamerPro2024', avatar: '/api/placeholder/48/48', role: 'owner', status: 'online' },
                { id: 2, name: 'ShadowNinja', avatar: '/api/placeholder/48/48', role: 'admin', status: 'voice' },
                { id: 3, name: 'FireMage99', avatar: '/api/placeholder/48/48', role: 'member', status: 'in-game' },
                { id: 4, name: 'TankMaster', avatar: '/api/placeholder/48/48', role: 'member', status: 'online' },
              ]}
              channels={[
                { id: 'general', name: 'общий', description: 'Общение команды', type: 'text' },
                { id: 'strategy', name: 'стратегия', description: 'Обсуждение тактики', type: 'text' },
                { id: 'voice-1', name: 'Голосовой чат', description: '', type: 'voice' },
              ]}
              currentChannelId="general"
              onChannelChange={(id) => toast({ title: `Переключено на канал` })}
              onSendMessage={(channelId, msg) => toast({ title: '✉️ Сообщение отправлено!' })}
            />
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