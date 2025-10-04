import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // 👈 local-friendly relative base path
  build: {
    outDir: 'dist',
  },
})
