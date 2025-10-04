import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getExchangeRates, formatCurrency, convertFromRUB, type ExchangeRates } from '@/utils/currencyRates';

export type Currency = 'RUB' | 'USD' | 'EUR' | 'CNY' | 'TRY' | 'UAH';
export type Region = 'russia' | 'usa' | 'europe' | 'china' | 'turkey' | 'ukraine';

interface CurrencyContextType {
  currency: Currency;
  region: Region;
  exchangeRates: ExchangeRates | null;
  setCurrency: (currency: Currency) => void;
  setRegion: (region: Region) => void;
  convertPrice: (basePrice: number) => number;
  formatPrice: (price: number) => string;
  getRegionalPrice: (basePrice: number, region: Region) => number;
  refreshRates: () => Promise<void>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const currencySymbols: Record<Currency, string> = {
  RUB: '₽',
  USD: '$',
  EUR: '€',
  CNY: '¥',
  TRY: '₺',
  UAH: '₴'
};

// Региональные мультипликаторы (как в Steam)
const regionalMultipliers: Record<Region, number> = {
  russia: 1.0,      // Базовая цена
  usa: 1.2,         // +20% (премиум регион)
  europe: 1.15,     // +15%
  china: 0.6,       // -40% (дешевый регион)
  turkey: 0.5,      // -50% (самый дешевый)
  ukraine: 0.65,    // -35%
};

const regionToCurrency: Record<Region, Currency> = {
  russia: 'RUB',
  usa: 'USD',
  europe: 'EUR',
  china: 'CNY',
  turkey: 'TRY',
  ukraine: 'UAH'
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('RUB');
  const [region, setRegion] = useState<Region>('russia');
  const [exchangeRatesData, setExchangeRatesData] = useState<ExchangeRates | null>(null);

  useEffect(() => {
    loadExchangeRates();
  }, []);

  const loadExchangeRates = async () => {
    try {
      const rates = await getExchangeRates();
      setExchangeRatesData(rates);
    } catch (error) {
      console.error('Ошибка загрузки курсов валют:', error);
    }
  };

  const refreshRates = async () => {
    localStorage.removeItem('exchange_rates_cache');
    await loadExchangeRates();
  };

  const getRegionalPrice = (basePrice: number, targetRegion: Region): number => {
    return Math.round(basePrice * regionalMultipliers[targetRegion]);
  };

  const convertPrice = (basePrice: number): number => {
    if (!exchangeRatesData) return basePrice;

    const regionalPrice = getRegionalPrice(basePrice, region);
    const targetCurrency = regionToCurrency[region];
    
    if (targetCurrency === 'RUB') {
      return regionalPrice;
    }

    const converted = convertFromRUB(regionalPrice, targetCurrency, exchangeRatesData);
    return Math.round(converted);
  };

  const formatPrice = (price: number): string => {
    const targetCurrency = regionToCurrency[region];
    return formatCurrency(price, targetCurrency);
  };

  const handleSetRegion = (newRegion: Region) => {
    setRegion(newRegion);
    setCurrency(regionToCurrency[newRegion]);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        region,
        exchangeRates: exchangeRatesData,
        setCurrency,
        setRegion: handleSetRegion,
        convertPrice,
        formatPrice,
        getRegionalPrice,
        refreshRates
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
}