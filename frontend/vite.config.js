import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    base: '/',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
