import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useCurrency } from '@/contexts/CurrencyContext';
import { getExchangeRates, getRateChange, getCurrencyFlag, type ExchangeRates } from '@/utils/currencyRates';

export default function CurrencyRatesWidget() {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { refreshRates } = useCurrency();

  useEffect(() => {
    loadRates();
  }, []);

  const loadRates = async () => {
    setIsLoading(true);
    try {
      const fetchedRates = await getExchangeRates();
      setRates(fetchedRates);
    } catch (error) {
      console.error('Ошибка загрузки курсов:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    await refreshRates();
    await loadRates();
  };

  if (!rates) {
    return null;
  }

  const currencies: Array<{ code: keyof Omit<ExchangeRates, 'lastUpdated'>; name: string }> = [
    { code: 'USD', name: 'Доллар США' },
    { code: 'EUR', name: 'Евро' },
    { code: 'GBP', name: 'Фунт стерлингов' },
    { code: 'CNY', name: 'Китайский юань' },
  ];

  const lastUpdateTime = new Date(rates.lastUpdated).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <Icon name="DollarSign" size={18} />
              Курсы валют
            </CardTitle>
            <CardDescription className="text-xs mt-1">
              Обновлено: {lastUpdateTime}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="h-8 w-8 p-0"
          >
            <Icon name={isLoading ? "Loader2" : "RefreshCw"} size={16} className={isLoading ? "animate-spin" : ""} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          {currencies.map(({ code, name }) => {
            const rate = rates[code];
            const change = getRateChange(code, rates);
            
            return (
              <div key={code} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getCurrencyFlag(code)}</span>
                  <div>
                    <p className="text-sm font-medium">{code}</p>
                    <p className="text-xs text-muted-foreground">{name}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-semibold">{rate.toFixed(2)} ₽</p>
                  <Badge 
                    variant={change.isPositive ? "default" : "destructive"} 
                    className="text-xs h-5"
                  >
                    <Icon 
                      name={change.isPositive ? "TrendingUp" : "TrendingDown"} 
                      size={10} 
                      className="mr-1"
                    />
                    {Math.abs(change.percent)}%
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Info" size={12} />
            <span>Данные ЦБ РФ, обновление каждые 4 часа</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
