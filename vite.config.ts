import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  // @ts-ignore
  test: {
    globals: true,
    environment: 'node'
  }
});
