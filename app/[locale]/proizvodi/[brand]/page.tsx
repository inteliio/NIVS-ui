import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import ProductCard from '@/components/ProductCard';
import brandsData from '@/data/brands.json';
import productsData from '@/data/products.json';

const brands = brandsData as { id: string; name: string; slug: string }[];
const productsByBrand = productsData as Record<string, { id: string; name: string; slug: string; description?: string; images: string[] }[]>;

export function generateStaticParams() {
  const locales = ['en', 'al', 'mk'] as const;
  return locales.flatMap((locale) =>
    brands.map((b) => ({ locale, brand: b.slug }))
  );
}

export default async function BrandProductsPage({
  params,
}: {
  params: Promise<{ locale: string; brand: string }>;
}) {
  const { locale, brand: brandSlug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('products');

  const brand = brands.find((b) => b.slug === brandSlug);
  if (!brand) notFound();

  const products = productsByBrand[brandSlug] ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <nav className="mb-4 flex flex-wrap items-center gap-x-2 text-sm text-gray-500 sm:mb-6">
        <Link href="/proizvodi" className="hover:text-gray-900">
          {t('title')}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{brand.name}</span>
      </nav>
      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:mb-8 sm:text-3xl">{brand.name}</h1>
      {products.length === 0 ? (
        <p className="text-sm text-gray-500 sm:text-base">No products for this brand yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              brandSlug={brandSlug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
