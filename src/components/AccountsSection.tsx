import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';

interface AccountOffer {
  id: number;
  platform: 'PlayStation' | 'Xbox';
  region?: string;
  price: number;
  includes: string[];
  description: string;
  popular?: boolean;
}

const accountOffers: AccountOffer[] = [
  {
    id: 1,
    platform: 'PlayStation',
    region: 'Турция',
    price: 499,
    includes: ['Новый аккаунт', 'Регион Турция', 'Полный доступ', 'Инструкция по настройке'],
    description: 'Готовый турецкий PSN аккаунт для покупки игр по выгодным ценам',
    popular: true
  },
  {
    id: 2,
    platform: 'PlayStation',
    region: 'Индия',
    price: 449,
    includes: ['Новый аккаунт', 'Регион Индия', 'Полный доступ', 'Инструкция по настройке'],
    description: 'Индийский PSN аккаунт - самые низкие цены на игры'
  },
  {
    id: 3,
    platform: 'PlayStation',
    region: 'Украина',
    price: 399,
    includes: ['Новый аккаунт', 'Регион Украина', 'Полный доступ', 'Инструкция', 'Русский язык в играх'],
    description: 'Украинский PSN аккаунт с поддержкой русского языка'
  },
  {
    id: 4,
    platform: 'Xbox',
    price: 599,
    includes: ['Новый аккаунт Xbox', 'Любой регион', 'Game Pass совместимость', 'Инструкция по настройке'],
    description: 'Готовый Xbox аккаунт для доступа к играм и подпискам',
    popular: true
  },
  {
    id: 5,
    platform: 'Xbox',
    price: 499,
    includes: ['Базовый Xbox аккаунт', 'Настройка региона', 'Поддержка 24/7'],
    description: 'Стартовый Xbox аккаунт с возможностью смены региона'
  }
];

interface AccountsSectionProps {
  onBuyAccount: (account: AccountOffer) => void;
}

export default function AccountsSection({ onBuyAccount }: AccountsSectionProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<'PlayStation' | 'Xbox'>('PlayStation');

  const filteredAccounts = accountOffers.filter(a => a.platform === selectedPlatform);

  return (
    <section className="py-16 bg-gradient-to-br from-background via-neon-purple/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Icon name="UserPlus" size={32} className="text-neon-purple" />
            Покупка аккаунтов
          </h3>
          <p className="text-muted-foreground text-lg">
            Готовые аккаунты для доступа к региональным ценам
          </p>
        </motion.div>

        <Tabs value={selectedPlatform} onValueChange={(v) => setSelectedPlatform(v as 'PlayStation' | 'Xbox')} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-muted h-12">
            <TabsTrigger value="PlayStation" className="text-base data-[state=active]:bg-playstation data-[state=active]:text-white">
              <Icon name="Gamepad" size={18} className="mr-2" />
              PlayStation
            </TabsTrigger>
            <TabsTrigger value="Xbox" className="text-base data-[state=active]:bg-xbox data-[state=active]:text-white">
              <Icon name="Gamepad2" size={18} className="mr-2" />
              Xbox
            </TabsTrigger>
          </TabsList>

          <TabsContent value="PlayStation" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAccounts.map((account, idx) => (
                <motion.div
                  key={account.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className={`h-full ${account.popular ? 'border-neon-pink' : 'border-border'}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon name="Globe" size={20} className="text-playstation" />
                          <Badge variant="outline" className="border-playstation text-playstation">
                            {account.region}
                          </Badge>
                        </div>
                        {account.popular && (
                          <Badge className="bg-neon-pink text-white">Популярный</Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">PSN {account.region}</CardTitle>
                      <CardDescription className="text-sm mt-2">
                        {account.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-neon-green">{account.price}₽</span>
                          <span className="text-sm text-muted-foreground">за аккаунт</span>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground">В комплекте:</p>
                          {account.includes.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <Icon name="Check" size={14} className="text-neon-green" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        <Button 
                          className="w-full bg-gradient-to-r from-playstation to-neon-pink hover:opacity-90 mt-4"
                          onClick={() => onBuyAccount(account)}
                        >
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          Купить аккаунт
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 p-6 rounded-lg bg-card/50 border border-border"
            >
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="Info" size={18} className="text-neon-purple" />
                Зачем покупать аккаунт PlayStation?
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <p className="mb-2">• <strong>Экономия до 70%</strong> на играх благодаря региональным ценам</p>
                  <p className="mb-2">• <strong>Доступ к эксклюзивам</strong> раньше официального релиза</p>
                </div>
                <div>
                  <p className="mb-2">• <strong>Полный контроль</strong> - аккаунт полностью ваш</p>
                  <p className="mb-2">• <strong>Поддержка 24/7</strong> при настройке и использовании</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="Xbox" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAccounts.map((account, idx) => (
                <motion.div
                  key={account.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className={`h-full ${account.popular ? 'border-xbox' : 'border-border'}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon name="Gamepad2" size={20} className="text-xbox" />
                          <Badge variant="outline" className="border-xbox text-xbox">
                            Xbox Account
                          </Badge>
                        </div>
                        {account.popular && (
                          <Badge className="bg-xbox text-white">Популярный</Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">Xbox Аккаунт</CardTitle>
                      <CardDescription className="text-sm mt-2">
                        {account.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-neon-green">{account.price}₽</span>
                          <span className="text-sm text-muted-foreground">за аккаунт</span>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground">В комплекте:</p>
                          {account.includes.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <Icon name="Check" size={14} className="text-neon-green" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        <Button 
                          className="w-full bg-gradient-to-r from-xbox to-neon-green hover:opacity-90 mt-4"
                          onClick={() => onBuyAccount(account)}
                        >
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          Купить аккаунт
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 p-6 rounded-lg bg-card/50 border border-border"
            >
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="Info" size={18} className="text-xbox" />
                Преимущества Xbox аккаунта
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <p className="mb-2">• <strong>Game Pass</strong> - доступ к сотням игр по подписке</p>
                  <p className="mb-2">• <strong>Cloud Gaming</strong> - играйте на любом устройстве</p>
                </div>
                <div>
                  <p className="mb-2">• <strong>Xbox Live Gold</strong> - онлайн мультиплеер и скидки</p>
                  <p className="mb-2">• <strong>Кросс-платформа</strong> - синхронизация с PC</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
