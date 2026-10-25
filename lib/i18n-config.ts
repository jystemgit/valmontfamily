export const locales = ["es", "en", "it", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export const localeCookieName = "vf_locale";

export const localeSettings: Record<Locale, { label: string; html: string; og: string }> = {
  es: { label: "Spanish", html: "es-AR", og: "es_AR" },
  en: { label: "English", html: "en-US", og: "en_US" },
  it: { label: "Italian", html: "it-IT", og: "it_IT" },
  fr: { label: "French", html: "fr-FR", og: "fr_FR" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
