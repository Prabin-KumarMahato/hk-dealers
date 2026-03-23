import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Generate smaller chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React core (cached across deploys)
          "react-vendor": ["react", "react-dom"],
          // Router in its own chunk
          router: ["react-router-dom"],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 600,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Target modern browsers for smaller output
    target: "es2020",
  },
});
