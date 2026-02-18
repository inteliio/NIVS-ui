'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Footer navigation">
            <Link
              href="/"
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {t('home')}
            </Link>
            <Link
              href="/proizvodi"
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {t('products')}
            </Link>
            <Link
              href="/za-nas"
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {t('about')}
            </Link>
            <Link
              href="/kontakt"
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {t('contact')}
            </Link>
            <Link
              href="/cpp"
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {t('faq')}
            </Link>
          </nav>
          <p className="text-sm text-muted-foreground">
            {tFooter('copyright', { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
