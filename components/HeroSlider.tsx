"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Slide = { src: string; alt: string; type?: "image" | "video" };

export default function HeroSlider({ slides }: { slides: Slide[] }) {
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
    <section className="relative aspect-video w-full overflow-hidden bg-muted sm:aspect-auto sm:h-[100dvh] sm:min-h-[420px] md:min-h-[520px] lg:min-h-[620px]">
      {slides.map((slide, i) => (
        <div key={slide.src} className={`absolute inset-0 transition-opacity duration-500 ${i === index ? "z-10 opacity-100" : "z-0 opacity-0"}`}>
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
      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-4">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`h-2.5 w-2.5 rounded-full transition-colors touch-manipulation sm:h-2 sm:w-2 ${i === index ? "bg-primary" : "bg-primary/50 hover:bg-primary/75"}`} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}
