'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-4" aria-label="Footer navigation">
            <Link
              href="/"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              {t('home')}
            </Link>
            <Link
              href="/proizvodi"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              {t('products')}
            </Link>
            <Link
              href="/za-nas"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              {t('about')}
            </Link>
            <Link
              href="/kontakt"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              {t('contact')}
            </Link>
            <Link
              href="/cpp"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              {t('faq')}
            </Link>
          </nav>
          <p className="text-sm text-gray-500">
            {tFooter('copyright', { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
