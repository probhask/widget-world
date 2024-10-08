import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@container": path.resolve(__dirname, "./src/container"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@hook": path.resolve(__dirname, "./src/hook"),
      "@router": path.resolve(__dirname, "./src/router"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
