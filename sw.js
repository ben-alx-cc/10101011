const CACHE_NAME = 'eins-meditation-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Icons (werden später hinzugefügt wenn verfügbar)
  '/icon-16x16.png',
  '/icon-32x32.png',
  '/apple-touch-icon-57x57.png',
  '/apple-touch-icon-60x60.png',
  '/apple-touch-icon-72x72.png',
  '/apple-touch-icon-76x76.png',
  '/apple-touch-icon-114x114.png',
  '/apple-touch-icon-120x120.png',
  '/apple-touch-icon-144x144.png',
  '/apple-touch-icon-152x152.png',
  '/apple-touch-icon.png',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// Install Event - Cache Dateien
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching app shell');
        // Nur verfügbare Dateien cachen
        return cache.addAll([
          '/',
          '/index.html',
          '/manifest.json'
        ]);
      })
      .then(() => {
        // Optional: Icons einzeln hinzufügen falls verfügbar
        return caches.open(CACHE_NAME).then(cache => {
          urlsToCache.forEach(url => {
            if (url.includes('.png')) {
              fetch(url).then(response => {
                if (response.ok) {
                  cache.put(url, response);
                }
              }).catch(() => {
                // Icon nicht verfügbar, ignorieren
              });
            }
          });
        });
      })
  );
});

// Activate Event - Alte Caches löschen
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch Event - Cache-First Strategy
self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetch:', event.request.url);
  
  // Nur GET-Requests cachen
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          console.log('[Service Worker] Found in cache:', event.request.url);
          return response;
        }

        // Cache miss - fetch from network
        console.log('[Service Worker] Fetching from network:', event.request.url);
        return fetch(event.request).then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(() => {
          // Network fehler - Fallback für HTML-Requests
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

// Background Sync (für zukünftige Features)
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background sync:', event.tag);
  // Hier können später Features wie das Speichern von Meditationsfortschritt implementiert werden
});

// Push Notifications (für zukünftige Features)
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push received');
  // Hier können später Erinnerungen für Meditationen implementiert werden
  
  const options = {
    body: 'Zeit für eine Meditation mit EINS',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Meditation starten',
        icon: '/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Später',
        icon: '/icon-192x192.png'
      }
    ]
  };

  if (event.data) {
    const notificationData = event.data.json();
    options.body = notificationData.body || options.body;
    options.title = notificationData.title || 'EINS Meditation';
  }

  event.waitUntil(
    self.registration.showNotification('EINS Meditation', options)
  );
});

// Notification Click Handler
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click received.');

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
