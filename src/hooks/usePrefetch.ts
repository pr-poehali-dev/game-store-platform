import { useRef, useCallback } from 'react';
import { Game } from '@/types';

interface PrefetchCache {
  [key: number]: {
    data: Game;
    timestamp: number;
  };
}

const CACHE_DURATION = 5 * 60 * 1000;

export function usePrefetch() {
  const cacheRef = useRef<PrefetchCache>({});
  const prefetchTimerRef = useRef<NodeJS.Timeout | null>(null);

  const prefetchGameDetails = useCallback((game: Game) => {
    if (cacheRef.current[game.id]) {
      const cached = cacheRef.current[game.id];
      if (Date.now() - cached.timestamp < CACHE_DURATION) {
        return;
      }
    }

    if (prefetchTimerRef.current) {
      clearTimeout(prefetchTimerRef.current);
    }

    prefetchTimerRef.current = setTimeout(() => {
      cacheRef.current[game.id] = {
        data: game,
        timestamp: Date.now(),
      };

      if (game.image_url) {
        const img = new Image();
        img.src = game.image_url;
      }

      const relatedImages = [
        game.image_url,
      ].filter(Boolean);

      relatedImages.forEach((url) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'image';
        link.href = url as string;
        document.head.appendChild(link);
      });
    }, 300);
  }, []);

  const getCachedGame = useCallback((gameId: number): Game | null => {
    const cached = cacheRef.current[gameId];
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }, []);

  const clearCache = useCallback(() => {
    cacheRef.current = {};
  }, []);

  return {
    prefetchGameDetails,
    getCachedGame,
    clearCache,
  };
}
