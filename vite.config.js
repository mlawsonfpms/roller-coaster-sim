import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Ensure the base path matches your GitHub Pages repo name
export default defineConfig({
  plugins: [react()],
  base: './', // make sure this matches EXACTLY
  build: {
    outDir: 'dist',
  },
})
