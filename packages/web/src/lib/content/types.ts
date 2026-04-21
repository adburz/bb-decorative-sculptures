export type LocalizedString = { pl: string; en: string };

export type ImageWithAlt = {
  url: string;
  alt: LocalizedString;
  width?: number;
  height?: number;
};

export type Sculpture = {
  _id: string;
  title: LocalizedString;
  slug: { pl: string; en: string };
  material: { name: LocalizedString; slug: string };
  dimensions: { height: number; width: number; depth: number; unit: "cm" | "in" };
  price: { amount?: number; currency?: "EUR" | "PLN"; onRequest: boolean };
  status: "available" | "sold" | "reserved";
  gallery: ImageWithAlt[];
  description: { pl: string; en: string };
  publishedAt: string;
};

export type SiteSettings = {
  brandName: string;
  tagline: LocalizedString;
  contact: { email: string; phone?: string; address?: string };
  social: { instagram?: string; facebook?: string };
};

export type ArtistPage = {
  bio: LocalizedString;
  quote: LocalizedString;
  portrait?: ImageWithAlt;
};
