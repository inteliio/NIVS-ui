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
      className="group flex min-h-[12rem] flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition hover:border-foreground/20 hover:shadow-md active:bg-muted"
    >
      <div className="relative aspect-square w-full bg-muted">
        <Image
          src={image}
          alt={product.name}
          fill
          className="object-cover transition group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="font-medium text-surface-foreground line-clamp-2 text-sm sm:text-base">{product.name}</h3>
        {product.description && (
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground sm:text-sm">
            {product.description}
          </p>
        )}
      </div>
    </Link>
  );
}
