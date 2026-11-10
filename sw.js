self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
// Red primero; si no hay internet, usa la última copia guardada de la app
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open('caja-v1').then(k => k.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request)));
});
