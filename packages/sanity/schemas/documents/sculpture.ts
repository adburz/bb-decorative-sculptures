import { defineField, defineType } from "sanity";

export default defineType({
  name: "sculpture",
  title: "Sculpture",
  type: "document",
  fieldsets: [
    { name: "meta", title: "Meta", options: { collapsible: true, collapsed: false } },
    { name: "commerce", title: "Cena i status", options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "localizedString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "localizedSlug",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "material",
      title: "Materiał",
      type: "reference",
      to: [{ type: "material" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Kategoria",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "dimensions",
      title: "Wymiary",
      type: "dimensions",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "Cena",
      type: "priceInfo",
      fieldset: "commerce",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { value: "available", title: "Dostępna" },
          { value: "reserved", title: "Zarezerwowana" },
          { value: "sold", title: "Sprzedana" },
        ],
        layout: "radio",
      },
      initialValue: "available",
      fieldset: "commerce",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "gallery",
      title: "Galeria",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      options: { layout: "grid" },
      validation: (r) => r.required().min(1).max(12),
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "localizedText",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data publikacji",
      type: "datetime",
      fieldset: "meta",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
      fieldset: "meta",
    }),
  ],
  orderings: [
    {
      title: "Najnowsze",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Tytuł (PL)",
      name: "titlePlAsc",
      by: [{ field: "title.pl", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title.pl",
      subtitle: "title.en",
      media: "gallery.0",
      status: "status",
    },
    prepare: ({ title, subtitle, media, status }) => ({
      title: title ?? "(bez tytułu)",
      subtitle: [subtitle, status].filter(Boolean).join(" · "),
      media,
    }),
  },
});
