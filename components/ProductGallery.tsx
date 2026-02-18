'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images }: { images: string[] }) {
  const [selected, setSelected] = useState(0);
  const list = images.length ? images : ['/images/placeholder.svg'];

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="relative aspect-square w-full min-h-0 overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={list[selected]}
          alt="Product"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      {list.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-2">
          {list.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setSelected(i)}
              className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition touch-manipulation sm:h-16 sm:w-16 ${
                i === selected
                  ? 'border-gray-900'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
