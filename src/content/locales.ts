import type { Locale } from "./schemas";

export const defaultLocale = "en" satisfies Locale;

export const supportedLocales = ["en", "ua"] as const satisfies readonly Locale[];

export const localeLabels = {
  en: "EN",
  ua: "UA",
} satisfies Record<Locale, string>;

export const htmlLangByLocale = {
  en: "en",
  ua: "uk",
} satisfies Record<Locale, string>;

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}

