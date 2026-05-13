/* AmazeApp · service worker
   simple cache-first for app shell + network fallback. */
const CACHE = 'amazeapp-v1';
const SHELL = [
  '/',
  '/App%20Habitos.html',
  '/app/styles.css',
  '/app/data.js',
  '/app/icons.jsx',
  '/app/ios-frame.jsx',
  '/app/ui.jsx',
  '/app/store.jsx',
  '/app/ocr.jsx',
  '/app/pdf-report.jsx',
  '/app/today.jsx',
  '/app/workout.jsx',
  '/app/progress.jsx',
  '/app/health.jsx',
  '/app/profile.jsx',
  '/app/icon-180.png',
  '/app/icon-192.png',
  '/app/icon-512.png',
  '/manifest.webmanifest'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL).catch(() => null))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        // cache same-origin successful GETs opportunistically
        if (res.ok && new URL(req.url).origin === self.location.origin) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(req, clone));
        }
        return res;
      }).catch(() => caches.match('/App%20Habitos.html'));
    })
  );
});
