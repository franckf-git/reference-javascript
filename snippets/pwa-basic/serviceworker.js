// wait to install for the cache
self.addEventListener("install", (event) => {
    self.skipWaiting()
    event.waitUntil((async()=>{
        const cache = await caches.open("startpage")
        cache.add(new Request("offline.html"))
        cache.add(new Request("FiraCode-Regular.ttf"))
        cache.add(new Request("style.css"))
    })())
})

// if offline read the cache
self.addEventListener("fetch", (event)=>{
if (event.request.mode === "navigate") {
    event.respondWith(
        (async () => {
            try {
                const preloadResponse = await event.preloadResponse
                if (preloadResponse) {
                    return preloadResponse
                }
            return await fetch(event.request)
            } catch (error) {
                const cache = await caches.open("startpage")
                return await cache.match("offline.html")
            }
        })()
    )
} else {
    // take files in cache for offline requests
    event.respondWith(caches.match(event.request))
}
})