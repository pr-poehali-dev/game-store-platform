import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { WishlistItem } from '@/types';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = 1;

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await fetch('https://functions.poehali.dev/085014ea-8c98-4ea8-918e-7882a51b287c', {
        headers: { 'X-User-Id': userId.toString() }
      });
      const data = await res.json();
      setWishlist(data.wishlist || []);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (gameId: number) => {
    try {
      await fetch(`https://functions.poehali.dev/085014ea-8c98-4ea8-918e-7882a51b287c?game_id=${gameId}`, {
        method: 'DELETE',
        headers: { 'X-User-Id': userId.toString() }
      });
      setWishlist(wishlist.filter(item => item.game_id !== gameId));
      toast.success('Удалено из списка желаний');
    } catch (error) {
      toast.error('Ошибка при удалении');
    }
  };

  const totalValue = wishlist.reduce((sum, item) => {
    const price = item.game.discount 
      ? item.game.price * (1 - item.game.discount / 100)
      : item.game.price;
    return sum + price;
  }, 0);

  const totalDiscount = wishlist.reduce((sum, item) => {
    if (item.game.discount) {
      return sum + (item.game.price * item.game.discount / 100);
    }
    return sum;
  }, 0);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-neon-purple via-neon-green to-neon-purple bg-clip-text text-transparent">
            Список желаний
          </h1>
          <p className="text-muted-foreground">
            Отслеживайте любимые игры и получайте уведомления о скидках
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-muted-foreground">Загрузка...</div>
          </div>
        ) : wishlist.length === 0 ? (
          <Card className="bg-card/60 border-border text-center py-16">
            <CardContent>
              <Icon name="Heart" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">Список желаний пуст</h3>
              <p className="text-muted-foreground mb-4">
                Добавляйте игры в список желаний, чтобы следить за скидками
              </p>
              <Button onClick={() => window.location.href = '/'}>
                <Icon name="Home" size={16} />
                К каталогу игр
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-4">
              {wishlist.map((item, idx) => {
                const discountedPrice = item.game.discount
                  ? item.game.price * (1 - item.game.discount / 100)
                  : item.game.price;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="bg-card/60 border-border hover:border-neon-purple/50 transition-all">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-bold text-lg mb-1">{item.game.title}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {item.game.platform}
                                </Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemove(item.game_id)}
                              >
                                <Icon name="X" size={16} />
                              </Button>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              <div>
                                {item.game.discount && item.game.discount > 0 ? (
                                  <div className="flex items-center gap-2">
                                    <Badge className="bg-red-600 text-white">
                                      -{item.game.discount}%
                                    </Badge>
                                    <span className="text-2xl font-bold text-green-500">
                                      {discountedPrice.toLocaleString()} ₽
                                    </span>
                                    <span className="text-sm text-muted-foreground line-through">
                                      {item.game.price.toLocaleString()} ₽
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-2xl font-bold">
                                    {item.game.price.toLocaleString()} ₽
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                {item.notify_on_sale && (
                                  <Badge variant="outline" className="text-xs border-neon-purple text-neon-purple">
                                    <Icon name="Bell" size={12} />
                                    Уведомления вкл.
                                  </Badge>
                                )}
                                <Button>
                                  <Icon name="ShoppingCart" size={16} />
                                  Купить
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <Card className="bg-gradient-to-br from-card/80 to-card/60 border-border sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Сводка</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Игр в списке:</span>
                      <span className="font-bold">{wishlist.length}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Общая стоимость:</span>
                      <span className="font-bold">{totalValue.toLocaleString()} ₽</span>
                    </div>
                    {totalDiscount > 0 && (
                      <div className="flex justify-between text-sm text-green-500">
                        <span>Экономия:</span>
                        <span className="font-bold">{totalDiscount.toLocaleString()} ₽</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Icon name="Bell" size={14} className="text-neon-purple mt-0.5" />
                      <p>
                        Мы уведомим вас, когда на игры из вашего списка появятся скидки
                      </p>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    <Icon name="ShoppingCart" size={16} />
                    Купить всё
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
