export type Locale = "pl" | "en";
export const DEFAULT_LOCALE: Locale = "pl";
export const LOCALES: Locale[] = ["pl", "en"];

import plMessages from "./pl.json";
import enMessages from "./en.json";

const dictionaries: Record<Locale, Record<string, string>> = {
  pl: plMessages,
  en: enMessages,
};

export function t(locale: Locale, key: string): string {
  return dictionaries[locale][key] ?? key;
}
