importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js',
);

workbox.setConfig({ debug: false });

self.skipWaiting();

workbox.routing.registerRoute(
  new RegExp(/\.(png|jpg)/),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'images',
  }),
);

workbox.precaching.precacheAndRoute([
  { "revision": "6e1267d9d946b0236cdf6ffd02890894", "url": "favicon.ico" },
  { "revision": "5b0af4c0fb2bc903085fb87458b8fc48", "url": "index.html" },
  { "revision": "33dbdd0177549353eeeb785d02c294af", "url": "logo192.png" },
  { "revision": "917515db74ea8d1aee6a246cfbcc0b45", "url": "logo512.png" },
  { "revision": "89be60895176466398d53bd4a693d9f6", "url": "manifest.json" },
  { "revision": "fa1ded1ed7c11438a9b0385b1e112850", "url": "robots.txt" },
]);
// workbox.precaching.precacheAndRoute([
//   {"revision": null, "url": "index.html"}
// ])
self.addEventListener("install", evt => {
  console.log('installed')
})

self.addEventListener("fetch", evt => {
  console.log("fetched");
})