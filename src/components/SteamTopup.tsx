import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';

interface SteamTopupProps {
  onTopup: (amount: number) => void;
}

const presetAmounts = [100, 250, 500, 1000, 2000, 5000];

export default function SteamTopup({ onTopup }: SteamTopupProps) {
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [steamLogin, setSteamLogin] = useState<string>('');

  const calculateTotal = (amount: number) => {
    const commission = amount * 0.02;
    return Math.ceil(amount + commission);
  };

  const handleTopup = () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (amount >= 50 && steamLogin.trim()) {
      onTopup(calculateTotal(amount));
      setCustomAmount('');
      setSteamLogin('');
    }
  };

  const currentAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  const total = calculateTotal(currentAmount);
  const commission = total - currentAmount;

  return (
    <section id="steam-topup" className="py-16 bg-gradient-to-br from-[#1b2838] to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Icon name="Wallet" size={40} className="text-[#66c0f4]" />
              <h3 className="text-4xl font-bold">Пополнение Steam</h3>
            </div>
            <p className="text-muted-foreground text-lg">
              Моментальное пополнение кошелька Steam с минимальной комиссией 2%
            </p>
          </div>

          <Card className="bg-card/95 backdrop-blur border-[#66c0f4]/30">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Icon name="DollarSign" size={24} className="text-neon-green" />
                Выберите сумму пополнения
              </CardTitle>
              <CardDescription>Минимальная сумма: 50₽ • Комиссия: 2%</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="steam-login" className="mb-2 block">
                  Логин Steam
                </Label>
                <div className="relative">
                  <Icon name="User" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#66c0f4]" />
                  <Input
                    id="steam-login"
                    type="text"
                    placeholder="Введите ваш логин Steam"
                    value={steamLogin}
                    onChange={(e) => setSteamLogin(e.target.value)}
                    className="pl-10 border-[#66c0f4]/30 focus:border-[#66c0f4]"
                  />
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Быстрый выбор суммы</Label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {presetAmounts.map((amount) => (
                    <motion.div
                      key={amount}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant={selectedAmount === amount && !customAmount ? 'default' : 'outline'}
                        className={`w-full ${
                          selectedAmount === amount && !customAmount
                            ? 'bg-[#66c0f4] text-white hover:bg-[#4a9fd6]'
                            : 'border-[#66c0f4]/30 hover:bg-[#66c0f4]/10'
                        }`}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount('');
                        }}
                      >
                        {amount}₽
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">или</span>
                </div>
              </div>

              <div>
                <Label htmlFor="custom-amount" className="mb-2 block">
                  Своя сумма
                </Label>
                <div className="relative">
                  <Input
                    id="custom-amount"
                    type="number"
                    min="50"
                    step="10"
                    placeholder="Введите сумму от 50₽"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="pr-12 border-[#66c0f4]/30 focus:border-[#66c0f4]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    ₽
                  </span>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Сумма пополнения:</span>
                  <span className="font-semibold">{currentAmount}₽</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Icon name="Info" size={14} />
                    Комиссия (2%):
                  </span>
                  <span className="font-semibold text-orange-500">+{commission.toFixed(2)}₽</span>
                </div>
                <div className="border-t border-border pt-2 flex items-center justify-between">
                  <span className="font-bold">Итого к оплате:</span>
                  <span className="text-2xl font-bold text-neon-green">{total}₽</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-3">
              <Button
                onClick={handleTopup}
                disabled={currentAmount < 50 || !steamLogin.trim()}
                className="w-full bg-[#66c0f4] text-white hover:bg-[#4a9fd6] h-12 text-lg font-semibold disabled:opacity-50"
                size="lg"
              >
                <Icon name="Wallet" size={20} className="mr-2" />
                Пополнить на {total}₽
              </Button>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Shield" size={14} className="text-neon-green" />
                <span>Безопасная оплата • Моментальное зачисление</span>
              </div>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="bg-card/50 backdrop-blur border-neon-green/30">
              <CardHeader className="pb-3">
                <Icon name="Zap" size={32} className="text-neon-green mb-2" />
                <CardTitle className="text-sm">Мгновенно</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Деньги приходят на счет за 1-2 минуты</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur border-[#66c0f4]/30">
              <CardHeader className="pb-3">
                <Icon name="Shield" size={32} className="text-[#66c0f4] mb-2" />
                <CardTitle className="text-sm">Безопасно</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Официальный метод пополнения Steam</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur border-neon-purple/30">
              <CardHeader className="pb-3">
                <Icon name="Percent" size={32} className="text-neon-purple mb-2" />
                <CardTitle className="text-sm">Выгодно</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Минимальная комиссия всего 2%</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}