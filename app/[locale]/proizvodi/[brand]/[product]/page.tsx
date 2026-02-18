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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/proizvodi" className="hover:text-gray-900">
          {t('title')}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/proizvodi/${brandSlug}`} className="hover:text-gray-900">
          {brand.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery images={images} />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          {product.description && (
            <p className="mt-4 text-gray-600">{product.description}</p>
          )}
          {nutrition.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Nutritional values
              </h2>
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">
                      Per {nutrition[0]?.per ?? '100g'}
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-right text-sm font-medium text-gray-900">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {nutrition.map((row) => (
                    <tr key={row.label} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                        {row.label}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-right text-sm text-gray-700">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
