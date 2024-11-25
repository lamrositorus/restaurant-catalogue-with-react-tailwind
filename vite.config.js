import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Restaurant Catalogue',
        short_name: 'Restaurant',
        description: 'Free restaurant catalogue for you',
        icons: [
          {
            src: '/assets/restaurant.jpg',
            sizes: '192x192',
            type: 'image/jpg',
          },
        ],
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/restaurant-api\.dicoding\.dev\/.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'opentable-api',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24, // 1 day
                },
            },            
          },
          {
            urlPattern: /\.(jpg|jpeg|png|gif|svg)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
            },
          }
        ]
      },
    })

  ],
})
