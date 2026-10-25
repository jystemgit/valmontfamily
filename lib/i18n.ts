import "server-only";
import { cookies } from "next/headers";
import { dictionaries, type Dictionary } from "@/lib/dictionaries";
import { defaultLocale, isLocale, localeCookieName, type Locale } from "@/lib/i18n-config";

export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get(localeCookieName)?.value;
  return isLocale(value) ? value : defaultLocale;
}

export async function getDictionary(): Promise<{ locale: Locale; t: Dictionary }> {
  const locale = await getLocale();
  return { locale, t: dictionaries[locale] };
}
