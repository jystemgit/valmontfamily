import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/lib/i18n";
import { localeSettings } from "@/lib/i18n-config";
import { organizationJsonLd, siteName, siteUrl, websiteJsonLd } from "@/lib/seo";
import { getNavigation } from "@/lib/site-content";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDictionary();
  const defaultTitle = `${siteName} | ${t.site.alternateName}`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: defaultTitle,
      template: `%s | ${siteName}`,
    },
    description: t.site.description,
    applicationName: siteName,
    keywords: [...t.site.keywords],
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    category: t.site.category,
    referrer: "origin-when-cross-origin",
    formatDetection: { email: false, address: false, telephone: false },
    alternates: { canonical: "/" },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: localeSettings[locale].og,
      url: "/",
      siteName,
      title: defaultTitle,
      description: t.site.description,
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: t.site.description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#fafaf9",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { locale, t } = await getDictionary();
  const navigation = getNavigation(t);

  return (
    <html lang={localeSettings[locale].html} className={GeistSans.variable}>
      <body>
        <JsonLd data={{ "@context": "https://schema.org", "@graph": [organizationJsonLd(t), websiteJsonLd(t, locale)] }} />
        <a className="skip-link" href="#main-content">{t.ui.skip}</a>
        <SiteHeader
          locale={locale}
          navigation={navigation}
          labels={{
            home: t.ui.homeAria,
            mainNav: t.ui.mainNav,
            mobileNav: t.ui.mobileNav,
            openNav: t.ui.openNav,
            closeNav: t.ui.closeNav,
            language: t.ui.language,
            languagePending: t.ui.languagePending,
            languageError: t.ui.languageError,
          }}
        />
        <main id="main-content">{children}</main>
        <SiteFooter t={t} navigation={navigation} />
      </body>
    </html>
  );
}
