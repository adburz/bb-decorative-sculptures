import type { ArtistPage, Post, Sculpture, SiteSettings } from "~/lib/content/types";
import type { Locale } from "~/lib/i18n";

type JsonLd = Record<string, unknown>;

function absolute(url: string, siteUrl: URL): string {
  return new URL(url, siteUrl).toString();
}

export function organizationLd(settings: SiteSettings, siteUrl: URL): JsonLd {
  const sameAs = [settings.social.instagram, settings.social.facebook].filter(
    (v): v is string => typeof v === "string" && v.length > 0,
  );
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.brandName,
    url: siteUrl.toString(),
    email: settings.contact.email,
    ...(settings.contact.phone ? { telephone: settings.contact.phone } : {}),
    ...(settings.contact.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: settings.contact.address,
            ...(settings.contact.city ? { addressLocality: settings.contact.city.en } : {}),
            addressCountry: "PL",
          },
        }
      : {}),
    contactPoint: {
      "@type": "ContactPoint",
      email: settings.contact.email,
      contactType: "customer support",
      ...(settings.contact.phone ? { telephone: settings.contact.phone } : {}),
      availableLanguage: ["Polish", "English"],
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function websiteLd(settings: SiteSettings, siteUrl: URL, locale: "pl" | "en"): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.brandName,
    url: siteUrl.toString(),
    inLanguage: locale === "pl" ? "pl-PL" : "en-US",
    description: settings.tagline[locale],
  };
}

export function personLd(artist: ArtistPage, settings: SiteSettings, siteUrl: URL): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings.brandName,
    ...(artist.bio?.en ? { description: artist.bio.en } : {}),
    ...(artist.portrait ? { image: absolute(artist.portrait.url, siteUrl) } : {}),
    ...(settings.social.instagram ? { sameAs: [settings.social.instagram] } : {}),
  };
}

export function productLd(
  sculpture: Sculpture,
  locale: Locale,
  settings: SiteSettings,
  siteUrl: URL,
): JsonLd {
  const detailPath =
    locale === "pl" ? `/pl/rzezby/${sculpture.slug.pl}/` : `/en/sculptures/${sculpture.slug.en}/`;
  const images = sculpture.gallery.map((g) => absolute(g.url, siteUrl));
  const availability =
    sculpture.status === "available"
      ? "https://schema.org/InStock"
      : sculpture.status === "reserved"
        ? "https://schema.org/PreOrder"
        : "https://schema.org/OutOfStock";

  const offers = sculpture.price.onRequest
    ? {
        "@type": "Offer",
        availability,
        url: absolute(detailPath, siteUrl),
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: sculpture.price.currency ?? "EUR",
        },
      }
    : {
        "@type": "Offer",
        price: String(sculpture.price.amount ?? 0),
        priceCurrency: sculpture.price.currency ?? "EUR",
        availability,
        url: absolute(detailPath, siteUrl),
      };

  return {
    "@context": "https://schema.org",
    "@type": ["Product", "VisualArtwork"],
    name: sculpture.title[locale],
    description: sculpture.description[locale],
    image: images,
    url: absolute(detailPath, siteUrl),
    brand: { "@type": "Brand", name: settings.brandName },
    artMedium: sculpture.material.name[locale],
    artform: "Sculpture",
    offers,
  };
}

export function collectionPageLd(
  title: string,
  description: string,
  items: Sculpture[],
  locale: Locale,
  siteUrl: URL,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    hasPart: items.map((s) => {
      const href = locale === "pl" ? `/pl/rzezby/${s.slug.pl}/` : `/en/sculptures/${s.slug.en}/`;
      return {
        "@type": "Product",
        name: s.title[locale],
        url: absolute(href, siteUrl),
      };
    }),
  };
}

export function articleLd(
  post: Post,
  locale: Locale,
  settings: SiteSettings,
  siteUrl: URL,
): JsonLd {
  const path = locale === "pl" ? `/pl/blog/${post.slug.pl}/` : `/en/blog/${post.slug.en}/`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title[locale],
    description: post.excerpt[locale],
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: settings.brandName },
    ...(post.coverImage ? { image: absolute(post.coverImage.url, siteUrl) } : {}),
    url: absolute(path, siteUrl),
  };
}
