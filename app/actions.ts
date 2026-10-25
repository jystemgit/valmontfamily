"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { isLocale, localeCookieName } from "@/lib/i18n-config";

export async function setLanguage(locale: string) {
  if (!isLocale(locale)) throw new Error("Unsupported language");

  (await cookies()).set(localeCookieName, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  revalidatePath("/", "layout");
}
