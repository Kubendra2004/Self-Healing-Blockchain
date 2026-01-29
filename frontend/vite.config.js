import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages - will be replaced during deployment
  base: '/Self-Healing-Blockchain/',
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
