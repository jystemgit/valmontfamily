import type { Dictionary } from "@/lib/dictionaries";

export const navigationItems = [
  { key: "home", href: "/" },
  { key: "family", href: "/family" },
  { key: "chronicle", href: "/chronicle" },
] as const;

export type NavigationLink = { label: string; href: string };

export function getNavigation(t: Dictionary): NavigationLink[] {
  return navigationItems.map((item) => ({ label: t.nav[item.key], href: item.href }));
}
