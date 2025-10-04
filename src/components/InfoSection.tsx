import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';

export default function InfoSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-background to-neon-purple/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-4xl font-bold mb-4">Как работает покупка?</h3>
          <p className="text-muted-foreground text-lg">Просто, быстро и безопасно</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-card/50 backdrop-blur border-neon-green/30 h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-neon-green/20 rounded-full flex items-center justify-center mb-3">
                  <Icon name="ShoppingCart" size={24} className="text-neon-green" />
                </div>
                <CardTitle className="text-lg">1. Выберите игру</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Из каталога 50+ актуальных хитов 2024-2025 для Xbox и PlayStation. Скидки до 80%!
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-card/50 backdrop-blur border-neon-pink/30 h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-neon-pink/20 rounded-full flex items-center justify-center mb-3">
                  <Icon name="CreditCard" size={24} className="text-neon-pink" />
                </div>
                <CardTitle className="text-lg">2. Оплатите</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Банковские карты РФ (Visa, Mastercard, МИР) или Система быстрых платежей (СБП)
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-card/50 backdrop-blur border-neon-purple/30 h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-neon-purple/20 rounded-full flex items-center justify-center mb-3">
                  <Icon name="User" size={24} className="text-neon-purple" />
                </div>
                <CardTitle className="text-lg">3. Укажите аккаунт</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Покупка на ваш аккаунт или получите новый готовый аккаунт с игрой
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-card/50 backdrop-blur border-blue-500/30 h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                  <Icon name="Zap" size={24} className="text-blue-400" />
                </div>
                <CardTitle className="text-lg">4. Получите игру</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Моментальная доставка на email или в Telegram. Начните играть сразу!
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-card/80 to-neon-purple/5 border-neon-purple/30">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Icon name="Info" size={24} className="text-neon-purple" />
                Важная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-neon-green mb-2 flex items-center gap-2">
                    <Icon name="Globe" size={18} />
                    Регионы PlayStation
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Игры для PlayStation доступны в регионах: <Badge variant="outline" className="ml-1">Турция</Badge> 
                    <Badge variant="outline" className="ml-1">Индия</Badge> 
                    <Badge variant="outline" className="ml-1">Украина</Badge>
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    При покупке укажите нужный регион или получите готовый аккаунт
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-neon-pink mb-2 flex items-center gap-2">
                    <Icon name="Shield" size={18} />
                    Гарантии
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    • Все игры лицензионные<br/>
                    • Техподдержка 24/7<br/>
                    • Проверенный продавец<br/>
                    • Быстрая доставка
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                  <Icon name="Store" size={18} />
                  Откуда берутся низкие цены?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Мы работаем напрямую с цифровыми магазинами разных регионов и закупаем игры по региональным ценам. 
                  Также отслеживаем акции и распродажи в официальных магазинах Xbox, PlayStation Store, Steam и других платформах. 
                  Это позволяет предлагать вам игры дешевле, чем в обычных магазинах вашего региона.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}