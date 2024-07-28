import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
          @import "./src/styles/base/_reset.scss";
          @import "./src/styles/abstracts/_variables.scss";
          @import "./src/styles/abstracts/_mixins.scss";
          @import "./src/styles/base/_typography.scss";
        `,
      },
    },
  },
});
