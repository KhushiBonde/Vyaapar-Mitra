import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    // Dev proxy: uncomment if you want /api calls forwarded to the local backend.
    // In production (Vercel), the frontend uses VITE_API_URL env var instead.
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8000',
    //     changeOrigin: true,
    //   }
    // }
  },
  // Resolve alias so you can use '@/lib/api' imports
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
