import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import ProductGallery from '@/components/ProductGallery';
import brandsData from '@/data/brands.json';
import productsData from '@/data/products.json';

const brands = brandsData as { id: string; name: string; slug: string }[];
const productsByBrand = productsData as Record<
  string,
  {
    id: string;
    name: string;
    slug: string;
    description?: string;
    images: string[];
    nutrition?: { label: string; value: string; per: string }[];
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
        <span className="truncate text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <ProductGallery images={images} />
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{product.name}</h1>
          {product.description && (
            <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">{product.description}</p>
          )}
          {nutrition.length > 0 && (
            <div className="mt-6 sm:mt-8">
              <h2 className="mb-3 text-base font-semibold text-foreground sm:mb-4 sm:text-lg">
                Nutritional values
              </h2>
              <div className="overflow-x-auto">
              <table className="w-full min-w-[240px] border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border px-4 py-2 text-left text-sm font-medium text-foreground">
                      Per {nutrition[0]?.per ?? '100g'}
                    </th>
                    <th className="border border-border px-4 py-2 text-right text-sm font-medium text-foreground">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {nutrition.map((row) => (
                    <tr key={row.label} className="hover:bg-muted">
                      <td className="border border-border px-4 py-2 text-sm text-surface-foreground">
                        {row.label}
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
