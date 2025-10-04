/**
 * Periodic Background Sync API для автообновления каталога
 * Позволяет обновлять данные в фоне даже когда сайт закрыт
 */

export interface SyncConfig {
  minInterval: number; // Минимальный интервал в миллисекундах
  tag: string; // Уникальный тег синхронизации
}

const SYNC_CONFIGS = {
  GAMES_CATALOG: {
    tag: 'sync-games-catalog',
    minInterval: 12 * 60 * 60 * 1000, // 12 часов
  },
  PRICE_UPDATES: {
    tag: 'sync-price-updates',
    minInterval: 6 * 60 * 60 * 1000, // 6 часов
  },
  NEW_RELEASES: {
    tag: 'sync-new-releases',
    minInterval: 24 * 60 * 60 * 1000, // 24 часа
  },
  DISCOUNTS: {
    tag: 'sync-discounts',
    minInterval: 3 * 60 * 60 * 1000, // 3 часа
  },
} as const;

/**
 * Проверка поддержки Periodic Background Sync
 */
export function isPeriodicSyncSupported(): boolean {
  return 'serviceWorker' in navigator && 'periodicSync' in ServiceWorkerRegistration.prototype;
}

/**
 * Регистрация периодической синхронизации
 */
export async function registerPeriodicSync(
  config: SyncConfig
): Promise<{ success: boolean; error?: string }> {
  if (!isPeriodicSyncSupported()) {
    console.warn('Periodic Background Sync не поддерживается');
    return { success: false, error: 'not_supported' };
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    
    // Проверяем разрешение
    const status = await navigator.permissions.query({
      name: 'periodic-background-sync' as PermissionName,
    });

    if (status.state === 'denied') {
      console.warn('Periodic Background Sync запрещена пользователем');
      return { success: false, error: 'permission_denied' };
    }

    // Регистрируем периодическую синхронизацию
    await (registration as any).periodicSync.register(config.tag, {
      minInterval: config.minInterval,
    });

    console.log(`Periodic Sync зарегистрирована: ${config.tag} (интервал: ${config.minInterval}ms)`);
    return { success: true };
    
  } catch (error) {
    console.error('Ошибка регистрации Periodic Sync:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Отмена периодической синхронизации
 */
export async function unregisterPeriodicSync(tag: string): Promise<boolean> {
  if (!isPeriodicSyncSupported()) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    await (registration as any).periodicSync.unregister(tag);
    console.log(`Periodic Sync отменена: ${tag}`);
    return true;
  } catch (error) {
    console.error('Ошибка отмены Periodic Sync:', error);
    return false;
  }
}

/**
 * Получить список зарегистрированных синхронизаций
 */
export async function getRegisteredSyncs(): Promise<string[]> {
  if (!isPeriodicSyncSupported()) {
    return [];
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const tags = await (registration as any).periodicSync.getTags();
    return tags;
  } catch (error) {
    console.error('Ошибка получения списка синхронизаций:', error);
    return [];
  }
}

/**
 * Инициализация всех периодических синхронизаций
 */
export async function initPeriodicSync(): Promise<void> {
  if (!isPeriodicSyncSupported()) {
    console.log('Periodic Background Sync не поддерживается, используется fallback (setInterval)');
    initFallbackSync();
    return;
  }

  console.log('Инициализация Periodic Background Sync...');

  // Регистрируем синхронизацию каталога игр
  await registerPeriodicSync(SYNC_CONFIGS.GAMES_CATALOG);

  // Регистрируем обновление цен
  await registerPeriodicSync(SYNC_CONFIGS.PRICE_UPDATES);

  // Регистрируем проверку новых релизов
  await registerPeriodicSync(SYNC_CONFIGS.NEW_RELEASES);

  // Регистрируем проверку скидок
  await registerPeriodicSync(SYNC_CONFIGS.DISCOUNTS);

  const registered = await getRegisteredSyncs();
  console.log('Зарегистрированные синхронизации:', registered);
}

/**
 * Fallback для браузеров без поддержки Periodic Sync
 * Использует обычный setInterval
 */
function initFallbackSync(): void {
  // Обновление каталога каждые 12 часов
  setInterval(() => {
    if (navigator.onLine) {
      syncGamesCatalog();
    }
  }, SYNC_CONFIGS.GAMES_CATALOG.minInterval);

  // Обновление цен каждые 6 часов
  setInterval(() => {
    if (navigator.onLine) {
      syncPriceUpdates();
    }
  }, SYNC_CONFIGS.PRICE_UPDATES.minInterval);

  // Проверка новых релизов каждые 24 часа
  setInterval(() => {
    if (navigator.onLine) {
      syncNewReleases();
    }
  }, SYNC_CONFIGS.NEW_RELEASES.minInterval);

  // Проверка скидок каждые 3 часа
  setInterval(() => {
    if (navigator.onLine) {
      syncDiscounts();
    }
  }, SYNC_CONFIGS.DISCOUNTS.minInterval);

  console.log('Fallback синхронизация инициализирована (setInterval)');
}

/**
 * Синхронизация каталога игр
 */
async function syncGamesCatalog(): Promise<void> {
  console.log('🔄 Синхронизация каталога игр...');
  
  try {
    const response = await fetch('/api/games?limit=1000');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const games = await response.json();
    localStorage.setItem('games_cache', JSON.stringify(games));
    localStorage.setItem('games_cache_timestamp', Date.now().toString());
    
    console.log(`✅ Каталог обновлен: ${games.length} игр`);
    
    // Отправляем событие об обновлении
    window.dispatchEvent(new CustomEvent('catalog-updated', { detail: { count: games.length } }));
    
  } catch (error) {
    console.error('❌ Ошибка синхронизации каталога:', error);
  }
}

/**
 * Синхронизация обновлений цен
 */
async function syncPriceUpdates(): Promise<void> {
  console.log('💰 Синхронизация цен...');
  
  try {
    const lastSync = localStorage.getItem('price_sync_timestamp');
    const url = lastSync 
      ? `/api/games/price-updates?since=${lastSync}`
      : '/api/games/price-updates';
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const updates = await response.json();
    
    if (updates.length > 0) {
      // Обновляем кэш игр с новыми ценами
      const cachedGames = JSON.parse(localStorage.getItem('games_cache') || '[]');
      updates.forEach((update: any) => {
        const game = cachedGames.find((g: any) => g.id === update.game_id);
        if (game) {
          game.price = update.new_price;
        }
      });
      
      localStorage.setItem('games_cache', JSON.stringify(cachedGames));
      localStorage.setItem('price_sync_timestamp', Date.now().toString());
      
      console.log(`✅ Обновлено цен: ${updates.length}`);
      
      window.dispatchEvent(new CustomEvent('prices-updated', { detail: { count: updates.length } }));
    }
    
  } catch (error) {
    console.error('❌ Ошибка синхронизации цен:', error);
  }
}

/**
 * Синхронизация новых релизов
 */
async function syncNewReleases(): Promise<void> {
  console.log('🎮 Проверка новых релизов...');
  
  try {
    const lastCheck = localStorage.getItem('new_releases_check_timestamp');
    const url = lastCheck 
      ? `/api/games/new-releases?since=${lastCheck}`
      : '/api/games/new-releases?days=7';
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const newGames = await response.json();
    
    if (newGames.length > 0) {
      localStorage.setItem('new_releases', JSON.stringify(newGames));
      localStorage.setItem('new_releases_check_timestamp', Date.now().toString());
      
      console.log(`✅ Найдено новых игр: ${newGames.length}`);
      
      // Показываем уведомление о новых играх
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`🎮 ${newGames.length} новых игр в каталоге!`, {
          body: newGames.slice(0, 3).map((g: any) => g.name).join(', '),
          icon: '/icon-192.png',
          badge: '/icon-192.png',
          tag: 'new-releases',
        });
      }
      
      window.dispatchEvent(new CustomEvent('new-releases', { detail: { games: newGames } }));
    }
    
  } catch (error) {
    console.error('❌ Ошибка проверки новых релизов:', error);
  }
}

/**
 * Синхронизация скидок
 */
async function syncDiscounts(): Promise<void> {
  console.log('🔥 Проверка новых скидок...');
  
  try {
    const response = await fetch('/api/games/discounts?active=true');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const discounts = await response.json();
    
    // Проверяем избранное пользователя
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const wishlistDiscounts = discounts.filter((d: any) => 
      wishlist.includes(d.game_id)
    );
    
    if (wishlistDiscounts.length > 0) {
      console.log(`✅ Скидки в избранном: ${wishlistDiscounts.length}`);
      
      // Показываем уведомление
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('💰 Скидки на игры из избранного!', {
          body: `${wishlistDiscounts.length} игр со скидкой до ${Math.max(...wishlistDiscounts.map((d: any) => d.discount_percent))}%`,
          icon: '/icon-192.png',
          badge: '/icon-192.png',
          tag: 'wishlist-discounts',
        });
      }
    }
    
    localStorage.setItem('active_discounts', JSON.stringify(discounts));
    localStorage.setItem('discounts_sync_timestamp', Date.now().toString());
    
    window.dispatchEvent(new CustomEvent('discounts-updated', { 
      detail: { 
        total: discounts.length,
        wishlist: wishlistDiscounts.length 
      } 
    }));
    
  } catch (error) {
    console.error('❌ Ошибка проверки скидок:', error);
  }
}

/**
 * Ручная синхронизация всего
 */
export async function manualSyncAll(): Promise<{
  catalog: boolean;
  prices: boolean;
  releases: boolean;
  discounts: boolean;
}> {
  console.log('🔄 Ручная синхронизация всех данных...');
  
  const results = {
    catalog: false,
    prices: false,
    releases: false,
    discounts: false,
  };

  try {
    await syncGamesCatalog();
    results.catalog = true;
  } catch (e) {
    console.error('Ошибка синхронизации каталога:', e);
  }

  try {
    await syncPriceUpdates();
    results.prices = true;
  } catch (e) {
    console.error('Ошибка синхронизации цен:', e);
  }

  try {
    await syncNewReleases();
    results.releases = true;
  } catch (e) {
    console.error('Ошибка проверки релизов:', e);
  }

  try {
    await syncDiscounts();
    results.discounts = true;
  } catch (e) {
    console.error('Ошибка проверки скидок:', e);
  }

  return results;
}

/**
 * Получить статус последних синхронизаций
 */
export function getSyncStatus(): {
  catalog: { timestamp: number | null; age: string };
  prices: { timestamp: number | null; age: string };
  releases: { timestamp: number | null; age: string };
  discounts: { timestamp: number | null; age: string };
} {
  const now = Date.now();
  
  const getAge = (timestamp: string | null): string => {
    if (!timestamp) return 'Никогда';
    const age = now - parseInt(timestamp);
    const hours = Math.floor(age / (60 * 60 * 1000));
    if (hours < 1) return 'Только что';
    if (hours === 1) return '1 час назад';
    if (hours < 24) return `${hours} часов назад`;
    const days = Math.floor(hours / 24);
    return `${days} дней назад`;
  };

  return {
    catalog: {
      timestamp: parseInt(localStorage.getItem('games_cache_timestamp') || '0') || null,
      age: getAge(localStorage.getItem('games_cache_timestamp')),
    },
    prices: {
      timestamp: parseInt(localStorage.getItem('price_sync_timestamp') || '0') || null,
      age: getAge(localStorage.getItem('price_sync_timestamp')),
    },
    releases: {
      timestamp: parseInt(localStorage.getItem('new_releases_check_timestamp') || '0') || null,
      age: getAge(localStorage.getItem('new_releases_check_timestamp')),
    },
    discounts: {
      timestamp: parseInt(localStorage.getItem('discounts_sync_timestamp') || '0') || null,
      age: getAge(localStorage.getItem('discounts_sync_timestamp')),
    },
  };
}
