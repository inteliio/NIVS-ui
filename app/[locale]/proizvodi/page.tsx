import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import BrandCard from '@/components/BrandCard';
import brandsData from '@/data/brands.json';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'al' }, { locale: 'mk' }];
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('products');
  const brands = brandsData as { id: string; name: string; slug: string; logo: string }[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">{t('title')}</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} locale={locale} />
        ))}
      </div>
    </div>
  );
}
