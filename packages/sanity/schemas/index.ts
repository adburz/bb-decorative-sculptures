import type { SchemaTypeDefinition } from "sanity";

import localizedString from "./objects/localizedString";
import localizedText from "./objects/localizedText";
import localizedSlug from "./objects/localizedSlug";
import imageWithAlt from "./objects/imageWithAlt";
import dimensions from "./objects/dimensions";
import priceInfo from "./objects/priceInfo";
import seoFields from "./objects/seoFields";

import sculpture from "./documents/sculpture";
import material from "./documents/material";
import category from "./documents/category";
import artistPage from "./documents/artistPage";
import post from "./documents/post";
import siteSettings from "./documents/siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  localizedString,
  localizedText,
  localizedSlug,
  imageWithAlt,
  dimensions,
  priceInfo,
  seoFields,
  sculpture,
  material,
  category,
  artistPage,
  post,
  siteSettings,
];
