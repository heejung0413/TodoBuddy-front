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
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://52.79.255.139:8080/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
