"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  Building2,
  ChevronRight,
  HelpCircle,
  Home,
  LayoutGrid,
  Mail,
  Menu,
  X,
} from "lucide-react";

const LOCALES = [
  { code: "en" as const, label: "EN" },
  { code: "al" as const, label: "AL" },
  { code: "mk" as const, label: "MK" },
] as const;

const navLinks = [
  { href: "/", key: "home" as const, icon: Home },
  { href: "/proizvodi", key: "products" as const, icon: LayoutGrid },
  { href: "/za-nas", key: "about" as const, icon: Building2 },
  { href: "/kontakt", key: "contact" as const, icon: Mail },
  { href: "/cpp", key: "faq" as const, icon: HelpCircle },
] as const;

const MENU_ANIM_MS = 320;

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuRendered, setMenuRendered] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const closeMenu = useCallback(() => {
    setMenuActive(false);
    window.setTimeout(() => {
      setMobileOpen(false);
      setMenuRendered(false);
    }, MENU_ANIM_MS);
  }, []);

  const openMenu = useCallback(() => {
    setMobileOpen(true);
    setMenuRendered(true);
    setMenuActive(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setMenuActive(true));
    });
  }, []);

  useEffect(() => {
    if (!menuRendered) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuRendered]);

  useEffect(() => {
    if (!menuRendered || !menuActive) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuRendered, menuActive, closeMenu]);

  const toggleMobile = () => {
    if (!mobileOpen) openMenu();
    else closeMenu();
  };

  const mobileMenu = menuRendered && (
    <>
      <div
        className={`fixed inset-x-0 top-14 z-[100] h-[calc(100dvh-3.5rem)] bg-nivs-navy-deep/55 backdrop-blur-md transition-opacity duration-300 ease-out md:hidden ${
          menuActive ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
        onClick={closeMenu}
      />
      <nav
        className={`fixed bottom-0 right-0 top-14 z-[110] flex w-[min(20rem,85vw)] max-w-full flex-col border-l border-white/10 bg-gradient-to-b from-white via-white to-muted/40 shadow-[-12px_0_48px_rgba(26,53,88,0.18)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          menuActive ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label={t("mainNavigation")}
      >
        <div className="h-1 w-full shrink-0 bg-gradient-to-r from-primary/90 via-nivs-navy-deep to-primary/90" aria-hidden />
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 pb-6 pt-5">
          <div className="flex flex-col gap-1">
            {navLinks.map(({ href, key, icon: Icon }, i) => (
              <Link
                key={key}
                href={href}
                onClick={closeMenu}
                className="mobile-nav-item group flex min-h-[3rem] items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-[15px] font-semibold text-nivs-navy-deep transition active:scale-[0.99] hover:bg-primary/10 hover:text-nivs-navy-mid"
                style={{ animationDelay: menuActive ? `${70 + i * 52}ms` : "0ms" }}
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-nivs-navy-deep/8 text-nivs-navy-deep ring-1 ring-nivs-navy-deep/10 transition group-hover:bg-primary/15 group-hover:ring-primary/25">
                    <Icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={2} aria-hidden />
                  </span>
                  {t(key)}
                </span>
                <ChevronRight
                  className="h-4 w-4 shrink-0 text-muted-foreground/70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden
                />
              </Link>
            ))}
          </div>

          <div className="mt-6 border-t border-border/80 pt-5">
            <p className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t("language")}</p>
            <div className="flex gap-2">
              {LOCALES.map(({ code, label }, j) => (
                <Link
                  key={code}
                  href={pathname}
                  locale={code}
                  onClick={closeMenu}
                  className={`mobile-nav-item min-h-[2.75rem] flex-1 rounded-full px-3 py-2.5 text-center text-sm font-semibold shadow-sm transition ring-1 ${
                    locale === code
                      ? "bg-nivs-navy-deep text-white ring-nivs-navy-deep"
                      : "bg-muted/80 text-surface-foreground ring-border/60 hover:bg-muted hover:ring-nivs-navy-deep/20"
                  }`}
                  style={{ animationDelay: menuActive ? `${70 + navLinks.length * 52 + 40 + j * 36}ms` : "0ms" }}
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
    <header
      className={
        isHome
          ? "sticky top-0 z-[120] border-b border-white/20 bg-black/15 backdrop-blur-md md:z-50"
          : "sticky top-0 z-[120] border-b border-header-border bg-header md:z-50"
      }
    >
      <div className="mx-auto flex h-14 min-h-[3.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo/nivsGroupLogovg.svg"
            alt="NIVS Group"
            width={150}
            height={40}
            className="h-8 w-auto object-contain sm:h-9"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 md:flex lg:gap-6" aria-label={t("mainNavigation")}>
          {navLinks.map(({ href, key }) => (
            <Link key={key} href={href} className="text-sm font-medium text-white">
              {t(key)}
            </Link>
          ))}
          <div className="ml-1 flex items-center gap-0.5 border-l border-header-border pl-4">
            {LOCALES.map(({ code, label }) => (
              <Link
                key={code}
                href={pathname}
                locale={code}
                className={`rounded px-2 py-1.5 text-sm font-medium transition ${
                  locale === code ? "text-white underline decoration-white underline-offset-4" : "text-white hover:bg-white/10"
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
          onClick={toggleMobile}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white transition hover:bg-white/10 active:scale-95 md:hidden"
          aria-expanded={Boolean(mobileOpen && menuRendered)}
          aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
        >
          <span
            className={`transition duration-300 ease-out ${mobileOpen ? "pointer-events-none scale-75 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`}
          >
            <Menu className="absolute h-6 w-6" aria-hidden />
          </span>
          <span
            className={`transition duration-300 ease-out ${mobileOpen ? "scale-100 rotate-0 opacity-100" : "pointer-events-none scale-75 -rotate-90 opacity-0"}`}
          >
            <X className="absolute h-6 w-6" aria-hidden />
          </span>
        </button>
      </div>

      {mounted && mobileMenu && createPortal(mobileMenu, document.body)}
    </header>
  );
}
