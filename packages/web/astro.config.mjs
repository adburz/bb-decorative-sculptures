import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? "https://dekoracyjna-rzezba.pl",
  integrations: [tailwind({ applyBaseStyles: false }), sitemap()],
  i18n: {
    defaultLocale: "pl",
    locales: ["pl", "en"],
    routing: { prefixDefaultLocale: true },
  },
  build: { inlineStylesheets: "auto" },
  prefetch: { defaultStrategy: "viewport" },
});
