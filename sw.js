const assetsUrl = [
  'index.html',
  'app.js',
  'default.css',
  'offline.html'
]

self.addEventListener('install', async event => {
  const cache = await caches.open(staticCacheName)
  await cache.addAll(assetsUrl)
})

self.addEventListener('activate', async event => {
  const cahceNames = await caches.keys()
  await Promise.all(
    cahceNames
      .filter(cacheName => (cacheName !== staticCacheName) && (cacheName !== dynamicCacheName))
      .map(cacheName => caches.delete(cacheName))
  )
})

self.addEventListener('fetch', event => {
  const { request } = event

  const url = new URL(request.url)
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(event.request))
  } else {
    event.respondWith(networkFirst(event.request))
  }  
})

async function cacheFirst(request) {
  const cached = await caches.match(request)
  return cached ?? await fetch(request)
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName)
  try {
    const response = await fetch(request)
    cache.put(request, response.clone())
    return response
  } catch (e) {
    const cachedResponse = await caches.match(request)
    return cachedResponse ?? await caches.match('/offline.html')
  }
}