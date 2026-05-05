const CACHE_NAME = 'iforms-pwa-v1';
const OFFLINE_URL = './offline.html';

const STATIC_ASSETS = [
  './',
  './index.html',
  './dashboard.html',
  './aula.html',
  './calculadora.html',
  './comunidade.html',
  './offline.html',
  './manifest.json',
  './assets/js/pwa.js',
  './assets/icons/icon-192.svg',
  './assets/icons/icon-512.svg',
  './assets/icons/icon-maskable.svg',
];

// Install: pré-caches os assets estáticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: Cache-first para assets locais, Network-first para externos
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignora requisições não-GET
  if (request.method !== 'GET') return;

  // CDN externos (Tailwind, Google Fonts): stale-while-revalidate
  if (url.origin !== self.location.origin) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);
        const networkFetch = fetch(request)
          .then((response) => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          })
          .catch(() => cached);
        return cached || networkFetch;
      })
    );
    return;
  }

  // Assets locais: Cache-first com fallback para offline
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => {
          // Retorna página offline para navegação HTML
          if (request.headers.get('accept')?.includes('text/html')) {
            return caches.match(OFFLINE_URL);
          }
        });
    })
  );
});

// Escuta mensagens do app (ex: skip waiting)
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
