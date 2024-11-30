import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Sluša na svim mrežnim sučeljima
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        //        rewrite: (path) => path.replace(/^\/api/, '') // Ovo uklanja "/api" prefix
      }
    }
  }
});

