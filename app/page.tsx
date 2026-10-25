import type { CSSProperties } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SectionTitle } from "@/components/section-title";
import { getDictionary } from "@/lib/i18n";
import { siteMotto, siteName, webPageJsonLd } from "@/lib/seo";

const reveal = (delay: number) => ({ "--reveal-delay": `${delay}ms` }) as CSSProperties;

export default async function HomePage() {
  const { locale, t } = await getDictionary();
  const { hero, philosophy, firstLaw, standard, closing } = t.home;

  return (
    <>
      <JsonLd data={webPageJsonLd({ title: `${siteName} | ${t.site.alternateName}`, description: t.site.description, path: "/", locale, t })} />
      <section className="home-hero content-shell" aria-labelledby="hero-title">
        <div className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow hero-reveal" style={reveal(80)}>{hero.eyebrow}</p>
            <h1 id="hero-title" className="hero-title hero-reveal" style={reveal(160)}>{hero.title}</h1>
            <p className="hero-motto hero-reveal" lang="en" style={reveal(280)}>{siteMotto}</p>
            <p className="hero-statement hero-reveal" style={reveal(380)}>{hero.statement}</p>
            <div className="hero-actions hero-reveal" style={reveal(480)}>
              <Link className="text-link" href="/family">{hero.ctaFamily}</Link>
            </div>
          </div>

          <figure className="hero-figure">
            <svg className="hero-rings" viewBox="0 0 400 400" role="img" aria-labelledby="hero-rings-title">
              <title id="hero-rings-title">{hero.ringsTitle}</title>
              <circle className="ring ring-orbit" cx="200" cy="200" r="194" />
              <circle className="ring ring-outer" cx="200" cy="200" r="162" pathLength="1" />
              <circle className="ring ring-middle" cx="200" cy="200" r="112" pathLength="1" />
              <circle className="ring ring-inner" cx="200" cy="200" r="62" pathLength="1" />
              <circle className="ring-core" cx="200" cy="200" r="4" />
              <text className="ring-label" x="200" y="42">{hero.rings[0]}</text>
              <text className="ring-label" x="200" y="92">{hero.rings[1]}</text>
              <text className="ring-label" x="200" y="142">{hero.rings[2]}</text>
            </svg>
            <figcaption>{hero.caption}</figcaption>
          </figure>
        </div>

        <ul className="hero-principles" aria-label={hero.principlesAria}>
          {hero.principles.map(([title, description]) => (
            <li key={title}>
              <span>{title}</span>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-section content-shell split-section">
        <SectionTitle eyebrow={philosophy.eyebrow} title={philosophy.title} />
        <div className="split-copy">
          {philosophy.body.map((paragraph) => <p className="section-copy" key={paragraph}>{paragraph}</p>)}
          <Link className="inline-link" href="/family">{philosophy.link}</Link>
        </div>
      </section>

      <section className="home-section first-law">
        <div className="content-shell">
          <p className="eyebrow">{firstLaw.eyebrow}</p>
          <blockquote>“{firstLaw.quote}”</blockquote>
          <p className="law-note">{firstLaw.note}</p>
        </div>
      </section>

      <section className="home-section content-shell">
        <SectionTitle eyebrow={standard.eyebrow} title={standard.title} description={standard.description} />
        <div className="standard-list">
          {t.standards.map(([title, description]) => (
            <article className="standard-row" key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-section content-shell">
        <p className="eyebrow">{closing.eyebrow}</p>
        <h2>{closing.title}</h2>
        <p>{closing.text}</p>
        <div className="hero-actions">
          <Link className="text-link" href="/chronicle">{closing.cta}</Link>
        </div>
      </section>
    </>
  );
}
