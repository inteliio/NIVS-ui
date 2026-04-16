import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import BrandCard from '@/components/BrandCard';
import DownloadCatalogueButton from '@/components/DownloadCatalogueButton';
import PageTitleAccent from '@/components/PageTitleAccent';
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div>
          <PageTitleAccent />
          <h1 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">{t('title')}</h1>
        </div>
        <DownloadCatalogueButton />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {brands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} locale={locale} />
        ))}
      </div>
    </div>
  );
}
