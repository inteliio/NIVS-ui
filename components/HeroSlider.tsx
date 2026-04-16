"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Slide = { src: string; alt: string; type?: "image" | "video" };

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const t = useTranslations("home");
  const [index, setIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const id = setInterval(goNext, 10000);
    return () => clearInterval(id);
  }, [goNext]);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        video.currentTime = 0;
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [index]);

  if (!slides.length) return null;

  return (
    <section className="relative h-[68dvh] min-h-[300px] w-full overflow-hidden bg-muted sm:h-[100dvh] sm:min-h-[420px] md:min-h-[520px] lg:min-h-[620px]">
      {slides.map((slide, i) => (
        <div key={slide.src} className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ${i === index ? "z-10 opacity-100" : "z-0 opacity-0"}`}>
          {slide.type === "video" ? (
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={slide.src}
              className="hero-media h-full w-full object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
              preload={i === 0 ? "auto" : "metadata"}
              aria-label={slide.alt}
            />
          ) : (
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="hero-media object-cover object-center"
              sizes="100vw"
              priority={i === 0}
            />
          )}
        </div>
      ))}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-3 bg-gradient-to-t from-black/50 via-black/20 to-transparent px-4 pb-4 pt-14 sm:gap-4 sm:pb-6 sm:pt-20">
        <Link
          href="/proizvodi"
          className="pointer-events-auto inline-flex min-h-[2.75rem] items-center justify-center rounded-lg bg-nivs-navy-deep px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/25 ring-1 ring-white/15 transition hover:bg-nivs-navy-mid sm:px-7 sm:text-base"
        >
          {t("heroSeeMore")}
        </Link>
        <div className="pointer-events-auto flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors touch-manipulation sm:h-2 sm:w-2 ${i === index ? "bg-primary" : "bg-primary/50 hover:bg-primary/75"}`}
              aria-label={t("heroSlideGoTo", { n: i + 1 })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
