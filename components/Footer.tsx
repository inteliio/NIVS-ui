'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight, MapPin, Phone } from 'lucide-react';

const PHONE_HREFS = {
  finance: '+38970306106',
  commerce: '+38970228220',
  offers: '+38970228218',
} as const;

const navItems = [
  { href: '/' as const, key: 'home' as const },
  { href: '/proizvodi' as const, key: 'products' as const },
  { href: '/za-nas' as const, key: 'about' as const },
  { href: '/kontakt' as const, key: 'contact' as const },
  { href: '/cpp' as const, key: 'faq' as const },
];

export default function Footer() {
  const t = useTranslations('nav');
  const tHome = useTranslations('home');
  const tContact = useTranslations('contact');
  const tFooter = useTranslations('footer');
  const year = new Date().getFullYear();

  const phoneRows = [
    { labelKey: 'phoneLabelFinance' as const, display: tContact('phoneDisplayFinance'), href: PHONE_HREFS.finance },
    { labelKey: 'phoneLabelCommerce' as const, display: tContact('phoneDisplayCommerce'), href: PHONE_HREFS.commerce },
    { labelKey: 'phoneLabelOffers' as const, display: tContact('phoneDisplayOffers'), href: PHONE_HREFS.offers },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-nivs-navy-mid text-white">
      {/* Ambient accents */}
      <div
        className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-primary/15 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#2c4f7c]/80 blur-[90px]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Brand */}
          <div className="flex flex-col justify-between gap-8 lg:col-span-5">
            <div className="space-y-5">
              <div className="relative inline-block">
                <span className="absolute -bottom-1 left-0 h-1 w-12 rounded-full bg-primary/90" aria-hidden />
                <Image
                  src="/logo/nivsGroupLogovg.svg"
                  alt="NIVS Group"
                  width={140}
                  height={140}
                  className="relative h-16 w-auto object-contain drop-shadow-sm sm:h-[4.25rem]"
                />
              </div>
              <p className="max-w-sm text-[15px] leading-relaxed text-white/88">{tHome('subtitle')}</p>
            </div>
          </div>

          {/* Quick links */}
          <nav className="lg:col-span-3" aria-label="Footer navigation">
            <h2 className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
              <span className="h-px w-6 bg-primary/70" aria-hidden />
              {tFooter('quickLinks')}
            </h2>
            <ul className="flex flex-col gap-1">
              {navItems.map(({ href, key }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[15px] text-white/88 transition hover:bg-white/[0.07] hover:text-white"
                  >
                    <span>{t(key)}</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact card */}
          <div className="lg:col-span-4">
            <h2 className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
              <span className="h-px w-6 bg-primary/70" aria-hidden />
              {tContact('title')}
            </h2>
            <div className="rounded-2xl border border-white/[0.12] bg-gradient-to-br from-white/[0.09] to-white/[0.02] p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md sm:p-6">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/20 ring-1 ring-primary/30">
                  <MapPin className="h-5 w-5 text-primary" strokeWidth={2} aria-hidden />
                </div>
                <div className="min-w-0 space-y-1 pt-0.5">
                  <p className="text-base font-semibold tracking-tight text-white">
                    {tContact('companyLine')}
                    <span className="font-normal text-white/60"> · </span>
                    {tContact('companyCity')}
                  </p>
                  <p className="text-sm leading-relaxed text-white/72">{tContact('addressRegisteredLine')}</p>
                </div>
              </div>

              <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                {phoneRows.map((row) => (
                  <li key={row.labelKey}>
                    <a
                      href={`tel:${row.href}`}
                      className="group flex items-start gap-3 rounded-xl p-2 transition hover:bg-white/[0.06]"
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] ring-1 ring-white/10 transition group-hover:bg-primary/15 group-hover:ring-primary/25">
                        <Phone className="h-3.5 w-3.5 text-primary" strokeWidth={2.25} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-medium uppercase tracking-wide text-white/50">
                          {tContact(row.labelKey)}
                        </span>
                        <span className="mt-0.5 block text-[15px] font-medium tabular-nums tracking-wide text-white">
                          {row.display}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="text-xs leading-relaxed text-white/55">{tFooter('copyright', { year })}</p>
          <p className="text-xs text-white/50">
            {tFooter('poweredBy')}{' '}
            <a
              href="https://inteliio.com/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-white/75 underline decoration-white/25 underline-offset-2 transition hover:text-white hover:decoration-white/60"
            >
              Inteliio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
