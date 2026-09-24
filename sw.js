const CACHE_NAME = 'vaidika-mithra-v4-install';
const PRECACHE = ["./", "./index.html", "./manifest.json", "./css/style.css", "./css/install.css", "./js/core/config.js", "./js/core/storage.js", "./js/core/locales.js", "./js/data/devata.js", "./js/data/suktas.js", "./js/data/karma.js", "./js/data/texts.js", "./js/data/vrata.js", "./js/engines/panchanga.js", "./js/components/audio-player.js", "./js/app/app.js", "./js/pages/pages.js", "./js/app/v2-customizations.js", "./js/app/install.js", "./js/app/sw-register.js", "./js/app/main.js", "./locales/en.json", "./locales/ml.json", "./assets/icons/icon-192.png", "./assets/icons/icon-512.png", "./assets/images/devata/mahavishnu.png", "./assets/images/devata/mahalakshmi.png", "./assets/images/devata/shiva.png", "./assets/images/devata/ganapati.png"];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const request = event.request;
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response && response.ok && new URL(request.url).origin === self.location.origin) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
