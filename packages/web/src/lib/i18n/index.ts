import plMessages from "./pl.json";
import enMessages from "./en.json";

export type Locale = "pl" | "en";
export const DEFAULT_LOCALE: Locale = "pl";
export const LOCALES: Locale[] = ["pl", "en"];

const dictionaries: Record<Locale, Record<string, string>> = {
  pl: plMessages,
  en: enMessages,
};

export function isLocale(value: string | undefined): value is Locale {
  return value === "pl" || value === "en";
}

/**
 * Fetch a translated string. Supports `{name}` placeholders replaced from `params`.
 *
 * t("pl", "sculptures.lead", { count: 12, city: "Warszawa" })
 * → "12 prac — każda unikatowa, sygnowana i gotowa do wysyłki z Warszawy."
 */
export function t(locale: Locale, key: string, params?: Record<string, string | number>): string {
  const raw = dictionaries[locale][key] ?? key;
  if (!params) return raw;
  return raw.replace(/\{(\w+)\}/g, (_match, token: string) => {
    const value = params[token];
    return value !== undefined ? String(value) : `{${token}}`;
  });
}
