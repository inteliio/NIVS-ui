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
    <section className="border-b border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-900">{t('aboutTitle')}</h2>
        <p className="mt-4 text-gray-600">{t('aboutShort')}</p>
        <Link
          href="/za-nas"
          className="mt-6 inline-block font-medium text-gray-900 underline decoration-gray-400 underline-offset-4 transition hover:decoration-gray-900"
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
    <section className="border-y border-gray-200 bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STATS.map(({ key, value }) => (
            <div key={key} className="text-center">
              <p className="text-3xl font-bold text-gray-900 sm:text-4xl">{value}</p>
              <p className="mt-1 text-sm font-medium text-gray-600">{t(key)}</p>
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
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-semibold text-gray-900">{t('partners')}</h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
          {partners.map((p) => (
            <div
              key={p.name}
              className="flex h-16 w-32 items-center justify-center rounded-lg bg-gray-100 p-2"
            >
              <span className="text-sm font-medium text-gray-600">{p.name}</span>
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
    <section className="border-t border-gray-200 bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-semibold text-gray-900">{t('testimonials')}</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote
              key={item.id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <p className="text-gray-700">&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-4 text-sm font-medium text-gray-900">
                — {item.author}, {item.company}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
