import type { ImageWithAlt } from "~/lib/content/types";
import type { Locale } from "~/lib/i18n";

export function resolveAlt(image: ImageWithAlt, locale: Locale, fallback: string): string {
  const specific = image.alt?.[locale];
  if (specific && specific.trim().length > 0) return specific;
  const other: Locale = locale === "pl" ? "en" : "pl";
  return image.alt?.[other] ?? fallback;
}
