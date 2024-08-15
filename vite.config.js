import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/citizenofgreatsiberia/sm2/',
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@assets', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },
      { find: '@components', replacement: fileURLToPath(new URL('./src/assets/components', import.meta.url)) },
      { find: '@services', replacement: fileURLToPath(new URL('./src/services', import.meta.url)) },
    ]
  }
})
