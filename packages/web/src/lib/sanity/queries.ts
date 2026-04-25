const sculptureProjection = `{
  _id,
  "title": title,
  "slug": {"pl": slug_pl.current, "en": slug_en.current},
  "material": {
    "name": material->name,
    "slug": material->slug.current
  },
  "category": {
    "name": category->name,
    "slug": category->slug.current
  },
  dimensions,
  price,
  status,
  "gallery": gallery[]{
    "url": asset->url,
    alt,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  },
  description,
  seo,
  publishedAt
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  brandName,
  tagline,
  contact,
  social,
  "homeHeroImage": {
    "url": homeHeroImage.asset->url,
    "alt": homeHeroImage.alt,
    "width": homeHeroImage.asset->metadata.dimensions.width,
    "height": homeHeroImage.asset->metadata.dimensions.height
  },
  "defaultOgImage": defaultOgImage.asset->url
}`;

export const sculpturesListQuery = `*[_type == "sculpture"] | order(publishedAt desc) ${sculptureProjection}`;

export const sculptureBySlugQuery = `*[_type == "sculpture" && (slug_pl.current == $slug || slug_en.current == $slug)][0] ${sculptureProjection}`;

export const artistPageQuery = `*[_type == "artistPage"][0]{
  bio,
  quote,
  "portrait": {
    "url": portrait.asset->url,
    "alt": portrait.alt,
    "width": portrait.asset->metadata.dimensions.width,
    "height": portrait.asset->metadata.dimensions.height
  }
}`;

const postProjection = `{
  _id,
  title,
  "slug": {"pl": slug_pl.current, "en": slug_en.current},
  excerpt,
  body,
  "coverImage": {
    "url": coverImage.asset->url,
    "alt": coverImage.alt,
    "width": coverImage.asset->metadata.dimensions.width,
    "height": coverImage.asset->metadata.dimensions.height
  },
  publishedAt,
  seo
}`;

export const postsListQuery = `*[_type == "post"] | order(publishedAt desc) ${postProjection}`;

export const postBySlugQuery = `*[_type == "post" && (slug_pl.current == $slug || slug_en.current == $slug)][0] ${postProjection}`;
