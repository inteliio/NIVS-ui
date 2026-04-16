import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import FAQAccordion from '@/components/FAQAccordion';
import PageTitleAccent from '@/components/PageTitleAccent';
import faqData from '@/data/faq.json';

const faqItems = faqData as { id: string; questionKey: string; answerKey: string }[];

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'al' }, { locale: 'mk' }];
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('faq');

  const items = faqItems.map((item) => ({
    id: item.id,
    question: t(item.questionKey),
    answer: t(item.answerKey),
  }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header className="mb-6 sm:mb-8">
        <PageTitleAccent />
        <h1 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">{t('title')}</h1>
      </header>
      <FAQAccordion items={items} />
    </div>
  );
}
