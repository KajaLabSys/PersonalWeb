import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,   // naslouchá na 0.0.0.0 — dostupné i ze sítě
    port: 5173,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        tisk3d: resolve(__dirname, '3dtisk/index.html'),
      },
    },
  },
})
