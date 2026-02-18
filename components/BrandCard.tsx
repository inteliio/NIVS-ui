import Image from 'next/image';
import { Link } from '@/i18n/navigation';

type Brand = { id: string; name: string; slug: string; logo: string };

export default function BrandCard({ brand, locale }: { brand: Brand; locale: string }) {
  return (
    <Link
      href={`/proizvodi/${brand.slug}`}
      className="group flex min-h-[7rem] flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow-md active:bg-gray-50 sm:min-h-0 sm:gap-4 sm:p-6"
    >
      <div className="relative h-20 w-24 overflow-hidden rounded-lg bg-gray-100 sm:h-24 sm:w-32">
        <Image
          src={brand.logo}
          alt={brand.name}
          fill
          className="object-contain p-2 transition group-hover:scale-105"
          sizes="128px"
        />
      </div>
      <span className="text-center text-sm font-medium text-gray-900 sm:text-base">{brand.name}</span>
    </Link>
  );
}
