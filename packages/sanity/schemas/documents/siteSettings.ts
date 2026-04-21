import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Ustawienia serwisu",
  type: "document",
  groups: [
    { name: "brand", title: "Brand", default: true },
    { name: "contact", title: "Kontakt" },
    { name: "social", title: "Social media" },
    { name: "footer", title: "Stopka" },
    { name: "seo", title: "Domyślne SEO" },
  ],
  fields: [
    defineField({
      name: "brandName",
      title: "Nazwa marki",
      type: "string",
      group: "brand",
      initialValue: "Dekoracyjne Rzeźby BB",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "localizedString",
      group: "brand",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "contactEmail",
      title: "Email kontaktowy",
      type: "string",
      group: "contact",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "contactPhone",
      title: "Telefon",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactAddress",
      title: "Adres (pracownia)",
      type: "localizedText",
      group: "contact",
    }),
    defineField({
      name: "contactHours",
      title: "Godziny kontaktu",
      type: "localizedString",
      group: "contact",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "footerCopy",
      title: "Tekst stopki",
      type: "localizedText",
      group: "footer",
    }),
    defineField({
      name: "copyrightLine",
      title: "Linia copyright",
      type: "localizedString",
      group: "footer",
      description:
        "Np. '© Dekoracyjne Rzeźby BB 2026'. Rok można zostawić statyczny albo pominąć — frontend umie podstawić.",
    }),
    defineField({
      name: "defaultOgImage",
      title: "Domyślny OpenGraph image (1200×630)",
      type: "image",
      group: "seo",
      description: "Fallback dla stron bez własnego og-image.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Ustawienia serwisu" }),
  },
});
