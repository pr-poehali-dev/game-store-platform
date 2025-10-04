import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { CoinShop as CoinShopItem, Currency } from '@/types/economy';
import { useToast } from '@/hooks/use-toast';

interface CoinShopProps {
  currency: Currency;
  onPurchase: (item: CoinShopItem) => void;
}

export const CoinShop = ({ currency, onPurchase }: CoinShopProps) => {
  const { toast } = useToast();

  const shopItems: CoinShopItem[] = [
    {
      id: 'discount-5',
      name: 'Скидка 5%',
      description: 'Промокод на скидку 5% на любую покупку',
      cost: 500,
      currency: 'coins',
      type: 'discount',
      value: 5,
      icon: 'Ticket',
    },
    {
      id: 'discount-10',
      name: 'Скидка 10%',
      description: 'Промокод на скидку 10% на любую покупку',
      cost: 1000,
      currency: 'coins',
      type: 'discount',
      value: 10,
      icon: 'Ticket',
    },
    {
      id: 'discount-20',
      name: 'Скидка 20%',
      description: 'Промокод на скидку 20% на любую покупку',
      cost: 2500,
      currency: 'coins',
      type: 'discount',
      value: 20,
      icon: 'Ticket',
    },
    {
      id: 'xp-boost-2x',
      name: 'XP Бустер x2',
      description: 'Удвоенный опыт на 24 часа',
      cost: 800,
      currency: 'coins',
      type: 'boost',
      value: 2,
      icon: 'Zap',
    },
    {
      id: 'coin-boost-1.5x',
      name: 'Монетный бустер x1.5',
      description: 'Получай на 50% больше коинов 24 часа',
      cost: 1200,
      currency: 'coins',
      type: 'boost',
      value: 1.5,
      icon: 'TrendingUp',
    },
    {
      id: 'avatar-frame-gold',
      name: 'Золотая рамка',
      description: 'Эксклюзивная рамка для аватара',
      cost: 50,
      currency: 'gems',
      type: 'cosmetic',
      icon: 'Frame',
    },
    {
      id: 'avatar-frame-diamond',
      name: 'Алмазная рамка',
      description: 'Легендарная рамка для аватара',
      cost: 100,
      currency: 'gems',
      type: 'cosmetic',
      icon: 'Crown',
    },
    {
      id: 'premium-7d',
      name: 'Premium на 7 дней',
      description: 'Все преимущества Premium подписки',
      cost: 150,
      currency: 'gems',
      type: 'premium',
      icon: 'Star',
    },
  ];

  const handlePurchase = (item: CoinShopItem) => {
    const hasEnough =
      item.currency === 'coins'
        ? currency.coins >= item.cost
        : currency.gems >= item.cost;

    if (!hasEnough) {
      toast({
        title: '❌ Недостаточно средств',
        description: `Вам нужно ещё ${item.cost - (item.currency === 'coins' ? currency.coins : currency.gems)} ${item.currency === 'coins' ? 'GCoins' : 'гемов'}`,
        variant: 'destructive',
      });
      return;
    }

    onPurchase(item);
    toast({
      title: '✅ Покупка успешна!',
      description: `Вы купили: ${item.name}`,
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'discount':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'boost':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'cosmetic':
        return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
      case 'premium':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'discount':
        return 'Скидка';
      case 'boost':
        return 'Бустер';
      case 'cosmetic':
        return 'Косметика';
      case 'premium':
        return 'Premium';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Icon name="Store" size={32} className="text-primary" />
          Магазин GCoins
        </h2>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
            <Icon name="Coins" size={20} className="text-yellow-500" />
            <span className="font-bold">{currency.coins.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
            <Icon name="Gem" size={20} className="text-purple-500" />
            <span className="font-bold">{currency.gems.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {shopItems.map((item) => {
          const hasEnough =
            item.currency === 'coins'
              ? currency.coins >= item.cost
              : currency.gems >= item.cost;

          return (
            <Card
              key={item.id}
              className={`p-6 transition-all hover:scale-105 ${!hasEnough ? 'opacity-50' : ''}`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div
                    className={`p-3 rounded-lg ${
                      item.currency === 'coins'
                        ? 'bg-yellow-500/20'
                        : 'bg-purple-500/20'
                    }`}
                  >
                    <Icon name={item.icon as any} size={24} />
                  </div>
                  <Badge className={getTypeColor(item.type)}>
                    {getTypeLabel(item.type)}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Icon
                      name={item.currency === 'coins' ? 'Coins' : 'Gem'}
                      size={20}
                      className={
                        item.currency === 'coins' ? 'text-yellow-500' : 'text-purple-500'
                      }
                    />
                    <span className="text-xl font-bold">{item.cost}</span>
                  </div>
                  <Button
                    onClick={() => handlePurchase(item)}
                    disabled={!hasEnough}
                    size="sm"
                  >
                    {hasEnough ? 'Купить' : 'Нужно больше'}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 bg-gradient-to-r from-primary/20 to-purple-500/20">
        <div className="flex items-center gap-4">
          <Icon name="Lightbulb" size={32} className="text-primary" />
          <div>
            <h3 className="font-bold text-lg mb-1">Как заработать GCoins?</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✅ Ежедневные награды — до 500 коинов в день</li>
              <li>🎮 Покупка игр — 5% от суммы возвращается коинами</li>
              <li>🏆 Достижения — выполняй задания и получай бонусы</li>
              <li>🎯 Турниры — побеждай и зарабатывай</li>
              <li>📝 Отзывы — 50 коинов за каждый качественный отзыв</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
