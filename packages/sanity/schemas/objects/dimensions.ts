import { defineField, defineType } from "sanity";

export default defineType({
  name: "dimensions",
  title: "Dimensions",
  type: "object",
  fields: [
    defineField({
      name: "height",
      title: "Height",
      type: "number",
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: "width",
      title: "Width",
      type: "number",
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: "depth",
      title: "Depth",
      type: "number",
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: "unit",
      title: "Unit",
      type: "string",
      options: { list: ["cm", "in"], layout: "radio" },
      initialValue: "cm",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { h: "height", w: "width", d: "depth", u: "unit" },
    prepare: ({ h, w, d, u }) => ({
      title: h && w && d ? `${h} × ${w} × ${d} ${u}` : "Wymiary niekompletne",
    }),
  },
});
