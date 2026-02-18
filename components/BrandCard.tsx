import Image from 'next/image';
import { Link } from '@/i18n/navigation';

type Brand = { id: string; name: string; slug: string; logo: string };

export default function BrandCard({ brand, locale }: { brand: Brand; locale: string }) {
  return (
    <Link
      href={`/proizvodi/${brand.slug}`}
      className="group flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-gray-300 hover:shadow-md"
    >
      <div className="relative h-24 w-32 overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={brand.logo}
          alt={brand.name}
          fill
          className="object-contain p-2 transition group-hover:scale-105"
          sizes="128px"
        />
      </div>
      <span className="text-center font-medium text-gray-900">{brand.name}</span>
    </Link>
  );
}
