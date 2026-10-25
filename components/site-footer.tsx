import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import type { Dictionary } from "@/lib/dictionaries";
import { siteMotto } from "@/lib/seo";
import type { NavigationLink } from "@/lib/site-content";

export function SiteFooter({ t, navigation }: { t: Dictionary; navigation: NavigationLink[] }) {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <BrandMark ariaLabel={t.ui.homeAria} className="footer-brand" />
          <p className="footer-motto">{siteMotto}</p>
        </div>
        <nav className="footer-navigation" aria-label={t.ui.footerNav}>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
          <Link href="/privacy">{t.ui.privacy}</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Valmont Family</span>
        <span>{t.ui.footerTagline}</span>
      </div>
    </footer>
  );
}
