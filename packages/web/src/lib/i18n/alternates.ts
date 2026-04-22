import { LOCALES, type Locale } from "./index";

/**
 * Static URL mapping between PL and EN for pages whose slugs aren't derived from content.
 * Dynamic routes (e.g. sculptures, blog posts) should pass explicit alternates to BaseLayout.
 */
const STATIC_ROUTE_MAP: Record<string, Record<Locale, string>> = {
  "/pl/": { pl: "/pl/", en: "/en/" },
  "/pl/rzezby/": { pl: "/pl/rzezby/", en: "/en/sculptures/" },
  "/pl/o-mnie/": { pl: "/pl/o-mnie/", en: "/en/about/" },
  "/pl/kontakt/": { pl: "/pl/kontakt/", en: "/en/contact/" },
  "/pl/kontakt/dziekujemy/": {
    pl: "/pl/kontakt/dziekujemy/",
    en: "/en/contact/thanks/",
  },
  "/pl/blog/": { pl: "/pl/blog/", en: "/en/blog/" },
  "/pl/polityka-prywatnosci/": {
    pl: "/pl/polityka-prywatnosci/",
    en: "/en/privacy-policy/",
  },
  "/pl/regulamin/": { pl: "/pl/regulamin/", en: "/en/terms/" },
};

const EN_TO_PL_CANONICAL = Object.fromEntries(
  Object.entries(STATIC_ROUTE_MAP).map(([plKey, map]) => [map.en, plKey] as const),
);

const withTrailingSlash = (p: string): string => (p.endsWith("/") ? p : `${p}/`);

/**
 * Given the current pathname, return `{ pl, en }` absolute-ish paths.
 * Falls back to a naive /pl/ ↔ /en/ prefix swap for unknown paths.
 */
export function resolveAlternates(pathname: string): Record<Locale, string> {
  const path = withTrailingSlash(pathname);

  if (path in STATIC_ROUTE_MAP) {
    const entry = STATIC_ROUTE_MAP[path];
    if (entry) return entry;
  }

  if (path in EN_TO_PL_CANONICAL) {
    const canonical = EN_TO_PL_CANONICAL[path];
    if (canonical && canonical in STATIC_ROUTE_MAP) {
      const entry = STATIC_ROUTE_MAP[canonical];
      if (entry) return entry;
    }
  }

  if (path.startsWith("/pl/")) return { pl: path, en: `/en/${path.slice(4)}` };
  if (path.startsWith("/en/")) return { pl: `/pl/${path.slice(4)}`, en: path };

  return LOCALES.reduce(
    (acc, locale) => {
      acc[locale] = path;
      return acc;
    },
    {} as Record<Locale, string>,
  );
}
