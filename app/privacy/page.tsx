import type { Metadata } from "next";
import { Fragment } from "react";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";

const path = "/privacy";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDictionary();
  return pageMetadata({ ...t.privacy.seo, path, locale, t });
}

export default async function PrivacyPage() {
  const { locale, t } = await getDictionary();
  const p = t.privacy;

  return (
    <>
      <JsonLd data={webPageJsonLd({ ...p.seo, path, locale, t, crumbs: [{ name: p.seo.title, path }] })} />
      <PageIntro {...p.intro} />
      <section className="page-section content-shell privacy-content">
        {p.sections.map(([heading, text]) => (
          <Fragment key={heading}>
            <h2>{heading}</h2>
            <p>{text}</p>
          </Fragment>
        ))}
      </section>
    </>
  );
}
