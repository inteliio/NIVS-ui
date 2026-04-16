'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import contactData from '@/data/contact.json';

export default function Footer() {
  const t = useTranslations('nav');
  const tHome = useTranslations('home');
  const tContact = useTranslations('contact');
  const tFooter = useTranslations('footer');
  const year = new Date().getFullYear();
  const contacts = contactData as {
    id: string;
    nameKey: 'marketing' | 'sales' | 'logistics';
    email: string;
    phone: string;
  }[];

  return (
    <footer className="border-t border-header-border bg-header text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          <div className="space-y-3">
            <Image
              src="/logo/nivsGroupLogovg.svg"
              alt="NIVS Group"
              width={110}
              height={110}
              className="h-14 w-auto object-contain"
            />
            <p className="text-sm text-white/85">{tHome('subtitle')}</p>
            <p className="text-xs text-white/70">
              {tFooter('copyright', { year })} Powered by{' '}
              <a
                href="https://inteliio.com/"
                target="_blank"
                rel="noreferrer"
                className="text-white/85 underline decoration-white/40 underline-offset-2 transition hover:text-white hover:decoration-white"
              >
                Inteliio
              </a>
              .
            </p>
          </div>

          <nav className="flex flex-col gap-2" aria-label="Footer navigation">
            <span className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/70">
              Pages
            </span>
            <Link href="/" className="text-sm text-white/85 transition hover:text-white">
              {t('home')}
            </Link>
            <Link href="/proizvodi" className="text-sm text-white/85 transition hover:text-white">
              {t('products')}
            </Link>
            <Link href="/za-nas" className="text-sm text-white/85 transition hover:text-white">
              {t('about')}
            </Link>
            <Link href="/kontakt" className="text-sm text-white/85 transition hover:text-white">
              {t('contact')}
            </Link>
            <Link href="/cpp" className="text-sm text-white/85 transition hover:text-white">
              {t('faq')}
            </Link>
          </nav>

          <div className="flex flex-col gap-3">
            <span className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/70">
              {tContact('title')}
            </span>
            {contacts.map((item) => (
              <div key={item.id} className="space-y-0.5">
                <p className="text-sm font-medium text-white">{tContact(item.nameKey)}</p>
                <a
                  href={`mailto:${item.email}`}
                  className="block text-xs text-white/80 transition hover:text-white"
                >
                  {item.email}
                </a>
                <a
                  href={`tel:${item.phone.replace(/\s+/g, '')}`}
                  className="block text-xs text-white/80 transition hover:text-white"
                >
                  {item.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
