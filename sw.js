const CACHE="italyrent-v302";
const STATIC=["/","/style.css","/app.js?v=3.0","/assets/icon-192.png","/assets/icon-512.png","/assets/logo-symbol.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.pathname.startsWith("/api/")||u.pathname.startsWith("/admin"))return;if(e.request.mode==="navigate"){e.respondWith(fetch(e.request).catch(()=>caches.match("/")));return;}e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const cp=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return resp;})));});
