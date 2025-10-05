
import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Manager from "./pages/Manager";
import Profile from "./pages/Profile";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import GameDetail from "./pages/GameDetail";
import WishlistPage from "./pages/WishlistPage";
import AdminEnrichment from "./pages/AdminEnrichment";
import Tournaments from "./pages/Tournaments";
import BattlePass from "@/components/BattlePass";
import LootboxSystem from "@/components/LootboxSystem";
import AchievementSystem from "@/components/AchievementSystem";
import PlayerStats from "@/components/PlayerStats";
import DailyRewardsSystem from "@/components/DailyRewardsSystem";
import GameRooms from "@/components/GameRooms";
import ReferralSystem from "@/components/ReferralSystem";
import CraftingSystem from "@/components/CraftingSystem";
import CasinoSystem from "@/components/CasinoSystem";
import Marketplace from "@/components/Marketplace";
import AdminDashboard from "@/components/AdminDashboard";
import GamerSocialNetwork from "@/components/GamerSocialNetwork";
import OfflineIndicator from "@/components/OfflineIndicator";
import NotificationPermissionBanner from "@/components/NotificationPermissionBanner";
import PendingPurchasesBadge from "@/components/PendingPurchasesBadge";
import OfflinePurchaseHandler from "@/components/OfflinePurchaseHandler";
import SyncNotifications from "@/components/SyncNotifications";
import InstallPWAPrompt from "@/components/InstallPWAPrompt";
import { registerServiceWorker } from "@/utils/registerServiceWorker";
import { initBackgroundSync } from "@/utils/backgroundSync";
import { initPeriodicSync } from "@/utils/periodicSync";
import { initExchangeRates } from "@/utils/currencyRates";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    registerServiceWorker();
    initBackgroundSync();
    initPeriodicSync();
    initExchangeRates();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <CurrencyProvider>
            <TooltipProvider>
          <Toaster />
          <Sonner />
          <OfflineIndicator />
          <NotificationPermissionBanner />
          <OfflinePurchaseHandler />
          <SyncNotifications />
          <InstallPWAPrompt />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/manager" element={<Manager />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/game/:gameId" element={<GameDetail />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route path="/admin/enrich" element={<AdminEnrichment />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              
              <Route path="/battlepass" element={<BattlePass />} />
              <Route path="/lootbox" element={<LootboxSystem />} />
              <Route path="/achievements" element={<AchievementSystem />} />
              <Route path="/stats" element={<PlayerStats />} />
              <Route path="/rewards" element={<DailyRewardsSystem />} />
              <Route path="/rooms" element={<GameRooms />} />
              <Route path="/referral" element={<ReferralSystem />} />
              <Route path="/crafting" element={<CraftingSystem />} />
              <Route path="/casino" element={<CasinoSystem />} />
              <Route path="/marketplace" element={<Marketplace listings={[]} onBuyItem={() => {}} onViewItem={() => {}} />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/social" element={<GamerSocialNetwork />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
            </TooltipProvider>
          </CurrencyProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;