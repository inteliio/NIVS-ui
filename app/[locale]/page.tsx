import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import HeroSlider from '@/components/HeroSlider';
import brandsData from '@/data/brands.json';
import testimonialsData from '@/data/testimonials.json';

const STATS = [
  { key: 'clients' as const, value: '100+' },
  { key: 'products' as const, value: '500+' },
  { key: 'years' as const, value: '15+' },
];

const HERO_SLIDES = [
  { src: '/images/placeholder.svg', alt: 'NIVS Group' },
  { src: '/images/placeholder.svg', alt: 'Distribution' },
  { src: '/images/placeholder.svg', alt: 'Partners' },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSlider slides={HERO_SLIDES} />
      <AboutSection />
      <StatsSection />
      <PartnersSection />
      <TestimonialsSection />
    </>
  );
}

async function AboutSection() {
  const t = await getTranslations('home');
  return (
    <section className="border-b border-gray-200 bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">{t('aboutTitle')}</h2>
        <p className="mt-3 text-sm text-gray-600 sm:mt-4 sm:text-base">{t('aboutShort')}</p>
        <Link
          href="/za-nas"
          className="mt-4 inline-block font-medium text-gray-900 underline decoration-gray-400 underline-offset-4 transition hover:decoration-gray-900 sm:mt-6"
        >
          {t('aboutLink')}
        </Link>
      </div>
    </section>
  );
}

async function StatsSection() {
  const t = await getTranslations('home.stats');
  return (
    <section className="border-y border-gray-200 bg-gray-50 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {STATS.map(({ key, value }) => (
            <div key={key} className="text-center">
              <p className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">{value}</p>
              <p className="mt-1 text-xs font-medium text-gray-600 sm:text-sm">{t(key)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

async function PartnersSection() {
  const t = await getTranslations('home');
  const partners = brandsData.slice(0, 6).map((b) => ({ logo: b.logo, name: b.name }));
  return (
    <section className="py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl font-semibold text-gray-900 sm:text-2xl">{t('partners')}</h2>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:mt-8 sm:gap-8">
          {partners.map((p) => (
            <div
              key={p.name}
              className="flex h-14 w-24 items-center justify-center rounded-lg bg-gray-100 p-2 sm:h-16 sm:w-32"
            >
              <span className="truncate text-xs font-medium text-gray-600 sm:text-sm">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

async function TestimonialsSection() {
  const t = await getTranslations('home');
  const testimonials = testimonialsData as { id: string; quote: string; author: string; company: string }[];
  return (
    <section className="border-t border-gray-200 bg-gray-50 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl font-semibold text-gray-900 sm:text-2xl">{t('testimonials')}</h2>
        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-3 sm:gap-8">
          {testimonials.map((item) => (
            <blockquote
              key={item.id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
            >
              <p className="text-sm text-gray-700 sm:text-base">&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-3 text-xs font-medium text-gray-900 sm:mt-4 sm:text-sm">
                — {item.author}, {item.company}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
