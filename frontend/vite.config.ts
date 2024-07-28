import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/_variables.scss";
        @import "./src/_mixins.scss";
        @import "./src/globals.scss";
      `,
      },
    },
  },
});
