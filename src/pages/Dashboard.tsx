import { lazy, Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useIndexState } from '@/hooks/useIndexState';

const BattlePass = lazy(() => import('@/components/BattlePass'));
const LootboxSystem = lazy(() => import('@/components/LootboxSystem'));
const AchievementSystem = lazy(() => import('@/components/AchievementSystem'));
const PlayerStats = lazy(() => import('@/components/PlayerStats'));
const DailyRewardsSystem = lazy(() => import('@/components/DailyRewardsSystem'));
const ReferralSystem = lazy(() => import('@/components/ReferralSystem'));
const QuestsSystem = lazy(() => import('@/components/QuestsSystem'));
const RankingSystem = lazy(() => import('@/components/RankingSystem'));
const EventsSystem = lazy(() => import('@/components/EventsSystem'));

export default function Dashboard() {
  const {
    cart,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    updateQuantity,
    removeFromCart,
    handleCheckout,
    adminPassword,
    setAdminPassword,
    isAdminAuth,
    handleAdminLogin,
    games,
    subscriptions,
    editingGame,
    setEditingGame,
    editingSubscription,
    setEditingSubscription,
    handleSaveGame,
    handleDeleteGame,
    handleSaveSubscription,
    handleDeleteSubscription
  } = useIndexState();

  return (
    <div className="min-h-screen bg-background dark">
      <Header
        cart={cart}
        cartCount={cartCount}
        cartTotal={cartTotal}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        isCheckoutOpen={isCheckoutOpen}
        setIsCheckoutOpen={setIsCheckoutOpen}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        handleCheckout={handleCheckout}
        adminPassword={adminPassword}
        setAdminPassword={setAdminPassword}
        isAdminAuth={isAdminAuth}
        handleAdminLogin={handleAdminLogin}
        games={games}
        subscriptions={subscriptions}
        editingGame={editingGame}
        setEditingGame={setEditingGame}
        editingSubscription={editingSubscription}
        setEditingSubscription={setEditingSubscription}
        handleSaveGame={handleSaveGame}
        handleDeleteGame={handleDeleteGame}
        handleSaveSubscription={handleSaveSubscription}
        handleDeleteSubscription={handleDeleteSubscription}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">Player Dashboard</h1>
          <p className="text-muted-foreground">Your gaming progress and achievements</p>
        </div>

        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9">
            <TabsTrigger value="stats">
              <Icon name="BarChart3" className="h-4 w-4 mr-2" />
              Stats
            </TabsTrigger>
            <TabsTrigger value="achievements">
              <Icon name="Trophy" className="h-4 w-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="quests">
              <Icon name="ListChecks" className="h-4 w-4 mr-2" />
              Quests
            </TabsTrigger>
            <TabsTrigger value="ranking">
              <Icon name="Award" className="h-4 w-4 mr-2" />
              Ranking
            </TabsTrigger>
            <TabsTrigger value="events">
              <Icon name="Calendar" className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="battlepass">
              <Icon name="Zap" className="h-4 w-4 mr-2" />
              Battle Pass
            </TabsTrigger>
            <TabsTrigger value="lootbox">
              <Icon name="Gift" className="h-4 w-4 mr-2" />
              Lootbox
            </TabsTrigger>
            <TabsTrigger value="rewards">
              <Icon name="Star" className="h-4 w-4 mr-2" />
              Rewards
            </TabsTrigger>
            <TabsTrigger value="referral">
              <Icon name="Users" className="h-4 w-4 mr-2" />
              Referral
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="mt-6">
            <Suspense fallback={<Card className="h-96 animate-pulse" />}>
              <PlayerStats />
            </Suspense>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <Suspense fallback={<Card className="h-96 animate-pulse" />}>
              <AchievementSystem />
            </Suspense>
          </TabsContent>

          <TabsContent value="quests" className="mt-6">
            <Suspense fallback={<Card className="h-96 animate-pulse" />}>
              <QuestsSystem />
            </Suspense>
          </TabsContent>

          <TabsContent value="ranking" className="mt-6">
            <Suspense fallback={<Card className="h-96 animate-pulse" />}>
              <RankingSystem />
            </Suspense>
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <Suspense fallback={<Card className="h-96 animate-pulse" />}>
              <EventsSystem />
            </Suspense>
          </TabsContent>

          <TabsContent value="battlepass" className="mt-6">
            <Suspense fallback={<Card className="h-96 animate-pulse" />}>
              <BattlePass />
            </Suspense>
          </TabsContent>

          <TabsContent value="lootbox" className="mt-6">
            <Suspense fallback={<Card className="h-96 animate-pulse" />}>
              <LootboxSystem />
            </Suspense>
          </TabsContent>

          <TabsContent value="rewards" className="mt-6">
            <Suspense fallback={<Card className="h-96 animate-pulse" />}>
              <DailyRewardsSystem />
            </Suspense>
          </TabsContent>

          <TabsContent value="referral" className="mt-6">
            <Suspense fallback={<Card className="h-96 animate-pulse" />}>
              <ReferralSystem />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
