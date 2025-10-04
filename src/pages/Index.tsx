import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MainTabs from '@/components/MainTabs';
import GameDialog from '@/components/GameDialog';
import ChatWidget from '@/components/ChatWidget';
import RecommendedGames from '@/components/RecommendedGames';
import SteamTopup from '@/components/SteamTopup';
import AccountsSection from '@/components/AccountsSection';
import PSNCards from '@/components/PSNCards';
import StatsSection from '@/components/StatsSection';
import InfoSection from '@/components/InfoSection';
import FeaturesSection from '@/components/FeaturesSection';
import PriceTracker from '@/components/PriceTracker';
import Footer from '@/components/Footer';
import { useIndexState } from '@/hooks/useIndexState';

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

      <Hero />

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

      <ChatWidget />

      <RecommendedGames
        games={games}
        favorites={favorites}
        viewHistory={viewHistory}
        onBuy={(game) => addToCart(game, 'game')}
        onToggleFavorite={toggleFavorite}
        onViewGame={handleViewGame}
      />

      <SteamTopup onTopup={handleSteamTopup} />

      <AccountsSection onBuyAccount={handleBuyAccount} />

      <PSNCards onBuy={handleBuyPSNCard} />

      <StatsSection />

      <InfoSection />

      <FeaturesSection />

      <PriceTracker 
        favorites={favorites}
        games={games}
        onBuy={(game) => addToCart(game, 'game')}
      />

      <Footer />
    </div>
  );
}
