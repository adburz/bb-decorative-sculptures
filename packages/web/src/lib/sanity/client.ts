import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

let cached: SanityClient | null = null;
let cachedBuilder: ImageUrlBuilder | null = null;

export function sanityClient(): SanityClient {
  if (cached) return cached;

  const projectId = import.meta.env.SANITY_PROJECT_ID;
  const dataset = import.meta.env.SANITY_DATASET;
  if (!projectId || !dataset) {
    throw new Error(
      "Sanity client requested but SANITY_PROJECT_ID / SANITY_DATASET are not set. " +
        "Either populate them or keep PUBLIC_CONTENT_SOURCE=fixtures.",
    );
  }

  cached = createClient({
    projectId,
    dataset,
    apiVersion: "2024-10-01",
    useCdn: true,
    token: import.meta.env.SANITY_API_TOKEN,
  });
  return cached;
}

export function urlFor(source: unknown): ImageUrlBuilder {
  if (!cachedBuilder) cachedBuilder = imageUrlBuilder(sanityClient());
  return cachedBuilder.image(source as Parameters<ImageUrlBuilder["image"]>[0]);
}
