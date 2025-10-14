import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    // 🚀 Split vendor (node_modules) code into separate chunks
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },

    // ⚙️ Increase warning limit (optional)
    chunkSizeWarningLimit: 1600,

    // 🧹 Ensure assets and images are optimized
    assetsInlineLimit: 4096, // 4kb inline images, larger ones as separate files
    sourcemap: false,
    minify: "terser", // better minification
    terserOptions: {
      compress: {
        drop_console: true, // removes console.log for production
      },
    },
  },

  resolve: {
    alias: {
      "@": "/src", // ✅ allows cleaner imports like '@/components/Button'
    },
  },
});
