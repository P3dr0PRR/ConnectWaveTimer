import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const lang = ["en", "ru", "ptBR", "cn"].includes(mode) ? mode : "ptBR";

  return {
    define: {
      __LANG__: JSON.stringify(lang),
    },
    // Use root base path to work on Vercel
    base: "/",
    plugins: [
      react(),
      compression({
        algorithm: "gzip",
        ext: ".gz",
        filter: /\.(js|css|html|ttf)$/,
        // Keep original assets; Vercel handles compression
        deleteOriginFile: false,
        threshold: 0,
      }),
    ],
    server: {
      port: 5378,
      host: true,
      cors: true,
      watch: {
        usePolling: true,
      },
      proxy: {
        "/api": {
          target: "http://localhost:5379",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    publicDir: "public",
    build: {
      sourcemap: true,
      minify: "terser",
      terserOptions: {
        format: {
          comments: false, // Remove todos os comentários, inclusive os de licenciamento
        },
      },
      cssMinify: true,
      cssCodeSplit: true,
      outDir: "dist",
      assetsDir: "assets",
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "index.html"),
        },
        output: {
          entryFileNames: (chunk) =>
            chunk.name === "canvas" ? "canvas.js" : "app.js",
          chunkFileNames: "assets/[name].js",
          assetFileNames: "[name].[ext]",
        },
      },
    },
  };
});
