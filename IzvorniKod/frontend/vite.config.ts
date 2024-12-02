// import react from '@vitejs/plugin-react';
// import { defineConfig } from 'vite';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: 'localhost',  // Sluša samo na lokalnoj mreži
//     port: 5173,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8080',
//         changeOrigin: true,
//         // rewrite: (path) => path.replace(/^\/api/, '') // Ovo uklanja "/api" prefix
//       }
//     }
//   }
// });


import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    // Sluša na svim mrežnim interfejsima, možeš koristiti i "0.0.0.0"
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://backendservice-xspx.onrender.com', // Produkcijski backend
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // Ako želite ukloniti "/api" prefix
      }
    }
  }
});

