"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { setLanguage } from "@/app/actions";
import { localeSettings, locales, type Locale } from "@/lib/i18n-config";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  errorLabel: string;
  pendingLabel: string;
};

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function LanguageSwitcher({ locale, label, errorLabel, pendingLabel }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPending, startTransition] = useTransition();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef<number | null>(null);
  const menuId = useId();

  function focusItem(index: number) {
    menuRef.current?.querySelectorAll("button")[index]?.focus();
  }

  useEffect(() => {
    if (isOpen && pendingFocus.current !== null) {
      focusItem(pendingFocus.current);
      pendingFocus.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    function closeOnOutsidePointer(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setIsOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        event.stopPropagation();
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }
    const root = rootRef.current;
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    root?.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      root?.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  function selectLocale(next: Locale) {
    setIsOpen(false);
    triggerRef.current?.focus();
    if (next === locale) return;
    setHasError(false);
    startTransition(async () => {
      try {
        await setLanguage(next);
      } catch (error) {
        console.error("Language preference could not be saved", error);
        setHasError(true);
      }
    });
  }

  return (
    <div
      className="language-selector"
      ref={rootRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
    >
      <button
        className="language-trigger"
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-busy={isPending}
        disabled={isPending}
        ref={triggerRef}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const index = event.key === "ArrowDown" ? 0 : locales.length - 1;
            if (isOpen) focusItem(index);
            else {
              pendingFocus.current = index;
              setIsOpen(true);
            }
          }
        }}
      >
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
        </svg>
        <span lang="en">{localeSettings[locale].label}</span>
        <svg {...iconProps} className={isOpen ? "language-chevron is-open" : "language-chevron"}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        className={`language-menu${isOpen ? " is-open" : ""}`}
        role="menu"
        aria-label={label}
        id={menuId}
        ref={menuRef}
        inert={!isOpen}
        onKeyDown={(event) => {
          const items = [...(menuRef.current?.querySelectorAll("button") ?? [])];
          const current = items.findIndex((item) => item === event.target);
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            focusItem((current + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length);
          } else if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            focusItem(event.key === "Home" ? 0 : items.length - 1);
          }
        }}
      >
        {locales.map((option) => (
          <button key={option} role="menuitemradio" aria-checked={locale === option} type="button" lang="en" onClick={() => selectLocale(option)}>
            <span>{localeSettings[option].label}</span>
            {locale === option && (
              <svg {...iconProps}>
                <path d="m20 6-11 11-5-5" />
              </svg>
            )}
          </button>
        ))}
      </div>
      {isPending && <span className="sr-only" role="status">{pendingLabel}</span>}
      {hasError && <p className="language-error" role="alert">{errorLabel}</p>}
    </div>
  );
}
