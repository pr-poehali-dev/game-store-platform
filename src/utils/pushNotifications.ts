const VAPID_PUBLIC_KEY = 'BNxE7ZkP9vK3jQmXxYv8FwR2dHnL4mQ6sT9uW1aB3cD5eF7gH8iJ0kL2mN4oP6qR8sT0uV2wX4yZ6aB8cD0eF2g';

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission === 'denied') {
    return 'denied';
  }

  return await Notification.requestPermission();
}

export async function subscribeToPushNotifications(): Promise<PushSubscription | null> {
  try {
    const permission = await requestNotificationPermission();
    
    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return null;
    }

    const registration = await navigator.serviceWorker.ready;
    
    let subscription = await registration.pushManager.getSubscription();
    
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    }

    await sendSubscriptionToServer(subscription);
    
    return subscription;
  } catch (error) {
    console.error('Failed to subscribe to push notifications:', error);
    return null;
  }
}

export async function unsubscribeFromPushNotifications(): Promise<boolean> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    if (subscription) {
      await subscription.unsubscribe();
      await removeSubscriptionFromServer(subscription);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Failed to unsubscribe from push notifications:', error);
    return false;
  }
}

export async function checkNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    return 'denied';
  }
  return Notification.permission;
}

export async function isSubscribedToPush(): Promise<boolean> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    return subscription !== null;
  } catch {
    return false;
  }
}

async function sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
  const subscriptionData = subscription.toJSON();
  
  try {
    localStorage.setItem('push_subscription', JSON.stringify(subscriptionData));
    
    console.log('Push subscription saved:', subscriptionData);
  } catch (error) {
    console.error('Failed to save subscription:', error);
  }
}

async function removeSubscriptionFromServer(subscription: PushSubscription): Promise<void> {
  try {
    localStorage.removeItem('push_subscription');
    
    console.log('Push subscription removed');
  } catch (error) {
    console.error('Failed to remove subscription:', error);
  }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  
  return outputArray;
}

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  tag?: string;
  data?: any;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
}

export async function showLocalNotification(payload: NotificationPayload): Promise<void> {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return;
  }

  const permission = await requestNotificationPermission();
  
  if (permission !== 'granted') {
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  
  await registration.showNotification(payload.title, {
    body: payload.body,
    icon: payload.icon || '/icon-192.png',
    badge: payload.badge || '/icon-192.png',
    image: payload.image,
    tag: payload.tag || 'default',
    data: payload.data,
    actions: payload.actions,
    vibrate: [200, 100, 200],
    requireInteraction: false,
  });
}

export function createGameDiscountNotification(
  gameTitle: string,
  discount: number,
  price: number,
  gameId: number,
  imageUrl?: string
): NotificationPayload {
  return {
    title: `🔥 Скидка ${discount}% на ${gameTitle}!`,
    body: `Новая цена: ${price}₽. Успей купить!`,
    icon: '/icon-192.png',
    image: imageUrl,
    tag: `game-discount-${gameId}`,
    data: {
      type: 'game-discount',
      gameId,
      url: `/game/${gameId}`,
    },
    actions: [
      {
        action: 'view',
        title: 'Посмотреть',
      },
      {
        action: 'close',
        title: 'Закрыть',
      },
    ],
  };
}

export function createNewGameNotification(
  gameTitle: string,
  gameId: number,
  imageUrl?: string
): NotificationPayload {
  return {
    title: `🎮 Новая игра: ${gameTitle}`,
    body: 'Уже доступна в каталоге!',
    icon: '/icon-192.png',
    image: imageUrl,
    tag: `new-game-${gameId}`,
    data: {
      type: 'new-game',
      gameId,
      url: `/game/${gameId}`,
    },
    actions: [
      {
        action: 'view',
        title: 'Посмотреть',
      },
    ],
  };
}

export function createWishlistPriceDropNotification(
  gameTitle: string,
  oldPrice: number,
  newPrice: number,
  gameId: number
): NotificationPayload {
  const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  
  return {
    title: `💰 Цена снижена: ${gameTitle}`,
    body: `Было ${oldPrice}₽, стало ${newPrice}₽ (-${discount}%)`,
    icon: '/icon-192.png',
    tag: `price-drop-${gameId}`,
    data: {
      type: 'price-drop',
      gameId,
      url: `/game/${gameId}`,
    },
    actions: [
      {
        action: 'buy',
        title: 'Купить',
      },
      {
        action: 'view',
        title: 'Подробнее',
      },
    ],
  };
}
