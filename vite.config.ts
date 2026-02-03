import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Removed manual process.env definition as the API key is injected automatically by the environment
  server: {
    port: 5173,
    strictPort: true,
  }
});