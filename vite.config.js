import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Automatically set base path for GitHub Pages, empty for local dev
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/roller-coaster-sim/' : '/',
  build: {
    outDir: 'dist',
  },
}))
