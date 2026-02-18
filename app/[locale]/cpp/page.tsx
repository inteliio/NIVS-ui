import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import FAQAccordion from '@/components/FAQAccordion';
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
    question: t(item.questionKey as 'q1' | 'q2' | 'q3'),
    answer: t(item.answerKey as 'a1' | 'a2' | 'a3'),
  }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:mb-8 sm:text-3xl">{t('title')}</h1>
      <FAQAccordion items={items} />
    </div>
  );
}
