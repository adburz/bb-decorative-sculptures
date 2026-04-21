import { defineField, defineType } from "sanity";

export default defineType({
  name: "seoFields",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Meta title (nadpisuje tytuł strony)",
      type: "localizedString",
      description: "Opcjonalnie — jeśli puste, używany jest tytuł dokumentu.",
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "localizedString",
      description: "Maksymalnie ~155 znaków. Jeśli puste, generowany z opisu.",
    }),
    defineField({
      name: "ogImage",
      title: "OpenGraph image (1200×630)",
      type: "image",
      description:
        "Jeśli puste, używany jest pierwszy obraz z galerii lub domyślny z siteSettings.",
    }),
  ],
});
