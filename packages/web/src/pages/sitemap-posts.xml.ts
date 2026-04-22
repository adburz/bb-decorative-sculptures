import type { APIRoute } from "astro";
import { getPosts } from "~/lib/content";

export const prerender = true;

const escape = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ?? new URL("https://rzezbadekoracyjna.pl");
  const posts = await getPosts();

  const locales: Array<{ code: "pl" | "en"; base: string }> = [
    { code: "pl", base: "/pl/blog/" },
    { code: "en", base: "/en/blog/" },
  ];

  const entries: string[] = [];
  for (const post of posts) {
    for (const loc of locales) {
      const self = new URL(`${loc.base}${post.slug[loc.code]}/`, siteUrl).toString();
      const altCode: "pl" | "en" = loc.code === "pl" ? "en" : "pl";
      const altBase = altCode === "pl" ? "/pl/blog/" : "/en/blog/";
      const altUrl = new URL(`${altBase}${post.slug[altCode]}/`, siteUrl).toString();
      const xDefault = new URL(`/pl/blog/${post.slug.pl}/`, siteUrl).toString();

      entries.push(
        `  <url>
    <loc>${escape(self)}</loc>
    <xhtml:link rel="alternate" hreflang="${loc.code}" href="${escape(self)}" />
    <xhtml:link rel="alternate" hreflang="${altCode}" href="${escape(altUrl)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escape(xDefault)}" />
    <lastmod>${new Date(post.publishedAt).toISOString()}</lastmod>
  </url>`,
      );
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;

  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
