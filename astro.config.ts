import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { markketplace } from "./src/config";
import tailwindcss from "@tailwindcss/vite";

/**
 * @type {import('astro/types').RuntimeConfig}
 */
export default defineConfig({
  site: markketplace?.url,
  integrations: [
    react(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },
  output: "static",
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js", "fsevents"],
    },
    ssr: {
      noExternal: [],
    },
    plugins: [
      tailwindcss()
    ],
  },
  scopedStyleStrategy: "where",
  outDir: "./dist",
});
