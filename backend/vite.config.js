import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  root: '.', // Ensure Vite uses the project root
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html' // Ensure Vite knows where the entry point is
    }
  }
})
