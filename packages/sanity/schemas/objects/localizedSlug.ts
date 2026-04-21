import { defineField, defineType } from "sanity";

export default defineType({
  name: "localizedSlug",
  title: "Localized slug",
  type: "object",
  fields: [
    defineField({
      name: "pl",
      title: "Slug (PL)",
      type: "slug",
      options: { source: (_doc, { parent }) => (parent as { pl?: string } | undefined)?.pl ?? "" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "en",
      title: "Slug (EN)",
      type: "slug",
      options: { source: (_doc, { parent }) => (parent as { en?: string } | undefined)?.en ?? "" },
      validation: (r) => r.required(),
    }),
  ],
});
