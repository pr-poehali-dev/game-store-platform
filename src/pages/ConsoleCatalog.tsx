import { useState, Suspense } from 'react';
import { ConsoleGame, consoleGamesRu } from '@/data/consoleGamesRu';
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
  const [genreFilter, setGenreFilter] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<string>('title');

  const allGenres = Array.from(new Set(consoleGamesRu.flatMap(game => game.genre)));

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

  const filteredGames = consoleGamesRu
    .filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.publisher.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPlatform = platformFilter === 'all' || game.platform === platformFilter;
      const matchesGenre = genreFilter === 'all' || game.genre.includes(genreFilter);
      const matchesPrice = game.priceRub >= minPrice && game.priceRub <= maxPrice;
      return matchesSearch && matchesPlatform && matchesGenre && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'price-low') return a.priceRub - b.priceRub;
      if (sortBy === 'price-high') return b.priceRub - a.priceRub;
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
        <div className="animate-fade-in-up">
          <h1 className="text-5xl font-bold mb-3">🎮 Каталог консольных игр</h1>
          <p className="text-xl text-muted-foreground">Откройте для себя эксклюзивные тайтлы для PlayStation и Xbox</p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск игр, разработчиков, издателей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Платформа" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все платформы</SelectItem>
                <SelectItem value="PS5">PlayStation 5</SelectItem>
                <SelectItem value="PS4">PlayStation 4</SelectItem>
                <SelectItem value="Xbox Series X|S">Xbox Series X|S</SelectItem>
                <SelectItem value="Xbox One">Xbox One</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Название (A-Z)</SelectItem>
                <SelectItem value="price-low">Цена (по возр.)</SelectItem>
                <SelectItem value="price-high">Цена (по убыв.)</SelectItem>
                <SelectItem value="rating">Рейтинг</SelectItem>
                <SelectItem value="release">Дата выхода</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Жанр" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все жанры</SelectItem>
                {allGenres.sort().map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2 flex-1">
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Мин. цена"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  min={0}
                />
              </div>
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Макс. цена"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  min={0}
                />
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setPlatformFilter('all');
                setGenreFilter('all');
                setMinPrice(0);
                setMaxPrice(10000);
                setSortBy('title');
              }}
            >
              <Icon name="X" className="h-4 w-4 mr-2" />
              Сбросить фильтры
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Найдено игр: {filteredGames.length}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game, index) => (
            <Card 
              key={game.id} 
              className="overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${(index % 12) * 50}ms` }}
            >
              <div className="relative h-64 overflow-hidden bg-muted group">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {game.exclusive && (
                  <Badge className="absolute top-2 right-2 bg-primary">
                    Эксклюзив
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
                  <div>
                    {game.priceOnRequest ? (
                      <div>
                        <span className="text-lg font-bold text-primary">Цены уточняйте</span>
                        <div className="text-xs text-muted-foreground">у менеджера</div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-xs text-muted-foreground">от</div>
                        <span className="text-2xl font-bold">{game.priceRub.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    )}
                  </div>
                  <Button size="sm" className="hover:scale-105 transition-transform">
                    <Icon name={game.priceOnRequest ? "MessageCircle" : "ShoppingCart"} className="h-4 w-4 mr-2" />
                    {game.priceOnRequest ? "Написать" : "Купить"}
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