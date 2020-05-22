importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js'
);

workbox.setConfig({ debug: false });

self.skipWaiting();

workbox.routing.registerRoute(
  new RegExp(/\.(png|jpg)/),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'images',
  }),
);

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("install", evt => {
  console.log('installed')
})

self.addEventListener("fetch", evt => {
  console.log("fetched");
})