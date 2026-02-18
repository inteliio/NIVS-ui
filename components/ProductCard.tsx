import Image from 'next/image';
import { Link } from '@/i18n/navigation';

type Product = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  images: string[];
};

export default function ProductCard({
  product,
  brandSlug,
}: {
  product: Product;
  brandSlug: string;
}) {
  const image = product.images?.[0] ?? '/images/placeholder.svg';

  return (
    <Link
      href={`/proizvodi/${brandSlug}/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-gray-300 hover:shadow-md"
    >
      <div className="relative aspect-square w-full bg-gray-100">
        <Image
          src={image}
          alt={product.name}
          fill
          className="object-cover transition group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-medium text-gray-900">{product.name}</h3>
        {product.description && (
          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
            {product.description}
          </p>
        )}
      </div>
    </Link>
  );
}
