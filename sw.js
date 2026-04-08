const cacheName = 'disaster-ready-v1';
const assets = [
  './',
  './index.html',
  './style.css',
  './script.js'
];

// This part saves the files to the phone/PC memory
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// This part tells the browser: "If there's no Wi-Fi, use the saved files"
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(response => {
      return response || fetch(e.request);
    })
  );
});
