import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/password-generator/',  // Adjust base if needed
  plugins: [vue()],
  build: {
    outDir: 'dist',
  },
});