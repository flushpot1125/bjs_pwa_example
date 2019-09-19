//Ref:https://qiita.com/umamichi/items/0e2b4b1c578e7335ba20

//Ref:https://qiita.com/masanarih0ri/items/0845f312cff5c8d0ec60
const STATIC_DATA = [
  '/',
  '/index.html',
  '/model/museum.glb',
  '/babylonjs_js/babylon.js',
  '/babylonjs_js/babylonjs.loaders.min.js',
  '/babylonjs_js/babylonjs.material.min.js',
  '/babylonjs_js/babylon.gui.min.js',
  '/babylonjs_js/babylon.inspector.bundle.js',
  '/babylonjs_js/pep.js',
  '/js/TeleportCheck.js'
];
self.addEventListener('install', e => {
    console.log('[ServiceWorker] Install');

    e.waitUntil(
      caches.open('cache_v1').then(cache => {
        return cache.addAll(STATIC_DATA.map(url => new Request(url, {credentials: 'same-origin'})));
      //  return cache.addAll(STATIC_DATA)
      //  .then(()=> self.skipWaiting());
      })
    );

  });
  
  self.addEventListener('activate', e => {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(self.clients.claim());
    
  });
  
  self.addEventListener('fetch', e=> {
    console.log(e.request.url);
    e.respondWith(
      caches.open(cacheName)
      .then(cache => cache.match(e.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(e.request);
    })
     // caches.match(event.request).then(function(response) {
     //   return response || fetch(event.request);
     // })
    );
  });