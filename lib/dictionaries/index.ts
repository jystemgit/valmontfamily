import type { Locale } from "@/lib/i18n-config";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { it } from "./it";
import type { Dictionary } from "./types";

export type { Dictionary } from "./types";

export const dictionaries: Record<Locale, Dictionary> = { es, en, it, fr };
