import { defineField, defineType } from "sanity";

export default defineType({
  name: "artistPage",
  title: "Strona 'O mnie'",
  type: "document",
  fields: [
    defineField({
      name: "bio",
      title: "Biografia",
      type: "localizedText",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "quote",
      title: "Cytat (wyróżniony)",
      type: "localizedString",
    }),
    defineField({
      name: "portrait",
      title: "Portret",
      type: "imageWithAlt",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
    }),
  ],
  preview: {
    prepare: () => ({ title: "O mnie" }),
  },
});
