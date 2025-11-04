const CACHE_NAME = 'tinfoil-pwa-cache-v1';
const urlsToCache = [
    '/tinfoil/',
    '/tinfoil/index.html',
    '/tinfoil/manifest.json',
    '/tinfoil/icons/icon-192x192.png',
    '/tinfoil/icons/icon-512x512.png',
    '/tinfoil/icons/loading.gif' // <-- GIF de carregamento adicionado aqui
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Arquivos críticos cacheados.');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
