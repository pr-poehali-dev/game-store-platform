import { useState } from 'react';
import { ConsoleGame, consoleGames } from '@/data/consoleGames';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useIndexState } from '@/hooks/useIndexState';

export default function ConsoleCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('title');

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

  const filteredGames = consoleGames
    .filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.publisher.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPlatform = platformFilter === 'all' || game.platform === platformFilter;
      return matchesSearch && matchesPlatform;
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'release') return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      return 0;
    });

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

      <div className="container mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Console Games Catalog</h1>
          <p className="text-muted-foreground">Discover exclusive titles for PlayStation and Xbox</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search games, developers, publishers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="PS5">PlayStation 5</SelectItem>
              <SelectItem value="PS4">PlayStation 4</SelectItem>
              <SelectItem value="Xbox Series X|S">Xbox Series X|S</SelectItem>
              <SelectItem value="Xbox One">Xbox One</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title (A-Z)</SelectItem>
              <SelectItem value="price-low">Price (Low-High)</SelectItem>
              <SelectItem value="price-high">Price (High-Low)</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="release">Release Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing {filteredGames.length} games</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <Card key={game.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64 overflow-hidden bg-muted">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                {game.exclusive && (
                  <Badge className="absolute top-2 right-2 bg-primary">
                    Exclusive
                  </Badge>
                )}
                {game.rating > 0 && (
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/80 px-2 py-1 rounded">
                    <Icon name="Star" className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-white font-bold">{game.rating}</span>
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-1">{game.title}</CardTitle>
                  <Badge variant="outline">{game.platform}</Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {game.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {game.genre.map((g) => (
                    <Badge key={g} variant="secondary" className="text-xs">
                      {g}
                    </Badge>
                  ))}
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="User" className="h-3 w-3" />
                    <span>{game.developer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Building" className="h-3 w-3" />
                    <span>{game.publisher}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Calendar" className="h-3 w-3" />
                    <span>{new Date(game.releaseDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-2xl font-bold">${game.price.toFixed(2)}</span>
                  <Button size="sm">
                    <Icon name="ShoppingCart" className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
