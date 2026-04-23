import type { ArtistPage, Post, Sculpture, SiteSettings } from "./types";

const source = import.meta.env.PUBLIC_CONTENT_SOURCE ?? "fixtures";
const useFixtures = source === "fixtures";

async function fromSanity<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  const { sanityClient } = await import("~/lib/sanity/client");
  return sanityClient().fetch<T>(query, params ?? {});
}

export async function getSculptures(): Promise<Sculpture[]> {
  if (useFixtures) {
    const mod = await import("~/fixtures/sculptures");
    return mod.default;
  }
  const { sculpturesListQuery } = await import("~/lib/sanity/queries");
  return fromSanity<Sculpture[]>(sculpturesListQuery);
}

export async function getSculptureBySlug(slug: string): Promise<Sculpture | null> {
  if (useFixtures) {
    const all = await getSculptures();
    return all.find((s) => s.slug.pl === slug || s.slug.en === slug) ?? null;
  }
  const { sculptureBySlugQuery } = await import("~/lib/sanity/queries");
  return fromSanity<Sculpture | null>(sculptureBySlugQuery, { slug });
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (useFixtures) {
    const mod = await import("~/fixtures/siteSettings");
    return mod.default;
  }
  const { siteSettingsQuery } = await import("~/lib/sanity/queries");
  const settings = await fromSanity<SiteSettings | null>(siteSettingsQuery);
  if (!settings) {
    const mod = await import("~/fixtures/siteSettings");
    return mod.default;
  }
  return settings;
}

export async function getArtistPage(): Promise<ArtistPage> {
  if (useFixtures) {
    const mod = await import("~/fixtures/artistPage");
    return mod.default;
  }
  const { artistPageQuery } = await import("~/lib/sanity/queries");
  const artistPage = await fromSanity<ArtistPage | null>(artistPageQuery);
  if (!artistPage) {
    const mod = await import("~/fixtures/artistPage");
    return mod.default;
  }
  return artistPage;
}

export async function getPosts(): Promise<Post[]> {
  if (useFixtures) {
    const mod = await import("~/fixtures/posts");
    return mod.default;
  }
  const { postsListQuery } = await import("~/lib/sanity/queries");
  return fromSanity<Post[]>(postsListQuery);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (useFixtures) {
    const all = await getPosts();
    return all.find((p) => p.slug.pl === slug || p.slug.en === slug) ?? null;
  }
  const { postBySlugQuery } = await import("~/lib/sanity/queries");
  return fromSanity<Post | null>(postBySlugQuery, { slug });
}
