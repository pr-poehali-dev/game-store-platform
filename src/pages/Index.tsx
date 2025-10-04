import { lazy, Suspense, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useIndexState } from '@/hooks/useIndexState';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MainTabs from '@/components/MainTabs';
import GameDialog from '@/components/GameDialog';
import Footer from '@/components/Footer';
import { EnhancedCatalogSection } from '@/components/EnhancedCatalogSection';

const UnifiedChat = lazy(() => import('@/components/UnifiedChat'));
const TournamentsSection = lazy(() => import('@/components/TournamentsSection'));
const LootboxSection = lazy(() => import('@/components/LootboxSection'));
const RecommendedGames = lazy(() => import('@/components/RecommendedGames'));
const AIRecommendations = lazy(() => import('@/components/AIRecommendations'));
const GamingNews = lazy(() => import('@/components/GamingNews'));
const BonusClickerGame = lazy(() => import('@/components/BonusClickerGame'));
const Leaderboard = lazy(() => import('@/components/Leaderboard'));
const SteamTopup = lazy(() => import('@/components/SteamTopup'));
const RobloxStore = lazy(() => import('@/components/RobloxStore'));
const GamerSocialNetwork = lazy(() => import('@/components/GamerSocialNetwork'));
const CurrencyRegionSelector = lazy(() => import('@/components/CurrencyRegionSelector'));
const GameStreamsTrailers = lazy(() => import('@/components/GameStreamsTrailers'));
const AchievementsShowcase = lazy(() => import('@/components/AchievementsShowcase'));
const DiscordAuth = lazy(() => import('@/components/DiscordAuth'));
const StatsSection = lazy(() => import('@/components/StatsSection'));
const InfoSection = lazy(() => import('@/components/InfoSection'));
const FeaturesSection = lazy(() => import('@/components/FeaturesSection'));
const PriceTracker = lazy(() => import('@/components/PriceTracker'));
const TournamentReminder = lazy(() => import('@/components/TournamentReminder'));
const GameComparison = lazy(() => import('@/components/GameComparison'));
const FortuneWheel = lazy(() => import('@/components/FortuneWheel'));
const VoiceSearch = lazy(() => import('@/components/VoiceSearch'));

export default function Index() {
  const {
    games,
    subscriptions,
    platformFilter,
    setPlatformFilter,
    categoryFilter,
    setCategoryFilter,
    franchiseFilter,
    setFranchiseFilter,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    cart,
    adminPassword,
    setAdminPassword,
    isAdminAuth,
    editingGame,
    setEditingGame,
    editingSubscription,
    setEditingSubscription,
    isCartOpen,
    setIsCartOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    favorites,
    viewHistory,
    selectedGame,
    setSelectedGame,
    selectedVersion,
    setSelectedVersion,
    activeTab,
    setActiveTab,
    categories,
    franchises,
    filteredGames,
    filteredSubs,
    cartTotal,
    cartCount,
    toggleFavorite,
    handleViewGame,
    addToCart,
    removeFromCart,
    updateQuantity,
    handleCheckout,
    handleAdminLogin,
    handleSaveGame,
    handleDeleteGame,
    handleSaveSubscription,
    handleDeleteSubscription,
    handleSteamTopup,
    handleBuyAccount,
    handleBuyPSNCard
  } = useIndexState();

  const [showComparison, setShowComparison] = useState(false);
  const [showWheel, setShowWheel] = useState(false);

  // Делаем функции доступными глобально
  (window as any).showGameComparison = () => setShowComparison(true);
  (window as any).showFortuneWheel = () => setShowWheel(true);

  return (
    <div className="min-h-screen bg-background dark">
      <CurrencyRegionSelector />
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

      <Hero />

      <EnhancedCatalogSection
        games={games}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onViewGame={handleViewGame}
        onAddToCart={addToCart}
      />

      <Suspense fallback={<div className="h-20" />}>
        <TournamentReminder 
          tournaments={[
            { id: 1, title: 'FIFA 24 Championship', startDate: '2025-10-15T18:00:00', prizePool: 50000 },
            { id: 2, title: 'Call of Duty Warzone Battle', startDate: '2025-10-08T20:00:00', prizePool: 100000 }
          ]} 
        />
      </Suspense>

      <MainTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        filteredGames={filteredGames}
        filteredSubs={filteredSubs}
        categories={categories}
        franchises={franchises}
        platformFilter={platformFilter}
        setPlatformFilter={setPlatformFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        franchiseFilter={franchiseFilter}
        setFranchiseFilter={setFranchiseFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onViewGame={handleViewGame}
        onAddToCart={addToCart}
      />

      <GameDialog
        selectedGame={selectedGame}
        selectedVersion={selectedVersion}
        favorites={favorites}
        onClose={() => setSelectedGame(null)}
        onToggleFavorite={toggleFavorite}
        onVersionChange={setSelectedVersion}
        onBuy={(game) => addToCart(game, 'game')}
      />

      <Suspense fallback={<div className="h-20" />}>
        <UnifiedChat />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <AIRecommendations games={games} />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <RecommendedGames
          games={games}
          favorites={favorites}
          viewHistory={viewHistory}
          onBuy={(game) => addToCart(game, 'game')}
          onToggleFavorite={toggleFavorite}
          onViewGame={handleViewGame}
        />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <GamingNews />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <BonusClickerGame />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <AchievementsShowcase />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <Leaderboard />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <GamerSocialNetwork />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <GameStreamsTrailers />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <SteamTopup onTopup={handleSteamTopup} />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <RobloxStore />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <TournamentsSection />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <LootboxSection />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <StatsSection />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <InfoSection />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <FeaturesSection />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <PriceTracker 
          favorites={favorites}
          games={games}
          onBuy={(game) => addToCart(game, 'game')}
        />
      </Suspense>

      <Footer />

      <Suspense fallback={null}>
        <VoiceSearch />
      </Suspense>
      
      <Suspense fallback={null}>
        <DiscordAuth />
      </Suspense>

      <Suspense fallback={null}>
        <GameComparison 
          games={games} 
          isOpen={showComparison} 
          onClose={() => setShowComparison(false)} 
        />
      </Suspense>

      <Suspense fallback={null}>
        <FortuneWheel 
          isOpen={showWheel} 
          onClose={() => setShowWheel(false)} 
        />
      </Suspense>
    </div>
  );
}