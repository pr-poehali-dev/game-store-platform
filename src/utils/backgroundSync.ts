/**
 * Background Sync API для отложенных покупок
 * Позволяет сохранять покупки офлайн и синхронизировать при восстановлении сети
 */

export interface PendingPurchase {
  id: string;
  gameId: number;
  gameName: string;
  price: number;
  timestamp: number;
  userId?: number;
  paymentMethod?: string;
}

const PENDING_PURCHASES_KEY = 'pending_purchases';
const SYNC_TAG = 'sync-purchases';

/**
 * Регистрация фоновой синхронизации
 */
export async function registerBackgroundSync(): Promise<boolean> {
  if (!('serviceWorker' in navigator) || !('SyncManager' in window)) {
    console.warn('Background Sync не поддерживается');
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.sync.register(SYNC_TAG);
    console.log('Background Sync зарегистрирована');
    return true;
  } catch (error) {
    console.error('Ошибка регистрации Background Sync:', error);
    return false;
  }
}

/**
 * Сохранить покупку для отложенной отправки
 */
export async function savePendingPurchase(purchase: Omit<PendingPurchase, 'id' | 'timestamp'>): Promise<void> {
  const pendingPurchase: PendingPurchase = {
    ...purchase,
    id: `purchase_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
  };

  const existing = await getPendingPurchases();
  existing.push(pendingPurchase);
  
  localStorage.setItem(PENDING_PURCHASES_KEY, JSON.stringify(existing));
  
  await registerBackgroundSync();
  
  console.log('Покупка сохранена для синхронизации:', pendingPurchase);
}

/**
 * Получить все отложенные покупки
 */
export async function getPendingPurchases(): Promise<PendingPurchase[]> {
  try {
    const data = localStorage.getItem(PENDING_PURCHASES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Ошибка чтения отложенных покупок:', error);
    return [];
  }
}

/**
 * Удалить успешно отправленную покупку
 */
export async function removePendingPurchase(id: string): Promise<void> {
  const existing = await getPendingPurchases();
  const filtered = existing.filter(p => p.id !== id);
  localStorage.setItem(PENDING_PURCHASES_KEY, JSON.stringify(filtered));
}

/**
 * Очистить все отложенные покупки
 */
export async function clearPendingPurchases(): Promise<void> {
  localStorage.removeItem(PENDING_PURCHASES_KEY);
}

/**
 * Отправить покупку на сервер
 */
export async function sendPurchaseToServer(purchase: PendingPurchase): Promise<boolean> {
  try {
    const response = await fetch('/api/purchases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        game_id: purchase.gameId,
        user_id: purchase.userId || 1,
        payment_method: purchase.paymentMethod || 'card',
        amount: purchase.price,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Ошибка отправки покупки:', error);
    return false;
  }
}

/**
 * Синхронизировать все отложенные покупки
 */
export async function syncPendingPurchases(): Promise<{ success: number; failed: number }> {
  const pending = await getPendingPurchases();
  
  if (pending.length === 0) {
    return { success: 0, failed: 0 };
  }

  console.log(`Синхронизация ${pending.length} отложенных покупок...`);

  let success = 0;
  let failed = 0;

  for (const purchase of pending) {
    const sent = await sendPurchaseToServer(purchase);
    
    if (sent) {
      await removePendingPurchase(purchase.id);
      success++;
      console.log(`✅ Покупка ${purchase.gameName} отправлена`);
    } else {
      failed++;
      console.log(`❌ Покупка ${purchase.gameName} не отправлена`);
    }
  }

  return { success, failed };
}

/**
 * Проверить, есть ли отложенные покупки
 */
export async function hasPendingPurchases(): Promise<boolean> {
  const pending = await getPendingPurchases();
  return pending.length > 0;
}

/**
 * Получить количество отложенных покупок
 */
export async function getPendingPurchasesCount(): Promise<number> {
  const pending = await getPendingPurchases();
  return pending.length;
}

/**
 * Инициализация Background Sync при загрузке
 */
export async function initBackgroundSync(): Promise<void> {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  window.addEventListener('online', async () => {
    console.log('🌐 Сеть восстановлена, запуск синхронизации...');
    
    const count = await getPendingPurchasesCount();
    if (count > 0) {
      const result = await syncPendingPurchases();
      
      if (result.success > 0) {
        showSyncNotification(result.success, result.failed);
      }
    }
  });

  const initialCount = await getPendingPurchasesCount();
  if (initialCount > 0 && navigator.onLine) {
    console.log(`📦 Найдено ${initialCount} отложенных покупок, синхронизация...`);
    await syncPendingPurchases();
  }
}

/**
 * Показать уведомление о результатах синхронизации
 */
function showSyncNotification(success: number, failed: number): void {
  if ('Notification' in window && Notification.permission === 'granted') {
    const message = failed > 0
      ? `Отправлено ${success} покупок, ${failed} не удалось отправить`
      : `Все покупки отправлены (${success})`;

    new Notification('Синхронизация завершена', {
      body: message,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'sync-complete',
    });
  }
}
