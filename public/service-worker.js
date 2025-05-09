const cacheName = 'my-app-cache-v1';
const assetsToCache = [
  '/',
  '/index.html',
  '/static/js/main.chunk.js',
  '/static/js/1.chunk.js',
  '/static/js/bundle.js',
  '/static/css/main.chunk.css',
  '/static/media/logo.svg',
  // Add any other resources you want to cache
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Caching assets...');
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
