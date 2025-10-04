import { useState, createContext, useContext, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';

interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number;
  flag: string;
}

const currencies: Currency[] = [
  { code: 'RUB', symbol: '₽', name: 'Российский рубль', rate: 1, flag: '🇷🇺' },
  { code: 'USD', symbol: '$', name: 'Доллар США', rate: 0.011, flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Евро', rate: 0.010, flag: '🇪🇺' },
  { code: 'TRY', symbol: '₺', name: 'Турецкая лира', rate: 0.35, flag: '🇹🇷' },
  { code: 'UAH', symbol: '₴', name: 'Украинская гривна', rate: 0.45, flag: '🇺🇦' },
  { code: 'KZT', symbol: '₸', name: 'Казахстанский тенге', rate: 5.2, flag: '🇰🇿' }
];

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceRub: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(currencies[0]);

  const convertPrice = (priceRub: number): string => {
    const converted = priceRub * currency.rate;
    return `${currency.symbol}${converted.toFixed(currency.code === 'RUB' ? 0 : 2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice }}>
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

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <span className="text-lg">{currency.flag}</span>
          <span className="font-semibold">{currency.symbol}</span>
          <Icon name="ChevronDown" size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Выберите валюту</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {currencies.map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            onClick={() => setCurrency(curr)}
            className={`cursor-pointer ${currency.code === curr.code ? 'bg-primary/10' : ''}`}
          >
            <span className="text-lg mr-3">{curr.flag}</span>
            <div className="flex-1">
              <div className="font-semibold">{curr.code}</div>
              <div className="text-xs text-muted-foreground">{curr.name}</div>
            </div>
            {currency.code === curr.code && (
              <Icon name="Check" size={16} className="text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
