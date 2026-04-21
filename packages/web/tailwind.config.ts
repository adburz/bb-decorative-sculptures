import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#F5EFE6", // base/warm beige (bg/base)
          panel: "#EFE7DA", // footer, quote section (bg/panel)
          hero: "#1E1712", // dark hero (bg/hero)
          text: "#1E1E1C", // primary text
          accent: "#B8956A", // warm gold (accent/gold)
          button: "#111111", // primary button
          muted: "#6B6A66", // meta text (text/muted — confirmed from doc: #6B6A66)
          border: "#E3DDD0", // subtle border
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.2em",
      },
      fontSize: {
        eyebrow: ["11px", { lineHeight: "1.4", letterSpacing: "0.2em" }],
      },
    },
  },
  plugins: [],
} satisfies Config;
