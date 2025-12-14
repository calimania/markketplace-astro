import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";

import * as dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.BASE_URL || import.meta.env.BASE_URL;
const STORE_SLUG = process.env.STORE_SLUG || import.meta.env.STORE_SLUG;
import tailwindcss from "@tailwindcss/vite";

/**
 * @type {import('astro/types').RuntimeConfig}
 */
export default defineConfig({
  site: BASE_URL || `https://markket.place/${STORE_SLUG}`,
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
