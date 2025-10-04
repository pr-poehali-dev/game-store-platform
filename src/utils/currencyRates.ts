/**
 * Актуальные курсы валют с автообновлением
 * Источники: ЦБ РФ API + fallback статичные курсы
 */

export interface ExchangeRates {
  USD: number;
  EUR: number;
  CNY: number;
  TRY: number;
  UAH: number;
  lastUpdated: number;
}

// Актуальные курсы на 04.10.2025
const FALLBACK_RATES: ExchangeRates = {
  USD: 82.0,   // Доллар США
  EUR: 96.0,   // Евро
  CNY: 11.5,   // Китайский юань
  TRY: 2.48,   // Турецкая лира (1 TRY = 2.48 RUB)
  UAH: 2.05,   // Украинская гривна (1 UAH = 2.05 RUB)
  lastUpdated: Date.now(),
};

const CACHE_KEY = 'exchange_rates_cache';
const CACHE_DURATION = 4 * 60 * 60 * 1000; // 4 часа

/**
 * Получить актуальные курсы валют
 */
export async function getExchangeRates(): Promise<ExchangeRates> {
  // Проверяем кэш
  const cached = getCachedRates();
  if (cached && Date.now() - cached.lastUpdated < CACHE_DURATION) {
    return cached;
  }

  // Пробуем загрузить свежие курсы
  try {
    const rates = await fetchExchangeRates();
    saveRatesToCache(rates);
    return rates;
  } catch (error) {
    console.error('Ошибка загрузки курсов валют:', error);
    // Возвращаем кэш или fallback
    return cached || FALLBACK_RATES;
  }
}

/**
 * Получить курсы из кэша
 */
function getCachedRates(): ExchangeRates | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const rates: ExchangeRates = JSON.parse(cached);
    
    // Проверяем, не устарел ли кэш (max 24 часа)
    if (Date.now() - rates.lastUpdated > 24 * 60 * 60 * 1000) {
      return null;
    }
    
    return rates;
  } catch (error) {
    return null;
  }
}

/**
 * Сохранить курсы в кэш
 */
function saveRatesToCache(rates: ExchangeRates): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(rates));
  } catch (error) {
    console.error('Ошибка сохранения курсов:', error);
  }
}

/**
 * Загрузить курсы с ЦБ РФ API
 */
async function fetchExchangeRates(): Promise<ExchangeRates> {
  // Используем публичный API ЦБ РФ
  const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  const valutes = data.Valute;

  return {
    USD: valutes.USD?.Value || FALLBACK_RATES.USD,
    EUR: valutes.EUR?.Value || FALLBACK_RATES.EUR,
    CNY: valutes.CNY?.Value || FALLBACK_RATES.CNY,
    TRY: valutes.TRY?.Value / 10 || FALLBACK_RATES.TRY, // ЦБ дает за 10 лир
    UAH: valutes.UAH?.Value / 10 || FALLBACK_RATES.UAH, // ЦБ дает за 10 гривен
    lastUpdated: Date.now(),
  };
}

/**
 * Конвертировать рубли в валюту
 */
export function convertFromRUB(amountRUB: number, currency: keyof Omit<ExchangeRates, 'lastUpdated'>, rates: ExchangeRates): number {
  const rate = rates[currency];
  return Number((amountRUB / rate).toFixed(2));
}

/**
 * Конвертировать валюту в рубли
 */
export function convertToRUB(amount: number, currency: keyof Omit<ExchangeRates, 'lastUpdated'>, rates: ExchangeRates): number {
  const rate = rates[currency];
  return Math.round(amount * rate);
}

/**
 * Форматировать сумму с символом валюты
 */
export function formatCurrency(amount: number, currency: string): string {
  const symbols: Record<string, string> = {
    RUB: '₽',
    USD: '$',
    EUR: '€',
    CNY: '¥',
    TRY: '₺',
    UAH: '₴',
  };

  const symbol = symbols[currency] || currency;
  
  // Для рублей, гривны - символ после
  if (['RUB', 'UAH'].includes(currency)) {
    return `${amount.toLocaleString('ru-RU')}${symbol}`;
  }
  
  // Для остальных - символ перед
  return `${symbol}${amount.toLocaleString('en-US')}`;
}

/**
 * Получить изменение курса за период
 */
export function getRateChange(currency: keyof Omit<ExchangeRates, 'lastUpdated'>, currentRates: ExchangeRates): {
  change: number;
  percent: number;
  isPositive: boolean;
} {
  const current = currentRates[currency];
  const previous = FALLBACK_RATES[currency];
  
  const change = Number((current - previous).toFixed(2));
  const percent = Number(((change / previous) * 100).toFixed(2));
  
  return {
    change,
    percent,
    isPositive: change >= 0,
  };
}

/**
 * Инициализация - загрузка курсов при старте
 */
export async function initExchangeRates(): Promise<void> {
  try {
    await getExchangeRates();
    console.log('✅ Курсы валют загружены');
  } catch (error) {
    console.error('❌ Ошибка инициализации курсов валют:', error);
  }
}

/**
 * Получить названия валют
 */
export function getCurrencyName(code: string): string {
  const names: Record<string, string> = {
    RUB: 'Российский рубль',
    USD: 'Доллар США',
    EUR: 'Евро',
    CNY: 'Китайский юань',
    TRY: 'Турецкая лира',
    UAH: 'Украинская гривна',
  };
  
  return names[code] || code;
}

/**
 * Получить флаг страны для валюты
 */
export function getCurrencyFlag(code: string): string {
  const flags: Record<string, string> = {
    RUB: '🇷🇺',
    USD: '🇺🇸',
    EUR: '🇪🇺',
    CNY: '🇨🇳',
    TRY: '🇹🇷',
    UAH: '🇺🇦',
  };
  
  return flags[code] || '🌍';
}