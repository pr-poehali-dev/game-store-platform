const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `game-store-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
];

const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i;
const CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;
const MAX_IMAGE_CACHE_SIZE = 50;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && 
              cacheName !== RUNTIME_CACHE && 
              cacheName !== IMAGE_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') {
    return;
  }

  if (url.origin !== location.origin) {
    return;
  }

  if (IMAGE_EXTENSIONS.test(url.pathname)) {
    event.respondWith(handleImageRequest(request));
    return;
  }

  if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) {
    event.respondWith(handleAssetRequest(request));
    return;
  }

  event.respondWith(handleNavigationRequest(request));
});

async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cached = await cache.match(request);

  if (cached) {
    const cachedTime = cached.headers.get('sw-cached-time');
    if (cachedTime) {
      const age = Date.now() - parseInt(cachedTime);
      if (age < CACHE_MAX_AGE) {
        return cached;
      }
    }
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const clonedResponse = response.clone();
      const headers = new Headers(clonedResponse.headers);
      headers.set('sw-cached-time', Date.now().toString());
      
      const blob = await clonedResponse.blob();
      const cachedResponse = new Response(blob, {
        status: clonedResponse.status,
        statusText: clonedResponse.statusText,
        headers: headers
      });

      await limitCacheSize(IMAGE_CACHE, MAX_IMAGE_CACHE_SIZE);
      cache.put(request, cachedResponse);
    }
    return response;
  } catch (error) {
    if (cached) {
      return cached;
    }
    return new Response('Image not available offline', { 
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

async function handleAssetRequest(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return new Response('Asset not available offline', { 
      status: 503 
    });
  }
}

async function handleNavigationRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    
    const indexCached = await cache.match('/index.html');
    if (indexCached) {
      return indexCached;
    }

    return new Response('Offline - content not available', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
  }
}

async function limitCacheSize(cacheName, maxSize) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxSize) {
    const toDelete = keys.slice(0, keys.length - maxSize);
    await Promise.all(toDelete.map(key => cache.delete(key)));
  }
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});
