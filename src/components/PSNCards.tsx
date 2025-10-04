import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';

interface PSNCard {
  id: number;
  value: number;
  price: number;
  region: string;
  discount?: number;
  popular?: boolean;
}

const psnCards: PSNCard[] = [
  { id: 1, value: 1000, price: 1099, region: 'Турция', popular: true },
  { id: 2, value: 2000, price: 2149, region: 'Турция', discount: 5 },
  { id: 3, value: 3000, price: 3199, region: 'Турция', discount: 7 },
  { id: 4, value: 5000, price: 5249, region: 'Турция', discount: 10 },
  
  { id: 5, value: 1000, price: 999, region: 'Индия', popular: true },
  { id: 6, value: 2000, price: 1949, region: 'Индия', discount: 5 },
  { id: 7, value: 3000, price: 2899, region: 'Индия', discount: 8 },
  { id: 8, value: 5000, price: 4749, region: 'Индия', discount: 12 },
  
  { id: 9, value: 1000, price: 1049, region: 'Украина' },
  { id: 10, value: 2000, price: 2049, region: 'Украина', discount: 5 },
  { id: 11, value: 3000, price: 3049, region: 'Украина', discount: 7 },
  { id: 12, value: 5000, price: 4999, region: 'Украина', discount: 10 },
];

interface PSNCardsProps {
  onBuy: (card: PSNCard) => void;
}

export default function PSNCards({ onBuy }: PSNCardsProps) {
  const regions = ['Турция', 'Индия', 'Украина'];

  return (
    <section className="py-16 bg-gradient-to-br from-background via-playstation/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Icon name="CreditCard" size={32} className="text-playstation" />
            Карты пополнения PlayStation
          </h3>
          <p className="text-muted-foreground text-lg">
            Пополните баланс PSN кошелька по выгодным ценам
          </p>
        </motion.div>

        {regions.map((region, regionIdx) => (
          <div key={region} className="mb-12 last:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: regionIdx * 0.1 }}
              className="mb-6"
            >
              <h4 className="text-2xl font-bold flex items-center gap-2">
                <Icon name="Globe" size={24} className="text-playstation" />
                PSN {region}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                Регион аккаунта: {region}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {psnCards
                .filter(card => card.region === region)
                .map((card, idx) => {
                  const finalPrice = card.discount 
                    ? Math.round(card.price * (1 - card.discount / 100))
                    : card.price;
                  const savings = card.price - finalPrice;

                  return (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <Card className={`h-full ${card.popular ? 'border-playstation' : 'border-border'}`}>
                        <CardHeader>
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant="outline" className="border-playstation text-playstation">
                              {card.value} ₽
                            </Badge>
                            {card.popular && (
                              <Badge className="bg-playstation text-white">Популярная</Badge>
                            )}
                            {card.discount && card.discount > 0 && (
                              <Badge className="bg-red-600 text-white">-{card.discount}%</Badge>
                            )}
                          </div>
                          <CardTitle className="text-xl">
                            Карта {card.value}₽
                          </CardTitle>
                          <CardDescription className="text-sm">
                            Пополнение PSN кошелька {region}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-baseline gap-2">
                              {card.discount ? (
                                <>
                                  <span className="text-2xl font-bold text-neon-green">{finalPrice}₽</span>
                                  <span className="text-sm text-muted-foreground line-through">{card.price}₽</span>
                                </>
                              ) : (
                                <span className="text-2xl font-bold text-neon-green">{card.price}₽</span>
                              )}
                            </div>

                            {card.discount && savings > 0 && (
                              <p className="text-xs text-muted-foreground">
                                Экономия {savings}₽
                              </p>
                            )}

                            <div className="space-y-1 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Icon name="Check" size={12} className="text-neon-green" />
                                <span>Моментальная доставка</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon name="Check" size={12} className="text-neon-green" />
                                <span>Код активации</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon name="Check" size={12} className="text-neon-green" />
                                <span>Гарантия активации</span>
                              </div>
                            </div>

                            <Button 
                              className="w-full bg-gradient-to-r from-playstation to-neon-pink hover:opacity-90 mt-4"
                              onClick={() => onBuy(card)}
                            >
                              <Icon name="ShoppingCart" size={16} className="mr-2" />
                              Купить карту
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-lg bg-card/50 border border-border"
        >
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Icon name="Info" size={18} className="text-playstation" />
            Важная информация
          </h4>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div>
              <h5 className="font-semibold text-foreground mb-2">Как использовать карту:</h5>
              <ol className="space-y-1 list-decimal list-inside">
                <li>Войдите в свой PSN аккаунт</li>
                <li>Перейдите в PlayStation Store</li>
                <li>Выберите "Погасить код"</li>
                <li>Введите полученный код</li>
              </ol>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-2">Покупка игр для Xbox:</h5>
              <div className="bg-xbox/10 border border-xbox/30 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Icon name="AlertCircle" size={16} className="text-xbox mt-0.5" />
                  <div>
                    <p className="font-medium text-xbox mb-1">Только через наш магазин!</p>
                    <p className="text-xs">
                      Покупка игр на аккаунт Xbox доступна только через наш сервис из-за региональных ограничений. 
                      Мы обеспечиваем правильную настройку и гарантию активации.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
