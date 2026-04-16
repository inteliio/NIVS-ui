import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import AboutContentBody from '@/components/AboutContentBody';
import PageTitleAccent from '@/components/PageTitleAccent';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'al' }, { locale: 'mk' }];
}

const cardClass =
  'rounded-xl border border-border/40 bg-surface p-6 sm:p-8 lg:p-9';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <header className="mb-8 sm:mb-10">
        <PageTitleAccent />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t('title')}</h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">{t('lead')}</p>
      </header>

      <div className={cardClass}>
        <AboutContentBody text={t('content')} />
      </div>

      <div className="mt-8 flex flex-col items-start gap-3 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="text-sm text-muted-foreground sm:text-base">{t('ctaPrompt')}</p>
        <Link
          href="/kontakt"
          className="inline-flex min-h-[2.75rem] shrink-0 items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
        >
          {t('cta')}
        </Link>
      </div>
    </div>
  );
}
