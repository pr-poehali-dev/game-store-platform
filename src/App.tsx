
import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
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
import OfflineIndicator from "@/components/OfflineIndicator";
import NotificationPermissionBanner from "@/components/NotificationPermissionBanner";
import PendingPurchasesBadge from "@/components/PendingPurchasesBadge";
import OfflinePurchaseHandler from "@/components/OfflinePurchaseHandler";
import { registerServiceWorker } from "@/utils/registerServiceWorker";
import { initBackgroundSync } from "@/utils/backgroundSync";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    registerServiceWorker();
    initBackgroundSync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CurrencyProvider>
          <TooltipProvider>
          <Toaster />
          <Sonner />
          <OfflineIndicator />
          <NotificationPermissionBanner />
          <OfflinePurchaseHandler />
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
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          </TooltipProvider>
        </CurrencyProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;