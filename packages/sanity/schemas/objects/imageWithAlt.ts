import { defineField, defineType } from "sanity";

export default defineType({
  name: "imageWithAlt",
  title: "Image with alt",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "localizedString",
      description:
        "Opisz co widać na zdjęciu (ważne dla SEO i dostępności). Nie pisz 'zdjęcie rzeźby' — opisz formę, materiał, kontekst.",
      validation: (r) => r.required(),
    }),
  ],
});
