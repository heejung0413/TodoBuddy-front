import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [react(), mkcert()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  define: {
    _global: {},
  },
  server: {
    https: false,
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://api.todobuddy.site',
        changeOrigin: true,
      },
    },
  },
});
