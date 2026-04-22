import type { APIRoute } from "astro";
import { getSculptures } from "~/lib/content";
import { resolveAlt } from "~/lib/image";

export const prerender = true;

const escape = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ?? new URL("https://dekoracyjna-rzezba.pl");
  const sculptures = await getSculptures();

  const locales: Array<{ code: "pl" | "en"; base: string }> = [
    { code: "pl", base: "/pl/rzezby/" },
    { code: "en", base: "/en/sculptures/" },
  ];

  const entries: string[] = [];
  for (const sculpture of sculptures) {
    for (const loc of locales) {
      const self = new URL(`${loc.base}${sculpture.slug[loc.code]}/`, siteUrl).toString();
      const altCode: "pl" | "en" = loc.code === "pl" ? "en" : "pl";
      const altBase = altCode === "pl" ? "/pl/rzezby/" : "/en/sculptures/";
      const altUrl = new URL(`${altBase}${sculpture.slug[altCode]}/`, siteUrl).toString();

      const images = sculpture.gallery
        .map((img) => {
          const loc = new URL(img.url, siteUrl).toString();
          const caption = resolveAlt(img, "en", sculpture.title.en);
          const title = sculpture.title.en;
          return `    <image:image>
      <image:loc>${escape(loc)}</image:loc>
      <image:title>${escape(title)}</image:title>
      <image:caption>${escape(caption)}</image:caption>
    </image:image>`;
        })
        .join("\n");

      entries.push(
        `  <url>
    <loc>${escape(self)}</loc>
    <xhtml:link rel="alternate" hreflang="${loc.code}" href="${escape(self)}" />
    <xhtml:link rel="alternate" hreflang="${altCode}" href="${escape(altUrl)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escape(
      locales[0] ? new URL(`${locales[0].base}${sculpture.slug.pl}/`, siteUrl).toString() : self,
    )}" />
    <lastmod>${new Date(sculpture.publishedAt).toISOString()}</lastmod>
${images}
  </url>`,
      );
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join("\n")}
</urlset>
`;

  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
