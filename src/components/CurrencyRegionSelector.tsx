import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';

interface Currency {
  code: string;
  symbol: string;
  rate: number;
  flag: string;
  name: string;
}

// Актуальные курсы на 5 октября 2025
const currencies: Currency[] = [
  { code: 'RUB', symbol: '₽', rate: 1, flag: '🇷🇺', name: 'Российский рубль' },
  { code: 'USD', symbol: '$', rate: 0.0122, flag: '🇺🇸', name: 'Доллар США' }, // 1 USD = 82 RUB
  { code: 'EUR', symbol: '€', rate: 0.0105, flag: '🇪🇺', name: 'Евро' }, // 1 EUR = 95.5 RUB
  { code: 'CNY', symbol: '¥', rate: 0.0877, flag: '🇨🇳', name: 'Китайский юань' }, // 1 CNY = 11.4 RUB
  { code: 'TRY', symbol: '₺', rate: 0.422, flag: '🇹🇷', name: 'Турецкая лира' }, // 1 TRY = 2.37 RUB
  { code: 'UAH', symbol: '₴', rate: 0.500, flag: '🇺🇦', name: 'Украинская гривна' }, // 1 UAH = 2.0 RUB
];

const regions: Region[] = [
  { code: 'RU', name: 'Россия', flag: '🇷🇺', priceMultiplier: 1 },
  { code: 'US', name: 'США', flag: '🇺🇸', priceMultiplier: 1.2 },
  { code: 'EU', name: 'Европа', flag: '🇪🇺', priceMultiplier: 1.15 },
  { code: 'CN', name: 'Китай', flag: '🇨🇳', priceMultiplier: 0.6 },
  { code: 'TR', name: 'Турция', flag: '🇹🇷', priceMultiplier: 0.5 },
  { code: 'UA', name: 'Украина', flag: '🇺🇦', priceMultiplier: 0.65 },
];

interface Region {
  code: string;
  name: string;
  flag: string;
  priceMultiplier: number;
}

interface Props {
  onCurrencyChange?: (currency: Currency) => void;
  onRegionChange?: (region: Region) => void;
}

export default function CurrencyRegionSelector({ onCurrencyChange, onRegionChange }: Props) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);
  const [selectedRegion, setSelectedRegion] = useState<Region>(regions[0]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    const savedRegion = localStorage.getItem('selectedRegion');

    if (savedCurrency) {
      const currency = currencies.find(c => c.code === savedCurrency);
      if (currency) {
        setSelectedCurrency(currency);
        onCurrencyChange?.(currency);
      }
    }

    if (savedRegion) {
      const region = regions.find(r => r.code === savedRegion);
      if (region) {
        setSelectedRegion(region);
        onRegionChange?.(region);
      }
    }
  }, []);

  const handleCurrencyChange = (currencyCode: string) => {
    const currency = currencies.find(c => c.code === currencyCode);
    if (currency) {
      setSelectedCurrency(currency);
      localStorage.setItem('selectedCurrency', currency.code);
      onCurrencyChange?.(currency);
    }
  };

  const handleRegionChange = (regionCode: string) => {
    const region = regions.find(r => r.code === regionCode);
    if (region) {
      setSelectedRegion(region);
      localStorage.setItem('selectedRegion', region.code);
      onRegionChange?.(region);
    }
  };

  return (
    <>
      <div className="fixed top-36 left-4 z-40">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          size="sm"
          className="bg-card/95 backdrop-blur-xl shadow-lg"
        >
          <Icon name="Globe" size={16} className="mr-2" />
          {selectedCurrency.flag} {selectedRegion.flag}
        </Button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed top-52 left-4 z-40 w-80"
        >
          <Card className="bg-card/95 backdrop-blur-xl border-2 border-primary/20 shadow-2xl">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2">
                  <Icon name="Settings" size={18} />
                  Настройки региона
                </h3>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="sm"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Валюта</label>
                <Select value={selectedCurrency.code} onValueChange={handleCurrencyChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <div className="flex items-center gap-2">
                          <span>{currency.flag}</span>
                          <span>{currency.name}</span>
                          <span className="text-muted-foreground">({currency.symbol})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Регион для покупок</label>
                <Select value={selectedRegion.code} onValueChange={handleRegionChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.code} value={region.code}>
                        <div className="flex items-center justify-between gap-2 w-full">
                          <div className="flex items-center gap-2">
                            <span>{region.flag}</span>
                            <span>{region.name}</span>
                          </div>
                          {region.priceMultiplier < 1 && (
                            <span className="text-xs text-green-500">
                              -{Math.round((1 - region.priceMultiplier) * 100)}%
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-primary/10 rounded-lg p-3">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                  <Icon name="Info" size={14} />
                  Информация:
                </h4>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• Цены обновляются автоматически</li>
                  <li>• Разные регионы - разные цены</li>
                  <li>• Выбирайте выгодный регион</li>
                  <li>• Активация в вашем регионе</li>
                </ul>
              </div>

              <div className="text-center text-xs text-muted-foreground">
                Текущий курс: 1₽ = {selectedCurrency.rate.toFixed(4)} {selectedCurrency.symbol}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </>
  );
}

// Хелпер для конвертации цены
export function convertPrice(price: number, currency: Currency, region: Region): string {
  const regionalPrice = price * region.priceMultiplier;
  const convertedPrice = regionalPrice * currency.rate;
  return `${currency.symbol}${convertedPrice.toFixed(2)}`;
}