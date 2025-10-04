import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MainTabs from '@/components/MainTabs';
import GameDialog from '@/components/GameDialog';
import UnifiedChat from '@/components/UnifiedChat';
import TournamentsSection from '@/components/TournamentsSection';
import LootboxSection from '@/components/LootboxSection';
import RecommendedGames from '@/components/RecommendedGames';
import AIRecommendations from '@/components/AIRecommendations';
import GamingNews from '@/components/GamingNews';
import BonusClickerGame from '@/components/BonusClickerGame';
import Leaderboard from '@/components/Leaderboard';
import SteamTopup from '@/components/SteamTopup';
import AccountsSection from '@/components/AccountsSection';
import PSNCards from '@/components/PSNCards';
import StatsSection from '@/components/StatsSection';
import InfoSection from '@/components/InfoSection';
import FeaturesSection from '@/components/FeaturesSection';
import PriceTracker from '@/components/PriceTracker';
import TournamentReminder from '@/components/TournamentReminder';
import GameComparison from '@/components/GameComparison';
import FortuneWheel from '@/components/FortuneWheel';
import Footer from '@/components/Footer';
import { useIndexState } from '@/hooks/useIndexState';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

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

  return (
    <div className="min-h-screen bg-background dark">
      <div className="fixed bottom-4 left-4 z-30 flex gap-3">
        <Button
          onClick={() => setShowComparison(true)}
          className="bg-gradient-to-r from-accent to-primary shadow-lg"
          size="lg"
        >
          <Icon name="Scale" size={20} className="mr-2" />
          Сравнить игры
        </Button>
        <Button
          onClick={() => setShowWheel(true)}
          className="bg-gradient-to-r from-orange-500 to-red-500 shadow-lg animate-pulse"
          size="lg"
        >
          <Icon name="CircleDot" size={20} className="mr-2" />
          Колесо фортуны
        </Button>
      </div>
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

      <TournamentReminder 
        tournaments={[
          { id: 1, title: 'FIFA 24 Championship', startDate: '2025-10-15T18:00:00', prizePool: 50000 },
          { id: 2, title: 'Call of Duty Warzone Battle', startDate: '2025-10-08T20:00:00', prizePool: 100000 }
        ]} 
      />

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

      <UnifiedChat />

      <AIRecommendations games={games} />

      <RecommendedGames
        games={games}
        favorites={favorites}
        viewHistory={viewHistory}
        onBuy={(game) => addToCart(game, 'game')}
        onToggleFavorite={toggleFavorite}
        onViewGame={handleViewGame}
      />

      <GamingNews />

      <BonusClickerGame />

      <Leaderboard />

      <SteamTopup onTopup={handleSteamTopup} />

      <AccountsSection onBuyAccount={handleBuyAccount} />

      <PSNCards onBuy={handleBuyPSNCard} />

      <TournamentsSection />

      <LootboxSection />

      <StatsSection />

      <InfoSection />

      <FeaturesSection />

      <PriceTracker 
        favorites={favorites}
        games={games}
        onBuy={(game) => addToCart(game, 'game')}
      />

      <Footer />

      <GameComparison 
        games={games} 
        isOpen={showComparison} 
        onClose={() => setShowComparison(false)} 
      />

      <FortuneWheel 
        isOpen={showWheel} 
        onClose={() => setShowWheel(false)} 
      />
    </div>
  );
}