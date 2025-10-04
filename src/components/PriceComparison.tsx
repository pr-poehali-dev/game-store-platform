import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';

interface CompetitorPrice {
  store: string;
  price: number;
  url?: string;
}

interface PriceComparisonProps {
  ourPrice: number;
  competitorPrices?: CompetitorPrice[];
  discount?: number;
}

export default function PriceComparison({ ourPrice, competitorPrices, discount }: PriceComparisonProps) {
  if (!competitorPrices || competitorPrices.length === 0) {
    return null;
  }

  const finalPrice = discount ? Math.round(ourPrice * (1 - discount / 100)) : ourPrice;
  const avgCompetitorPrice = Math.round(
    competitorPrices.reduce((sum, p) => sum + p.price, 0) / competitorPrices.length
  );
  const savings = avgCompetitorPrice - finalPrice;
  const savingsPercent = Math.round((savings / avgCompetitorPrice) * 100);

  return (
    <Card className="bg-gradient-to-br from-neon-green/5 to-transparent border-neon-green/30 mt-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
              <Icon name="TrendingDown" size={16} className="text-neon-green" />
              Сравнение цен
            </h4>
            <p className="text-xs text-muted-foreground">
              Экономия {savings}₽ ({savingsPercent}%) по сравнению с конкурентами
            </p>
          </div>
          <Badge className="bg-neon-green text-background">
            Лучшая цена
          </Badge>
        </div>

        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between p-2 rounded-lg bg-neon-green/10 border border-neon-green/30"
          >
            <div className="flex items-center gap-2">
              <Icon name="Store" size={16} className="text-neon-green" />
              <span className="font-semibold text-sm">GodStoreGame</span>
            </div>
            <span className="font-bold text-neon-green">{finalPrice}₽</span>
          </motion.div>

          {competitorPrices.map((competitor, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
            >
              <div className="flex items-center gap-2">
                <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{competitor.store}</span>
              </div>
              <span className="text-sm text-muted-foreground">{competitor.price}₽</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="Info" size={12} />
          <span>Цены конкурентов обновлены сегодня</span>
        </div>
      </CardContent>
    </Card>
  );
}
