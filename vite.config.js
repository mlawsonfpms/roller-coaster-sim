import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace YOUR_REPO_NAME below with your actual repo name (for example: 'roller-coaster-sim')
export default defineConfig({
  plugins: [react()],
  base: '/roller-coaster-sim/', 
});
