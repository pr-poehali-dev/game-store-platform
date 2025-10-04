import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import GamesSection from '@/components/GamesSection';
import SubscriptionsSection from '@/components/SubscriptionsSection';
import type { Game } from '@/types';

interface Subscription {
  id: number;
  name: string;
  platform: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
}

interface MainTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  filteredGames: Game[];
  filteredSubs: Subscription[];
  categories: string[];
  franchises: string[];
  platformFilter: string;
  setPlatformFilter: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  franchiseFilter: string;
  setFranchiseFilter: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  favorites: number[];
  onToggleFavorite: (gameId: number) => void;
  onViewGame: (game: Game) => void;
  onAddToCart: (item: Game | Subscription, type: 'game' | 'subscription') => void;
}

export default function MainTabs({
  activeTab,
  onTabChange,
  filteredGames,
  filteredSubs,
  categories,
  franchises,
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
  favorites,
  onToggleFavorite,
  onViewGame,
  onAddToCart
}: MainTabsProps) {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-muted h-12">
            <TabsTrigger value="games" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-green data-[state=active]:to-neon-purple data-[state=active]:text-background">
              <Icon name="Gamepad2" size={18} className="mr-2" />
              Игры
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-pink data-[state=active]:to-neon-purple data-[state=active]:text-background">
              <Icon name="Star" size={18} className="mr-2" />
              Подписки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="games" className="mt-0">
            <GamesSection
              filteredGames={filteredGames}
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
              addToCart={onAddToCart}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
              onViewGame={onViewGame}
            />
          </TabsContent>

          <TabsContent value="subscriptions" className="mt-0">
            <SubscriptionsSection
              filteredSubs={filteredSubs}
              addToCart={onAddToCart}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
