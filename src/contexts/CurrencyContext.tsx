import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getExchangeRates, formatCurrency, convertFromRUB, type ExchangeRates } from '@/utils/currencyRates';

export type Currency = 'RUB' | 'USD' | 'EUR' | 'GBP' | 'CNY' | 'JPY' | 'KZT' | 'BYN';
export type Region = 'russia' | 'usa' | 'europe' | 'uk' | 'china' | 'japan' | 'kazakhstan' | 'belarus';

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
  GBP: '£',
  CNY: '¥',
  JPY: '¥',
  KZT: '₸',
  BYN: 'Br'
};

// Региональные мультипликаторы (для Steam-подобного ценообразования)
const regionalMultipliers: Record<Region, number> = {
  russia: 1.0,      // Базовая цена
  usa: 1.2,         // +20% (премиум регион)
  europe: 1.15,     // +15%
  uk: 1.25,         // +25%
  china: 0.6,       // -40% (дешевый регион)
  japan: 1.1,       // +10%
  kazakhstan: 0.7,  // -30%
  belarus: 0.85,    // -15%
};

const regionToCurrency: Record<Region, Currency> = {
  russia: 'RUB',
  usa: 'USD',
  europe: 'EUR',
  uk: 'GBP',
  china: 'CNY',
  japan: 'JPY',
  kazakhstan: 'KZT',
  belarus: 'BYN'
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