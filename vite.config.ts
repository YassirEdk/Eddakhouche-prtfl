import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor":  ["react", "react-dom", "react-router-dom"],
          "radix-vendor":  [
            "@radix-ui/react-tooltip",
            "@radix-ui/react-toast",
            "@radix-ui/react-slot",
          ],
          "query-vendor":  ["@tanstack/react-query"],
          "email-vendor":  ["@emailjs/browser"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
