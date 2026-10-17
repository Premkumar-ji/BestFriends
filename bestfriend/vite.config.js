import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps asset paths relative, so it works on GitHub Pages and Vercel.
export default defineConfig({
  base: './',
  plugins: [react()],
});
