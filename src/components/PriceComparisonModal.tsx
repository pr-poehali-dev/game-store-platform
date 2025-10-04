import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useCurrency, type Region } from '@/contexts/CurrencyContext';
import { motion } from 'framer-motion';

interface PriceComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  basePrice: number;
  gameName: string;
}

const allRegions: Array<{
  region: Region;
  flag: string;
  name: string;
  description: string;
}> = [
  { region: 'turkey', flag: '🇹🇷', name: 'Турция', description: 'Самые низкие цены' },
  { region: 'china', flag: '🇨🇳', name: 'Китай', description: 'Очень дёшево' },
  { region: 'ukraine', flag: '🇺🇦', name: 'Украина', description: 'Выгодно' },
  { region: 'russia', flag: '🇷🇺', name: 'Россия', description: 'Базовая цена' },
  { region: 'europe', flag: '🇪🇺', name: 'Европа', description: 'Премиум' },
  { region: 'usa', flag: '🇺🇸', name: 'США', description: 'Дорого' },
];

export default function PriceComparisonModal({ isOpen, onClose, basePrice, gameName }: PriceComparisonModalProps) {
  const { getRegionalPrice, formatPrice, setRegion, region: currentRegion } = useCurrency();

  const pricesData = allRegions.map(({ region, flag, name, description }) => {
    const regionalPrice = getRegionalPrice(basePrice, region);
    const formattedPrice = formatPrice(regionalPrice);
    const savings = Math.round(((basePrice - regionalPrice) / basePrice) * 100);
    
    return {
      region,
      flag,
      name,
      description,
      price: regionalPrice,
      formattedPrice,
      savings,
      isCurrentRegion: region === currentRegion,
    };
  }).sort((a, b) => a.price - b.price);

  const handleSelectRegion = (region: Region) => {
    setRegion(region);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Icon name="Globe" size={28} />
            Сравнение цен по регионам
          </DialogTitle>
          <DialogDescription>
            {gameName} — выберите регион с лучшей ценой
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {pricesData.map((item, index) => (
            <motion.div
              key={item.region}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSelectRegion(item.region)}
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                ${item.isCurrentRegion 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/50 hover:bg-accent/50'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      {item.isCurrentRegion && (
                        <Badge variant="default" className="text-xs">
                          <Icon name="Check" size={12} className="mr-1" />
                          Выбрано
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {item.formattedPrice}
                  </div>
                  {item.savings !== 0 && (
                    <Badge
                      variant={item.savings > 0 ? 'default' : 'destructive'}
                      className="mt-1"
                    >
                      {item.savings > 0 ? (
                        <>
                          <Icon name="TrendingDown" size={12} className="mr-1" />
                          Экономия {item.savings}%
                        </>
                      ) : (
                        <>
                          <Icon name="TrendingUp" size={12} className="mr-1" />
                          +{Math.abs(item.savings)}%
                        </>
                      )}
                    </Badge>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-start gap-2 text-sm">
            <Icon name="Info" size={16} className="mt-0.5 text-primary" />
            <div>
              <p className="font-semibold mb-1">Как работают региональные цены?</p>
              <p className="text-muted-foreground">
                Издатели устанавливают разные цены для разных стран с учётом покупательской способности. 
                Турция и Китай — традиционно самые дешёвые регионы для покупки игр.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
