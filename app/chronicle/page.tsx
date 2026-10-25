import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";

const path = "/chronicle";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDictionary();
  return pageMetadata({ ...t.chronicle.seo, path, locale, t });
}

export default async function ChroniclePage() {
  const { locale, t } = await getDictionary();
  const c = t.chronicle;

  return (
    <>
      <JsonLd data={webPageJsonLd({ ...c.seo, path, locale, t, crumbs: [{ name: c.seo.title, path }] })} />
      <PageIntro {...c.intro} />

      <section className="statement-band">
        <div className="content-shell">
          <p className="eyebrow">{c.memory.eyebrow}</p>
          <blockquote>“{c.memory.quote}”</blockquote>
        </div>
      </section>

      <section className="page-section content-shell split-section">
        <div>
          <p className="eyebrow">{c.purpose.eyebrow}</p>
          <h2>{c.purpose.title}</h2>
        </div>
        <div className="split-copy">
          {c.purpose.body.map((paragraph) => <p className="section-copy" key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="page-section content-shell">
        <div className="section-title">
          <p className="eyebrow">{c.structure.eyebrow}</p>
          <h2>{c.structure.title}</h2>
          <p className="section-description">{c.structure.description}</p>
        </div>
        <div className="archive-list">
          {t.chronicles.map(([title, description]) => (
            <article className="archive-item" key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <div className="empty-state">
          <p><strong>{c.statusLabel}</strong> {c.status}</p>
        </div>
      </section>

      <section className="closing-section content-shell">
        <p className="eyebrow">{c.closing.eyebrow}</p>
        <h2>{c.closing.title}</h2>
        <p>{c.closing.text}</p>
      </section>
    </>
  );
}
