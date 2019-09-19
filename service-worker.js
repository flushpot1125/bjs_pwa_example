//Ref:https://qiita.com/umamichi/items/0e2b4b1c578e7335ba20

//Ref:https://qiita.com/masanarih0ri/items/0845f312cff5c8d0ec60
const STATIC_DATA = [
  'index.html',
  'model/museum.glb',
  'babylonjs_js/babylon.js',
  'babylonjs_js/babylonjs.loaders.min.js',
  'babylonjs_js/babylonjs.material.min.js',
  'babylonjs_js/babylon.gui.min.js',
  'babylonjs_js/babylon.inspector.bundle.js',
  'babylonjs_js/pep.js',
  'js/TeleportCheck.js'
];
self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');

    e.waitUntil(
      caches.open('cache_v1').then(function(cache) {
        return cache.addAll(STATIC_DATA);
      })
    );

  });
  
  self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
  });
  
  self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });