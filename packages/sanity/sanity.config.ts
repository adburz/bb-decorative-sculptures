import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { structure, isSingleton } from "./schemas/structure";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "placeholder-project-id";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineConfig({
  name: "default",
  title: "Dekoracyjne Rzeźby BB",

  projectId,
  dataset,

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !isSingleton(schemaType)),
  },

  document: {
    actions: (input, { schemaType }) =>
      isSingleton(schemaType)
        ? input.filter(
            ({ action }) => action !== "unpublish" && action !== "duplicate" && action !== "delete",
          )
        : input,
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter(({ templateId }) => !isSingleton(templateId))
        : prev,
  },
});
