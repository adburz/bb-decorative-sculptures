import type { Sculpture, SiteSettings, ArtistPage } from "./types";

const source = import.meta.env.PUBLIC_CONTENT_SOURCE ?? "fixtures";

export async function getSculptures(): Promise<Sculpture[]> {
  if (source === "fixtures") {
    const mod = await import("~/fixtures/sculptures");
    return mod.default;
  }
  throw new Error(
    "Sanity content source not yet wired — implemented in Phase 4. Set PUBLIC_CONTENT_SOURCE=fixtures for now.",
  );
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (source === "fixtures") {
    const mod = await import("~/fixtures/siteSettings");
    return mod.default;
  }
  throw new Error("Sanity content source not yet wired — implemented in Phase 4.");
}

export async function getArtistPage(): Promise<ArtistPage> {
  if (source === "fixtures") {
    const mod = await import("~/fixtures/artistPage");
    return mod.default;
  }
  throw new Error("Sanity content source not yet wired — implemented in Phase 4.");
}
