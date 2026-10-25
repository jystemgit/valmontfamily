import type { Metadata } from "next";
import type { Dictionary } from "@/lib/dictionaries";
import { localeSettings, type Locale } from "@/lib/i18n-config";

export const siteUrl = "https://valmontfamily.com";
export const siteName = "Valmont Family";
export const siteAlternateName = "The Sovereign Family";
export const siteMotto = "The Sovereign Creates";
export const siteDescription =
  "Valmont Family, The Sovereign Family, is a multigenerational family institution dedicated to sovereignty, creation, and the responsibility of building a stronger legacy across generations";

export type PageSeo = {
  title: string;
  description: string;
  path: `/${string}`;
  ogTitle?: string;
  keywords?: readonly string[];
  locale: Locale;
  t: Dictionary;
};

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function pageMetadata({ title, description, path, ogTitle, keywords = [], locale, t }: PageSeo): Metadata {
  const socialTitle = ogTitle ?? `${title} | ${siteName}`;

  return {
    title,
    description,
    keywords: [...t.site.keywords, ...keywords],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: localeSettings[locale].og,
      siteName,
      url: path,
      title: socialTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}

type Crumb = { name: string; path: string };

export function organizationJsonLd(t: Dictionary) {
  return {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    alternateName: t.site.alternateName,
    url: siteUrl,
    slogan: siteMotto,
    description: t.site.description,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/valmont-emblem.png"),
      width: 439,
      height: 512,
    },
  };
}

export function websiteJsonLd(t: Dictionary, locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    alternateName: t.site.alternateName,
    url: siteUrl,
    inLanguage: localeSettings[locale].html,
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

type WebPageInput = { title: string; description: string; path: string; crumbs?: Crumb[]; locale: Locale; t: Dictionary };

export function webPageJsonLd({ title, description, path, crumbs = [], locale, t }: WebPageInput) {
  const url = absoluteUrl(path);
  const trail: Crumb[] = [{ name: t.nav.home, path: "/" }, ...crumbs];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: localeSettings[locale].html,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        primaryImageOfPage: absoluteUrl(`${path === "/" ? "" : path}/opengraph-image`),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: trail.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: absoluteUrl(crumb.path),
        })),
      },
    ],
  };
}
