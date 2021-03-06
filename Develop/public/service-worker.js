const FILES_TO_CACHE = [
    "/",
    "/index.html",
    '/styles.css',
    '/manifest.webmanifest',
    '/index.js',
    '/db.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

// installation
self.addEventListener("install", function(evt) {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("pre!");
            return cache.addAll(FILES_TO_CACHE);
        })
    );

    evt.waitUntil(
        caches.open(DATA_CACHE_NAME).then(cache => {
            return cache.add('/api/transaction');
        })
    );

    self.skipWaiting();
});

// activation

self.addEventListener("activate", function(evt) {
    evt.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log("Removing old cache data", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );

    self.clients.claim();
});