"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Locale } from "@/lib/i18n-config";
import type { NavigationLink } from "@/lib/site-content";

type SiteHeaderProps = {
  locale: Locale;
  navigation: NavigationLink[];
  labels: {
    home: string;
    mainNav: string;
    mobileNav: string;
    openNav: string;
    closeNav: string;
    language: string;
    languagePending: string;
    languageError: string;
  };
};

export function SiteHeader({ locale, navigation, labels }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function closeOnOutsidePointer(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setIsOpen(false);
    }
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [isOpen]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    function closeOnDesktop(event: MediaQueryListEvent) {
      if (event.matches) setIsOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      desktopQuery.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="header-inner">
        <BrandMark ariaLabel={labels.home} onClick={() => setIsOpen(false)} eager />
        <nav className="desktop-navigation" aria-label={labels.mainNav}>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageSwitcher locale={locale} label={labels.language} errorLabel={labels.languageError} pendingLabel={labels.languagePending} />
        </div>
        <button
          className={`menu-toggle${isOpen ? " is-open" : ""}`}
          type="button"
          aria-label={isOpen ? labels.closeNav : labels.openNav}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <nav id="mobile-navigation" className={`mobile-navigation${isOpen ? " is-open" : ""}`} aria-label={labels.mobileNav} inert={!isOpen}>
        <div className="mobile-navigation-clip">
          <div className="navigation-inner">
            <div className="navigation-language" style={{ "--item-delay": "80ms" } as React.CSSProperties}>
              <LanguageSwitcher locale={locale} label={labels.language} errorLabel={labels.languageError} pendingLabel={labels.languagePending} />
            </div>
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                style={{ "--item-delay": `${130 + index * 50}ms` } as React.CSSProperties}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <p className="navigation-note">The Sovereign Creates</p>
          </div>
        </div>
      </nav>
    </header>
  );
}
