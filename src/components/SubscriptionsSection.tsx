import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';

interface Subscription {
  id: number;
  name: string;
  platform: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
}

interface SubscriptionsSectionProps {
  filteredSubs: Subscription[];
  addToCart: (item: Subscription, type: 'subscription') => void;
}

export default function SubscriptionsSection({ filteredSubs, addToCart }: SubscriptionsSectionProps) {
  return (
    <section id="subscriptions" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl font-bold mb-8">Подписки</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubs.map((sub, idx) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
            <Card className="border-border bg-card hover:border-neon-purple/50 transition-all duration-300 hover:glow-purple h-full">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={sub.platform === 'Xbox' ? 'bg-xbox text-white' : 'bg-playstation text-white'}>
                    {sub.platform}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{sub.duration}</span>
                </div>
                <CardTitle className="text-2xl">{sub.name}</CardTitle>
                <CardDescription>{sub.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {sub.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Icon name="Check" size={16} className="text-neon-green mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="text-3xl font-bold text-neon-purple">{sub.price}₽</div>
                <Button 
                  className="bg-neon-purple text-white hover:bg-neon-purple/90 glow-purple"
                  onClick={() => addToCart(sub, 'subscription')}
                >
                  <Icon name="ShoppingCart" size={16} className="mr-2" />
                  Купить
                </Button>
              </CardFooter>
            </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}