import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { documentInternationalization } from "@sanity/document-internationalization";
import { schemaTypes } from "./schemas";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "placeholder-project-id";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineConfig({
  name: "default",
  title: "Dekoracyjne Rzeźby BB",

  projectId,
  dataset,

  plugins: [
    structureTool(),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        { id: "pl", title: "Polski" },
        { id: "en", title: "English" },
      ],
      schemaTypes: ["sculpture", "post", "artistPage"],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
