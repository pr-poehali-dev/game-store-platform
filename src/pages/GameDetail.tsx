import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import WishlistButton from '@/components/WishlistButton';
import SaleCountdown from '@/components/SaleCountdown';
import PriceHistoryChart from '@/components/PriceHistoryChart';
import GiftGameDialog from '@/components/GiftGameDialog';
import ReviewsSection from '@/components/ReviewsSection';
import { UserReviews } from '@/components/UserReviews';
import { Game } from '@/types';

export default function GameDetail() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [game, setGame] = useState<Game | null>(null);
  const [coverUrl, setCoverUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGame = async () => {
      setIsLoading(true);
      try {
        const storedGames = localStorage.getItem('games');
        if (storedGames) {
          const games = JSON.parse(storedGames);
          const foundGame = games.find((g: any) => g.id === parseInt(gameId || '0'));
          
          if (foundGame) {
            setGame(foundGame);
            setCoverUrl(foundGame.image_url);
          } else {
            toast({
              title: 'Игра не найдена',
              description: 'Вернитесь в каталог',
              variant: 'destructive',
            });
          }
        }
      } catch (error) {
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить игру',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (gameId) {
      loadGame();
    }
  }, [gameId, toast]);

  const handleBuy = () => {
    toast({
      title: 'Игра добавлена в корзину',
      description: `${game?.title} готова к оформлению`,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background dark">
        <Icon name="Loader2" size={48} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background dark">
        <p className="text-muted-foreground mb-4">Игра не найдена</p>
        <Button onClick={() => navigate('/')}>На главную</Button>
      </div>
    );
  }

  const finalPrice = game.discount 
    ? Math.round(game.price * (1 - game.discount / 100)) 
    : game.price;

  return (
    <div className="min-h-screen bg-background dark">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Назад в каталог
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img 
                src={coverUrl || game.image_url} 
                alt={game.title}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              
              <div className="absolute top-4 left-4 flex gap-2">
                {game.discount && game.discount > 0 && (
                  <>
                    <Badge className="bg-red-600 text-white text-lg px-4 py-2">-{game.discount}%</Badge>
                    <SaleCountdown endDate={new Date(Date.now() + 86400000 * 3).toISOString()} />
                  </>
                )}
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-4xl font-bold mb-2 text-white">{game.title}</h1>
                <div className="flex items-center gap-4 text-white">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={20} className="text-yellow-400" />
                    <span className="font-bold">{game.rating}/10</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Calendar" size={16} />
                    <span>{game.release_year}</span>
                  </div>
                  <Badge variant="outline" className="border-white text-white">
                    {game.platform === 'Both' ? '🎮 All' : game.platform === 'Xbox' ? '🟢 Xbox' : '🔵 PS'}
                  </Badge>
                </div>
              </div>
            </div>

            <Tabs defaultValue="description" className="mb-8">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">Описание</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">Отзывы</TabsTrigger>
                <TabsTrigger value="specs" className="flex-1">Характеристики</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground leading-relaxed">{game.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Разработчик</p>
                        <p className="font-semibold flex items-center gap-2">
                          <Icon name="Code" size={16} />
                          {game.developer}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Издатель</p>
                        <p className="font-semibold flex items-center gap-2">
                          <Icon name="Building2" size={16} />
                          {game.publisher}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Жанр</p>
                        <Badge>{game.category}</Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Платформа</p>
                        <Badge>{game.platform}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <UserReviews gameId={game.id} gameName={game.title} />
              </TabsContent>

              <TabsContent value="specs" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-muted-foreground">Платформа</span>
                        <span className="font-semibold">{game.platform}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-muted-foreground">Год выпуска</span>
                        <span className="font-semibold">{game.release_year}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-muted-foreground">Рейтинг</span>
                        <span className="font-semibold">{game.rating}/10</span>
                      </div>
                      <div className="flex justify-between py-3">
                        <span className="text-muted-foreground">Жанр</span>
                        <span className="font-semibold">{game.category}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <PriceHistoryChart gameId={game.id} />
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Купить игру</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {game.discount && game.discount > 0 ? (
                  <div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-3xl font-bold text-neon-green">
                        {finalPrice}₽
                      </span>
                      <span className="text-xl text-muted-foreground line-through">
                        {game.price}₽
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Вы экономите {game.price - finalPrice}₽ ({game.discount}%)
                    </p>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-neon-green">{game.price}₽</div>
                )}

                <Button 
                  className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90"
                  size="lg"
                  onClick={handleBuy}
                >
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Купить сейчас
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <WishlistButton gameId={game.id} userId={1} />
                  <GiftGameDialog game={game} userId={1} />
                </div>

                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Shield" size={16} className="text-neon-green" />
                    <span>Гарантия лучшей цены</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Zap" size={16} className="text-neon-purple" />
                    <span>Мгновенная доставка</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Lock" size={16} className="text-neon-pink" />
                    <span>Безопасная оплата</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Award" size={16} className="text-yellow-500" />
                    <span>Кешбэк до 15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}