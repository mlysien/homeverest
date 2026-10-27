import { defineConfig, envField, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import { remarkStripBanner } from "./src/utils/remarkStripBanner";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  base: "/",
  output: "static",
  outDir: "dist",
  redirects: {
    // Old address with a typo, kept so existing links still work
    "/posts/2024/podsumowanie-konkursku-100commitow":
      "/posts/2024/podsumowanie-konkursu-100commitow",
  },
    // Tags merged into a smaller set
    "/tags/c": "/tags/dotnet",
    "/tags/ioc": "/tags/dotnet",
    "/tags/library": "/tags/dotnet",
    "/tags/quartz.net": "/tags/dotnet",
    "/tags/cicd": "/tags/ci-cd",
    "/tags/github": "/tags/ci-cd",
    "/tags/cursorai": "/tags/ai",
    "/tags/programowanie": "/tags/ai",
    "/tags/vibecoding": "/tags/ai",
    "/tags/terminal": "/tags/narzedzia",
    "/tags/tools": "/tags/narzedzia",
    "/tags/challenge": "/tags/rozwoj",
    "/tags/others": "/tags/rozwoj",
  integrations: [
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkStripBanner,
      remarkToc,
      [remarkCollapse, { test: "Table of contents" }],
    ],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    // eslint-disable-next-line
    // @ts-ignore
    // This will be fixed in Astro 6 with Vite 7 support
    // See: https://github.com/withastro/astro/issues/14030
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    preserveScriptOrder: true,
    fonts: [
      {
        name: "Literata",
        cssVariable: "--font-literata",
        provider: fontProviders.google(),
        fallbacks: ["Georgia", "serif"],
        weights: [400, 500, 600],
        styles: ["normal", "italic"],
        subsets: ["latin", "latin-ext"],
      },
      {
        name: "Geist",
        cssVariable: "--font-geist",
        provider: fontProviders.google(),
        fallbacks: ["system-ui", "sans-serif"],
        weights: [400, 500, 600],
        styles: ["normal"],
        subsets: ["latin", "latin-ext"],
      },
      {
        name: "JetBrains Mono",
        cssVariable: "--font-jetbrains-mono",
        provider: fontProviders.google(),
        fallbacks: ["monospace"],
        weights: [400],
        styles: ["normal"],
        subsets: ["latin", "latin-ext"],
      },
    ],
  },
});
