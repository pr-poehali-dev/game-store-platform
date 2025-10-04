import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface RobuxPackage {
  id: number;
  robux: number;
  price: number;
  bonus?: number;
  isPopular?: boolean;
  discount?: number;
}

const robuxPackages: RobuxPackage[] = [
  { id: 1, robux: 400, price: 299 },
  { id: 2, robux: 800, price: 549, bonus: 80 },
  { id: 3, robux: 1700, price: 1099, bonus: 200, isPopular: true },
  { id: 4, robux: 4500, price: 2699, bonus: 600, discount: 10 },
  { id: 5, robux: 10000, price: 5499, bonus: 1500, discount: 15 },
  { id: 6, robux: 22500, price: 11999, bonus: 3500, discount: 20 }
];

export default function RobloxCurrency() {
  const [selectedPackage, setSelectedPackage] = useState<RobuxPackage | null>(null);
  const { toast } = useToast();

  const handleBuy = (pkg: RobuxPackage) => {
    setSelectedPackage(pkg);
    toast({
      title: '🎮 Robux добавлен в корзину!',
      description: `${pkg.robux}${pkg.bonus ? ` + ${pkg.bonus} бонусных` : ''} Robux за ${pkg.price}₽`
    });
  };

  return (
    <div className="container mx-auto px-4 py-12" data-section="roblox">
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
          💎 Robux — Игровая валюта Roblox
        </h2>
        <p className="text-muted-foreground">
          Покупайте Robux и улучшайте свой игровой опыт
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {robuxPackages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className={`relative overflow-hidden transition-all hover:scale-105 ${
                pkg.isPopular 
                  ? 'border-2 border-primary shadow-2xl shadow-primary/20' 
                  : 'hover:border-primary/50'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute top-0 right-0">
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-none rounded-bl-lg px-3 py-1">
                    ⭐ ПОПУЛЯРНО
                  </Badge>
                </div>
              )}
              
              {pkg.discount && (
                <div className="absolute top-0 left-0">
                  <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-none rounded-br-lg px-3 py-1">
                    -{pkg.discount}%
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4 pt-8">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Icon name="Gem" size={48} className="text-white" />
                </div>
                
                <CardTitle className="text-3xl font-bold">
                  {pkg.robux.toLocaleString()}
                  {pkg.bonus && (
                    <span className="text-green-500 ml-2 text-xl">
                      +{pkg.bonus}
                    </span>
                  )}
                </CardTitle>
                
                <CardDescription className="text-sm">
                  {pkg.bonus ? `Всего ${(pkg.robux + pkg.bonus).toLocaleString()} Robux` : 'Robux'}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center">
                <div className="mb-4">
                  <div className="text-4xl font-bold text-primary mb-1">
                    {pkg.price}₽
                  </div>
                  {pkg.bonus && (
                    <div className="text-xs text-green-500">
                      Бонус: +{pkg.bonus} Robux бесплатно!
                    </div>
                  )}
                </div>

                <Button
                  onClick={() => handleBuy(pkg)}
                  className={`w-full ${
                    pkg.isPopular
                      ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90'
                      : 'bg-gradient-to-r from-accent to-primary hover:opacity-90'
                  }`}
                  size="lg"
                >
                  <Icon name="ShoppingCart" size={18} className="mr-2" />
                  Купить
                </Button>

                <div className="mt-3 text-xs text-muted-foreground">
                  ≈ {(pkg.price / (pkg.robux + (pkg.bonus || 0))).toFixed(2)}₽ за 1 Robux
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Info" size={20} className="text-blue-500" />
            Что такое Robux?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Icon name="ShoppingBag" size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Покупайте предметы</h4>
                <p className="text-muted-foreground">Одежда, аксессуары и снаряжение для вашего аватара</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <Icon name="Gamepad2" size={20} className="text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Доступ к играм</h4>
                <p className="text-muted-foreground">Премиум игры и эксклюзивный контент</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Icon name="Sparkles" size={20} className="text-accent" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Премиум опыт</h4>
                <p className="text-muted-foreground">Улучшения и специальные возможности</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>💡 Robux зачисляется на ваш аккаунт Roblox мгновенно после оплаты</p>
        <p>🔒 Безопасная оплата через защищенное соединение</p>
      </div>
    </div>
  );
}
