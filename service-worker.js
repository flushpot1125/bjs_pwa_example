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

const cacheName ='cache_v1';

self.addEventListener('install', e => {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
      caches.open(cacheName).then(cache => {
        return cache.addAll(STATIC_DATA)
        .then(()=> self.skipWaiting());
      })
    );
});
  
self.addEventListener('activate', e => {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(self.clients.claim());
});

/*
self.addEventListener('fetch', e=> {
  
  if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin'){
    console.log("not same origin");
    return;
  }
  
  console.log('[ServiceWorker] Fetched resources');
  e.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(e.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(e.request);
    })
  );
});
*/
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
          console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
/*
self.addEventListener('fetch', e=> {
  
  if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin'){
    console.log("not same origin");
    return;
  }
  
  console.log('[ServiceWorker] Fetched resources');
  e.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(e.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(e.request);
    })
  );
});
*/
//

/*
// If any fetch fails, it will show the offline page.
self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET"){
    console.log("event.request.method is not GET");
    return;
  } 

  event.respondWith(
    fetch(event.request).catch(function (error) {
      // The following validates that the request was for a navigation to a new document
     
      if (
        event.request.destination !== "document" ||
        event.request.mode !== "navigate"
      ) {
        console.log ("event.request.destination:"+event.request.destination);
        console.log("request mode is not navigate or destination is not document");
        return;
      }
      

      console.log("[PWA Builder] Network request Failed. Serving offline page " + error);
      return caches.open(cacheName).then(function (cache) {
        return cache.match(STATIC_DATA);
      });
    })
  );
});
*/

