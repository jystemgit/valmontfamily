import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import { SectionTitle } from "@/components/section-title";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";

const path = "/family";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDictionary();
  return pageMetadata({ ...t.family.seo, path, locale, t });
}

export default async function FamilyPage() {
  const { locale, t } = await getDictionary();
  const f = t.family;

  return (
    <>
      <JsonLd data={webPageJsonLd({ ...f.seo, path, locale, t, crumbs: [{ name: f.seo.title, path }] })} />
      <PageIntro {...f.intro} />

      <section className="page-section">
        <div className="content-shell split-section">
          <SectionTitle eyebrow={f.origins.eyebrow} title={f.origins.title} />
          <div className="split-copy">
            {f.origins.body.map((paragraph) => <p className="section-copy" key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className="statement-band">
        <div className="content-shell split-section">
          {[f.mission, f.vision].map(([label, text]) => (
            <div key={label}>
              <p className="eyebrow">{label}</p>
              <p className="section-copy">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section content-shell split-section">
        <SectionTitle eyebrow={f.sovereignty.eyebrow} title={f.sovereignty.title} />
        <div className="split-copy">
          {f.sovereignty.body.map((paragraph) => <p className="section-copy" key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="page-section content-shell">
        <SectionTitle {...f.virtues} />
        <div className="virtue-list">
          {t.virtues.map((virtue) => (
            <article className="virtue-item" key={virtue}>
              <h3>{virtue}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section content-shell">
        <SectionTitle {...f.principles} />
        <div className="principle-list">
          {t.principles.map(([title, description]) => (
            <article className="principle-row" key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section content-shell">
        <SectionTitle {...f.standard} />
        <div className="standard-list">
          {t.standards.map(([title, description]) => (
            <article className="standard-row" key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="content-shell split-section">
          <SectionTitle eyebrow={f.stewardship.eyebrow} title={f.stewardship.title} />
          <div className="split-copy">
            {f.stewardship.body.map((paragraph) => <p className="section-copy" key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className="closing-section content-shell">
        <p className="eyebrow">{f.closing.eyebrow}</p>
        <h2>{f.closing.title}</h2>
        <p>{f.closing.text}</p>
      </section>
    </>
  );
}
