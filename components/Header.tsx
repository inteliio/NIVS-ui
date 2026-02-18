'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

const LOCALES = [
  { code: 'en' as const, label: 'EN' },
  { code: 'al' as const, label: 'AL' },
  { code: 'mk' as const, label: 'MK' },
] as const;

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-gray-900">
          NIVS Group
        </Link>
        <nav className="flex items-center gap-6" aria-label="Main navigation">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            {t('home')}
          </Link>
          <Link
            href="/proizvodi"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            {t('products')}
          </Link>
          <Link
            href="/za-nas"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            {t('about')}
          </Link>
          <Link
            href="/kontakt"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            {t('contact')}
          </Link>
          <Link
            href="/cpp"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            {t('faq')}
          </Link>
          <div className="ml-2 flex items-center gap-1 border-l border-gray-200 pl-4">
            {LOCALES.map(({ code, label }) => (
              <Link
                key={code}
                href={pathname}
                locale={code}
                className={`rounded px-2 py-1 text-sm font-medium transition ${
                  locale === code
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}
                aria-label={`Switch to ${label}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
