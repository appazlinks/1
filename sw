const CACHE_NAME = 'azlinks-cache-v1';
const assets = ['./', './index.html', './manifest.json', './azlinks-192x192.png', './azlinks-512x512.png'];

// Instala o Service Worker e guarda os arquivos essenciais
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting(); // Força a atualização imediata no computador
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

// OBRIGATÓRIO PARA COMPUTADOR: Escuta as requisições da página
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
});

