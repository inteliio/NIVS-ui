import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import ProductGallery from '@/components/ProductGallery';
import PageTitleAccent from '@/components/PageTitleAccent';
import brandsData from '@/data/brands.json';
import productsData from '@/data/products.json';

const brands = brandsData as { id: string; name: string; slug: string }[];
const productsByBrand = productsData as Record<
  string,
  {
    id: string;
    slug: string;
    images: string[];
    nutrition?: { labelKey: string; value: string; perKey: string }[];
  }[]
>;

export function generateStaticParams() {
  const locales = ['en', 'al', 'mk'] as const;
  const params: { locale: string; brand: string; product: string }[] = [];
  for (const locale of locales) {
    for (const brand of brands) {
      const products = productsByBrand[brand.slug] ?? [];
      for (const product of products) {
        params.push({ locale, brand: brand.slug, product: product.slug });
      }
    }
  }
  return params;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; brand: string; product: string }>;
}) {
  const { locale, brand: brandSlug, product: productSlug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('products');

  const brand = brands.find((b) => b.slug === brandSlug);
  if (!brand) notFound();

  const products = productsByBrand[brandSlug] ?? [];
  const product = products.find((p) => p.slug === productSlug);
  if (!product) notFound();

  const images = product.images?.length ? product.images : ['/images/placeholder.svg'];
  const nutrition = product.nutrition ?? [];
  const productName = t(`catalog.${brandSlug}.${productSlug}.name`);
  const productDescription = t(`catalog.${brandSlug}.${productSlug}.description`);
  const perLabel = nutrition[0] ? t(`nutritionPer.${nutrition[0].perKey}`) : '';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <nav className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground sm:mb-6">
        <Link href="/proizvodi" className="hover:text-foreground">
          {t('title')}
        </Link>
        <span>/</span>
        <Link href={`/proizvodi/${brandSlug}`} className="hover:text-foreground">
          {brand.name}
        </Link>
        <span>/</span>
        <span className="truncate text-foreground">{productName}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <ProductGallery images={images} primaryAlt={productName} />
        <div className="min-w-0">
          <PageTitleAccent />
          <h1 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">{productName}</h1>
          {productDescription && (
            <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">{productDescription}</p>
          )}
          <Link
            href="/kontakt"
            className="mt-6 inline-flex min-h-[2.75rem] items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover sm:mt-8"
          >
            {t('requestQuote')}
          </Link>
          {nutrition.length > 0 && (
            <div className="mt-6 sm:mt-8">
              <h2 className="mb-3 text-base font-semibold text-foreground sm:mb-4 sm:text-lg">
                {t('nutritionalValues')}
              </h2>
              <div className="overflow-x-auto">
              <table className="w-full min-w-[240px] border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border px-4 py-2 text-left text-sm font-medium text-foreground">
                      {t('tablePer')} {perLabel}
                    </th>
                    <th className="border border-border px-4 py-2 text-right text-sm font-medium text-foreground">
                      {t('tableValue')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {nutrition.map((row) => (
                    <tr key={row.labelKey} className="hover:bg-muted">
                      <td className="border border-border px-4 py-2 text-sm text-surface-foreground">
                        {t(`nutritionLabels.${row.labelKey}`)}
                      </td>
                      <td className="border border-border px-4 py-2 text-right text-sm text-surface-foreground">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
