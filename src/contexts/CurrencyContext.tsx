import { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = 'RUB' | 'USD' | 'EUR' | 'TRY' | 'UAH' | 'KZT';
export type Region = 'russia' | 'turkey' | 'argentina' | 'ukraine' | 'kazakhstan' | 'usa';

interface RegionalPrice {
  russia: number;
  turkey: number;
  argentina: number;
  ukraine: number;
  kazakhstan: number;
  usa: number;
}

interface CurrencyContextType {
  currency: Currency;
  region: Region;
  setCurrency: (currency: Currency) => void;
  setRegion: (region: Region) => void;
  convertPrice: (basePrice: number) => number;
  formatPrice: (price: number) => string;
  getRegionalPrice: (basePrice: number, region: Region) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const exchangeRates: Record<Currency, number> = {
  RUB: 1,
  USD: 0.011,
  EUR: 0.010,
  TRY: 0.35,
  UAH: 0.42,
  KZT: 5.0
};

const currencySymbols: Record<Currency, string> = {
  RUB: '₽',
  USD: '$',
  EUR: '€',
  TRY: '₺',
  UAH: '₴',
  KZT: '₸'
};

const regionalMultipliers: Record<Region, number> = {
  russia: 1.0,
  turkey: 0.35,
  argentina: 0.25,
  ukraine: 0.45,
  kazakhstan: 0.55,
  usa: 1.2
};

const regionToCurrency: Record<Region, Currency> = {
  russia: 'RUB',
  turkey: 'TRY',
  argentina: 'USD',
  ukraine: 'UAH',
  kazakhstan: 'KZT',
  usa: 'USD'
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('RUB');
  const [region, setRegion] = useState<Region>('russia');

  const getRegionalPrice = (basePrice: number, targetRegion: Region): number => {
    return Math.round(basePrice * regionalMultipliers[targetRegion]);
  };

  const convertPrice = (basePrice: number): number => {
    const regionalPrice = getRegionalPrice(basePrice, region);
    const targetCurrency = regionToCurrency[region];
    return Math.round(regionalPrice * exchangeRates[targetCurrency]);
  };

  const formatPrice = (price: number): string => {
    const targetCurrency = regionToCurrency[region];
    return `${price}${currencySymbols[targetCurrency]}`;
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
        setCurrency,
        setRegion: handleSetRegion,
        convertPrice,
        formatPrice,
        getRegionalPrice
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
