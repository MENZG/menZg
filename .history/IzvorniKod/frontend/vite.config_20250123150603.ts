/*import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',  // Sluša samo na lokalnoj mreži
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://backendservice-xspx.onrender.com',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // Ovo uklanja "/api" prefix
      }
    }
  }
});*/

/*
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
         //target: 'https://backendservice-xspx.onrender.com', // Produkcijski backend
         target: 'https://backendservice-xspx.onrender.com',
         changeOrigin: true,
         // rewrite: (path) => path.replace(/^\/api/, '') // Ako želite ukloniti "/api" prefix
       }
     }
   }
 });*/



 //primjer s tehnickih predavanja
/*import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import rollupNodePolyFill from 'rollup-plugin-polyfill-node';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      util: 'rollup-plugin-polyfill-node/polyfills/util',
    },
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
  server: {
    // Sluša na svim mrežnim interfejsima, možeš koristiti i "0.0.0.0"
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        //target: 'https://backendservice-xspx.onrender.com', // Produkcijski backend
        target: 'https://backendservice-xspx.onrender.com',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // Ako želite ukloniti "/api" prefix
      }
    }
  }
});
*/

