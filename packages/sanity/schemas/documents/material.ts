import { defineField, defineType } from "sanity";

export default defineType({
  name: "material",
  title: "Material",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nazwa",
      type: "localizedString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (wspólny dla PL/EN, używany w filtrach)",
      type: "slug",
      options: { source: "name.en", maxLength: 60 },
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "name.pl", subtitle: "name.en" },
  },
});
