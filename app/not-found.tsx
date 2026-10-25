import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary();
  return { title: t.notFound.title, robots: { index: false, follow: true } };
}

export default async function NotFound() {
  const { t } = await getDictionary();
  const n = t.notFound;

  return (
    <section className="closing-section content-shell">
      <p className="eyebrow">{n.eyebrow}</p>
      <h1>{n.title}</h1>
      <p>{n.description}</p>
      <div className="hero-actions">
        <Link className="text-link" href="/">{n.cta}</Link>
      </div>
    </section>
  );
}
