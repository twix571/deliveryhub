const CACHE_NAME = 'delivery-goals-v3';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.svg',
  './icon-512.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Only cache GET requests
        if (event.request.method !== 'GET') {
          return response;
        }
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => {
        // Only try cache for GET requests
        if (event.request.method !== 'GET') {
          return new Response('Method not supported', { status: 405 });
        }
        return caches.match(event.request).then(response => {
          if (response) {
            return response;
          }
          return new Response('Not found', { status: 404 });
        });
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
