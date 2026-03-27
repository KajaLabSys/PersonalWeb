import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,   // naslouchá na 0.0.0.0 — dostupné i ze sítě
    port: 5173,
  }
})
