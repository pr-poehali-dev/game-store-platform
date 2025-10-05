import { lazy, Suspense, useState } from 'react';
import { useIndexState } from '@/hooks/useIndexState';
import Header from '@/components/Header';
import MainDashboard from '@/components/MainDashboard';
import GameDialog from '@/components/GameDialog';
import Footer from '@/components/Footer';

const UnifiedChat = lazy(() => import('@/components/UnifiedChat'));
const RecommendedGames = lazy(() => import('@/components/RecommendedGames'));
const AIRecommendations = lazy(() => import('@/components/AIRecommendations'));
const GamingNews = lazy(() => import('@/components/GamingNews'));
const CurrencyRegionSelector = lazy(() => import('@/components/CurrencyRegionSelector'));
const GameStreamsTrailers = lazy(() => import('@/components/GameStreamsTrailers'));
const PriceTracker = lazy(() => import('@/components/PriceTracker'));
const GameComparison = lazy(() => import('@/components/GameComparison'));
const FortuneWheel = lazy(() => import('@/components/FortuneWheel'));
const VoiceSearch = lazy(() => import('@/components/VoiceSearch'));

export default function Index() {
  const {
    games,
    subscriptions,
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
  } = useIndexState();

  const [showComparison, setShowComparison] = useState(false);
  const [showWheel, setShowWheel] = useState(false);

  (window as any).showGameComparison = () => setShowComparison(true);
  (window as any).showFortuneWheel = () => setShowWheel(true);

  return (
    <div className="min-h-screen bg-background dark">
      <Suspense fallback={null}>
        <CurrencyRegionSelector />
      </Suspense>

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

      <MainDashboard />

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
        <GameStreamsTrailers />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <GamingNews />
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
