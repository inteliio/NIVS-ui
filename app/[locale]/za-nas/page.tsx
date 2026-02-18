import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'al' }, { locale: 'mk' }];
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground sm:mb-8 sm:text-3xl">{t('title')}</h1>
      <div className="prose prose-gray max-w-none prose-p:text-sm sm:prose-p:text-base">
        <p className="whitespace-pre-line text-muted-foreground">{t('content')}</p>
      </div>
    </div>
  );
}
