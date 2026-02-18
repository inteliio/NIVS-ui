import Image from 'next/image';
import { Link } from '@/i18n/navigation';

type Brand = { id: string; name: string; slug: string; logo: string };

export default function BrandCard({ brand, locale }: { brand: Brand; locale: string }) {
  return (
    <Link
      href={`/proizvodi/${brand.slug}`}
      className="group flex min-h-[7rem] flex-col items-center justify-center gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm transition hover:border-foreground/20 hover:shadow-md active:bg-muted sm:min-h-0 sm:gap-4 sm:p-6"
    >
      <div className="relative h-20 w-24 overflow-hidden rounded-lg bg-muted sm:h-24 sm:w-32">
        <Image
          src={brand.logo}
          alt={brand.name}
          fill
          className="object-contain p-2 transition group-hover:scale-105"
          sizes="128px"
        />
      </div>
      <span className="text-center text-sm font-medium text-surface-foreground sm:text-base">{brand.name}</span>
    </Link>
  );
}
