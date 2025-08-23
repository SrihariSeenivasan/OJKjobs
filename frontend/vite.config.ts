import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add proxy for /candidate to /candidate_api
  server: {
    proxy: {
      '/candidate': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/candidate/, '/candidate_api'),
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
