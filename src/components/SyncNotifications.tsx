import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

/**
 * Компонент для обработки сообщений от Service Worker
 * о фоновых синхронизациях
 */
export default function SyncNotifications() {
  const { toast } = useToast();

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      const { type, data } = event.data || {};

      if (!type) return;

      switch (type) {
        case 'CACHE_GAMES':
          localStorage.setItem('games_cache', JSON.stringify(data.games));
          localStorage.setItem('games_cache_timestamp', String(data.timestamp));
          
          window.dispatchEvent(new CustomEvent('catalog-updated', { 
            detail: { count: data.games.length } 
          }));
          break;

        case 'PRICE_UPDATES':
          const cachedGames = JSON.parse(localStorage.getItem('games_cache') || '[]');
          data.updates.forEach((update: any) => {
            const game = cachedGames.find((g: any) => g.id === update.game_id);
            if (game) {
              game.price = update.new_price;
            }
          });
          
          localStorage.setItem('games_cache', JSON.stringify(cachedGames));
          localStorage.setItem('price_sync_timestamp', String(data.timestamp));
          
          window.dispatchEvent(new CustomEvent('prices-updated', { 
            detail: { count: data.updates.length } 
          }));
          break;

        case 'NEW_RELEASES':
          localStorage.setItem('new_releases', JSON.stringify(data.games));
          localStorage.setItem('new_releases_check_timestamp', String(data.timestamp));
          
          window.dispatchEvent(new CustomEvent('new-releases', { 
            detail: { games: data.games } 
          }));
          break;

        case 'DISCOUNTS_UPDATE':
          localStorage.setItem('active_discounts', JSON.stringify(data.discounts));
          localStorage.setItem('discounts_sync_timestamp', String(data.timestamp));
          
          const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
          const wishlistDiscounts = data.discounts.filter((d: any) => 
            wishlist.includes(d.game_id)
          );
          
          window.dispatchEvent(new CustomEvent('discounts-updated', { 
            detail: { 
              total: data.discounts.length,
              wishlist: wishlistDiscounts.length 
            } 
          }));
          break;

        case 'UPDATE_PENDING_PURCHASES':
          localStorage.setItem('pending_purchases', JSON.stringify(data.purchases));
          break;

        case 'GET_PENDING_PURCHASES':
          // Service Worker запрашивает отложенные покупки
          const pending = localStorage.getItem('pending_purchases');
          if (pending && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
              type: 'PENDING_PURCHASES_RESPONSE',
              purchases: JSON.parse(pending)
            });
          }
          break;

        default:
          console.log('Неизвестный тип сообщения от SW:', type);
      }
    };

    navigator.serviceWorker.addEventListener('message', handleMessage);

    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, [toast]);

  return null;
}
