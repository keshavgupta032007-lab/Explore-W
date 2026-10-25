import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: {
    outDir: "react-dist",
    emptyOutDir: true,
    lib: {
      entry: "react/main.jsx",
      name: "ExploreWReact",
      formats: ["iife"],
      fileName: () => "explore-react.js",
    },
    rollupOptions: {
      output: { assetFileNames: "explore-react[extname]" },
    },
  },
});
