import type { StructureResolver } from "sanity/structure";

const SINGLETONS = ["siteSettings", "artistPage"] as const;

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Treści")
    .items([
      S.listItem()
        .title("Ustawienia serwisu")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("O mnie")
        .id("artistPage")
        .child(S.document().schemaType("artistPage").documentId("artistPage")),
      S.divider(),
      S.documentTypeListItem("sculpture").title("Rzeźby"),
      S.documentTypeListItem("material").title("Materiały"),
      S.documentTypeListItem("category").title("Kategorie"),
      S.divider(),
      S.documentTypeListItem("post").title("Blog"),
    ]);

export const isSingleton = (schemaType: string): boolean =>
  (SINGLETONS as readonly string[]).includes(schemaType);
