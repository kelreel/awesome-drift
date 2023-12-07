import preact from "@preact/preset-vite";
import { resolve } from "path";
import { defineConfig, LibraryOptions } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig((config) => {
  return {
    define: {
      "process.env": {},
    },
    plugins: [
      preact(),
      svgr(),
      viteStaticCopy({
        targets: [
          // copy runtime to app block extension
          {
            src: "dist/widget.iife.js",
            dest: resolve("../../extensions/blinks-block/assets/"),
            rename: "widget.js",
          },
          // copy runtime to frontend app for design preview
          {
            src: "dist/widget.iife.js",
            dest: resolve("../frontend/widget-runtime/"),
            rename: "widget.js",
          },
        ],
      }),
    ],
    appType: "spa",
    build: {
      lib: {
        entry: resolve(__dirname, "src/main.tsx"),
        name: "Widget",
        fileName: "widget",
        formats: ["iife", "es"],
      } as LibraryOptions,
      minify: true,
      emptyOutDir: false,
    },
  };
});
