'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Menu, X } from 'lucide-react';

const LOCALES = [
  { code: 'en' as const, label: 'EN' },
  { code: 'al' as const, label: 'AL' },
  { code: 'mk' as const, label: 'MK' },
] as const;

const navLinks = [
  { href: '/', key: 'home' as const },
  { href: '/proizvodi', key: 'products' as const },
  { href: '/za-nas', key: 'about' as const },
  { href: '/kontakt', key: 'contact' as const },
  { href: '/cpp', key: 'faq' as const },
] as const;

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const mobileMenu = mobileOpen && (
    <>
      <div
        className="fixed inset-0 z-[100] bg-overlay md:hidden"
        aria-hidden
        onClick={() => setMobileOpen(false)}
      />
      <nav
        className="fixed inset-x-0 top-[3.5rem] z-[110] max-h-[calc(100vh-3.5rem)] overflow-y-auto border-b border-border bg-surface px-4 py-4 md:hidden"
        aria-label="Main navigation"
      >
        <div className="flex flex-col gap-1">
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="min-h-[2.75rem] rounded-lg px-3 py-2.5 text-base font-medium text-surface-foreground transition hover:bg-muted"
            >
              {t(key)}
            </Link>
          ))}
          <div className="mt-3 border-t border-border pt-3">
            <span className="mb-2 block px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Language
            </span>
            <div className="flex gap-2">
              {LOCALES.map(({ code, label }) => (
                <Link
                  key={code}
                  href={pathname}
                  locale={code}
                  onClick={() => setMobileOpen(false)}
                  className={`min-h-[2.75rem] flex-1 rounded-lg px-3 py-2.5 text-center text-sm font-medium transition ${
                    locale === code
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-surface-foreground hover:bg-border'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-14 min-h-[3.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 text-lg font-bold text-foreground sm:text-xl">
          NIVS Group
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-5 md:flex lg:gap-6"
          aria-label="Main navigation"
        >
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {t(key)}
            </Link>
          ))}
          <div className="ml-1 flex items-center gap-0.5 border-l border-border pl-4">
            {LOCALES.map(({ code, label }) => (
              <Link
                key={code}
                href={pathname}
                locale={code}
                className={`rounded px-2 py-1.5 text-sm font-medium transition ${
                  locale === code
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
                aria-label={`Switch to ${label}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground md:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav: render in portal so it sits above all page content */}
      {mounted && mobileMenu && createPortal(mobileMenu, document.body)}
    </header>
  );
}
