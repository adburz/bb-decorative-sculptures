import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blog post",
  type: "document",
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
      name: "excerpt",
      title: "Zajawka",
      type: "localizedText",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Treść",
      type: "localizedText",
      description: "W Fazie 4 zamieniamy na portable text (rich). Na razie plain text.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Obraz wiodący",
      type: "imageWithAlt",
    }),
    defineField({
      name: "publishedAt",
      title: "Data publikacji",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "newsletterEligible",
      title: "Eligible do newslettera",
      description:
        "Architecture hook — w MVP nic nie robi. W przyszłości będzie filtrować, które posty wychodzą do subskrybentów.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
    }),
  ],
  orderings: [
    {
      title: "Najnowsze",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title.pl", subtitle: "title.en", media: "coverImage" },
  },
});
