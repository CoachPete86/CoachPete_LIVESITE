// Basic service worker for CRA: offline shell + static cache
const CACHE_NAME = 'jolene-cache-v1';
const OFFLINE_URL = '/index.html';

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll([OFFLINE_URL])));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // SPA shell fallback for navigations
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try { return await fetch(req); }
      catch (e) {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(OFFLINE_URL);
        return cached || new Response('Offline', { status: 200, headers: { 'Content-Type': 'text/plain' } });
      }
    })());
    return;
  }

  // Cache-first for static assets
  if (['style','script','image','font'].includes(req.destination)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(req);
      if (cached) return cached;
      const res = await fetch(req);
      cache.put(req, res.clone());
      return res;
    })());
  }
});
