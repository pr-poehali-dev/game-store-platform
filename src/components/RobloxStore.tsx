import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface RobuxPackage {
  id: string;
  amount: number;
  price: number;
  bonus: number;
  popular?: boolean;
  bestValue?: boolean;
}

const robuxPackages: RobuxPackage[] = [
  { id: 'r400', amount: 400, price: 299, bonus: 0 },
  { id: 'r800', amount: 800, price: 599, bonus: 0 },
  { id: 'r1700', amount: 1700, price: 1199, bonus: 0, popular: true },
  { id: 'r4500', amount: 4500, price: 2999, bonus: 500, bestValue: true },
  { id: 'r10000', amount: 10000, price: 5999, bonus: 1500, bestValue: true }
];

export default function RobloxStore() {
  const [selectedPackage, setSelectedPackage] = useState<RobuxPackage | null>(null);
  const [username, setUsername] = useState('');
  const { toast } = useToast();

  const handlePurchase = () => {
    if (!selectedPackage) {
      toast({
        title: '❌ Выберите пакет',
        description: 'Пожалуйста, выберите количество Robux',
        variant: 'destructive'
      });
      return;
    }

    if (!username.trim()) {
      toast({
        title: '❌ Укажите ник',
        description: 'Введите ваш ник в Roblox',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: '✅ Заказ оформлен!',
      description: `${selectedPackage.amount + selectedPackage.bonus} Robux будут зачислены на аккаунт ${username} в течение 5 минут`
    });

    setSelectedPackage(null);
    setUsername('');
  };

  return (
    <div className="container mx-auto px-4 py-12" data-section="roblox">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <img 
            src="https://images.rbxcdn.com/c69b74f49c6790d7e95d7bbcf80e6ecc.png" 
            alt="Robux"
            className="w-16 h-16"
          />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Магазин Robux
          </h2>
        </div>
        <p className="text-muted-foreground">
          Покупайте Robux быстро и безопасно. Моментальное зачисление!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
        {robuxPackages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`relative cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedPackage?.id === pkg.id
                  ? 'border-2 border-primary shadow-2xl shadow-primary/50'
                  : 'hover:border-primary/50'
              } ${
                pkg.bestValue ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10' : ''
              }`}
              onClick={() => setSelectedPackage(pkg)}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-rose-500">
                  🔥 Популярно
                </Badge>
              )}
              {pkg.bestValue && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500">
                  💎 Выгодно
                </Badge>
              )}
              
              <CardHeader className="text-center pt-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <img 
                    src="https://images.rbxcdn.com/c69b74f49c6790d7e95d7bbcf80e6ecc.png" 
                    alt="Robux"
                    className="w-8 h-8"
                  />
                  <CardTitle className="text-3xl font-bold text-primary">
                    {pkg.amount.toLocaleString()}
                  </CardTitle>
                </div>
                {pkg.bonus > 0 && (
                  <Badge variant="outline" className="mx-auto bg-green-500/10 text-green-500 border-green-500">
                    +{pkg.bonus} бонус
                  </Badge>
                )}
              </CardHeader>
              
              <CardContent className="text-center">
                <div className="text-2xl font-bold mb-2">
                  {pkg.price}₽
                </div>
                {pkg.bonus > 0 && (
                  <div className="text-sm text-muted-foreground mb-3">
                    Всего: {(pkg.amount + pkg.bonus).toLocaleString()} Robux
                  </div>
                )}
                <div className="text-xs text-muted-foreground">
                  ≈ {(pkg.price / pkg.amount).toFixed(2)}₽ за Robux
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="ShoppingCart" size={20} />
            Оформление заказа
          </CardTitle>
          <CardDescription>
            Укажите ваш ник в Roblox и выберите пакет
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="roblox-username" className="mb-2 flex items-center gap-2">
              <Icon name="User" size={16} />
              Ник в Roblox
            </Label>
            <Input
              id="roblox-username"
              placeholder="Введите ваш ник"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-lg"
            />
          </div>

          {selectedPackage && (
            <div className="bg-primary/10 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Выбранный пакет:</span>
                <span className="font-bold text-lg">
                  {selectedPackage.amount.toLocaleString()} Robux
                </span>
              </div>
              {selectedPackage.bonus > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-green-500">Бонус:</span>
                  <span className="font-bold text-green-500">
                    +{selectedPackage.bonus} Robux
                  </span>
                </div>
              )}
              <div className="h-px bg-border my-2" />
              <div className="flex items-center justify-between text-lg">
                <span className="font-semibold">Итого:</span>
                <span className="font-bold text-primary">
                  {selectedPackage.price}₽
                </span>
              </div>
              {selectedPackage.bonus > 0 && (
                <div className="text-sm text-muted-foreground text-center">
                  Вы получите {(selectedPackage.amount + selectedPackage.bonus).toLocaleString()} Robux
                </div>
              )}
            </div>
          )}

          <Button
            onClick={handlePurchase}
            className="w-full bg-gradient-to-r from-primary to-secondary text-lg py-6"
            size="lg"
            disabled={!selectedPackage || !username.trim()}
          >
            <Icon name="CreditCard" size={20} className="mr-2" />
            Купить Robux
          </Button>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <Icon name="Zap" size={24} className="mx-auto mb-2 text-yellow-500" />
              <div className="text-xs text-muted-foreground">Моментально</div>
            </div>
            <div className="text-center">
              <Icon name="Shield" size={24} className="mx-auto mb-2 text-green-500" />
              <div className="text-xs text-muted-foreground">Безопасно</div>
            </div>
            <div className="text-center">
              <Icon name="Headphones" size={24} className="mx-auto mb-2 text-blue-500" />
              <div className="text-xs text-muted-foreground">Поддержка 24/7</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-12 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-6 text-center">❓ Часто задаваемые вопросы</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Как быстро зачисляются Robux?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Robux зачисляются автоматически в течение 1-5 минут после оплаты.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Это безопасно?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Да! Мы используем официальные методы пополнения. Ваш аккаунт в безопасности.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Что если я ввёл неверный ник?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Свяжитесь с поддержкой в чате - мы поможем перевести Robux на правильный аккаунт.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Есть ли комиссия?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Нет! Все комиссии уже включены в цену. Вы платите только указанную сумму.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
