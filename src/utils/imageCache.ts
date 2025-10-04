const CACHE_PREFIX = 'img_cache_';
const CACHE_VERSION = 'v1';
const MAX_CACHE_SIZE = 5 * 1024 * 1024;

interface CachedImage {
  data: string;
  timestamp: number;
  size: number;
}

export const imageCache = {
  async set(url: string, dataUrl: string): Promise<void> {
    try {
      const size = new Blob([dataUrl]).size;
      const cacheKey = `${CACHE_PREFIX}${CACHE_VERSION}_${url}`;
      
      const cached: CachedImage = {
        data: dataUrl,
        timestamp: Date.now(),
        size,
      };

      const currentSize = this.getTotalSize();
      if (currentSize + size > MAX_CACHE_SIZE) {
        this.pruneOldest();
      }

      localStorage.setItem(cacheKey, JSON.stringify(cached));
    } catch (error) {
      console.warn('Failed to cache image:', error);
    }
  },

  get(url: string): string | null {
    try {
      const cacheKey = `${CACHE_PREFIX}${CACHE_VERSION}_${url}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (!cached) return null;

      const parsed: CachedImage = JSON.parse(cached);
      const age = Date.now() - parsed.timestamp;
      
      if (age > 7 * 24 * 60 * 60 * 1000) {
        localStorage.removeItem(cacheKey);
        return null;
      }

      return parsed.data;
    } catch {
      return null;
    }
  },

  getTotalSize(): number {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CACHE_PREFIX)) {
        const item = localStorage.getItem(key);
        if (item) {
          try {
            const parsed: CachedImage = JSON.parse(item);
            total += parsed.size;
          } catch {
            continue;
          }
        }
      }
    }
    return total;
  },

  pruneOldest(): void {
    const items: { key: string; timestamp: number }[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CACHE_PREFIX)) {
        const item = localStorage.getItem(key);
        if (item) {
          try {
            const parsed: CachedImage = JSON.parse(item);
            items.push({ key, timestamp: parsed.timestamp });
          } catch {
            continue;
          }
        }
      }
    }

    items.sort((a, b) => a.timestamp - b.timestamp);
    
    const toRemove = Math.ceil(items.length * 0.3);
    for (let i = 0; i < toRemove; i++) {
      localStorage.removeItem(items[i].key);
    }
  },

  clear(): void {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CACHE_PREFIX)) {
        keys.push(key);
      }
    }
    keys.forEach(key => localStorage.removeItem(key));
  },

  async cacheImage(url: string): Promise<void> {
    if (this.get(url)) return;

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      
      if (blob.size > 500 * 1024) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        this.set(url, base64);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.warn('Failed to fetch and cache image:', error);
    }
  }
};
