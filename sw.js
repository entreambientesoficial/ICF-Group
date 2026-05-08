const CACHE_NAME = 'iforms-pwa-v3';
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

// Install: pré-caches os assets estáticos (falha silenciosa por arquivo)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(STATIC_ASSETS.map((url) => cache.add(url)))
    )
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

  if (request.method !== 'GET') return;

  // CDN externos: stale-while-revalidate
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
        return cached || networkFetch || new Response('', { status: 503 });
      })
    );
    return;
  }

  // Assets locais: Cache-first com fallback garantido (nunca retorna undefined)
  event.respondWith(
    caches.match(request).then(async (cached) => {
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, response.clone());
        }
        return response;
      } catch {
        // Conexão falhou — tenta servir offline.html para navegação HTML
        if (request.headers.get('accept')?.includes('text/html')) {
          const offline = await caches.match(OFFLINE_URL);
          return offline || new Response(
            '<html><body style="font-family:sans-serif;text-align:center;padding:2rem"><h2>Sem conexão</h2><p>Verifique sua internet e tente novamente.</p></body></html>',
            { status: 503, headers: { 'Content-Type': 'text/html' } }
          );
        }
        return new Response('', { status: 503 });
      }
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
