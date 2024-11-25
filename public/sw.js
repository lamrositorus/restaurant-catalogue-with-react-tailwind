import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';

// Precache the API responses
precacheAndRoute(self.__WB_MANIFEST);

// Cache API responses for offline access
registerRoute(
  ({ event }) => event.request.url.startsWith('https://restaurant-api.dicoding.dev/'),
  ({ event }) => {
    return caches.open('api-cache').then((cache) => {
      return cache.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      });
    });
  }
);