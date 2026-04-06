'use client';

import { useMemo, useState } from 'react';

type Testimonial = {
  id: string;
  quote: string;
  author: string;
  company: string;
};

type TestimonialsGridProps = {
  title: string;
  loadMoreLabel: string;
  testimonials: Testimonial[];
};

export default function TestimonialsGrid({
  title,
  loadMoreLabel,
  testimonials,
}: TestimonialsGridProps) {
  const [showAllMobile, setShowAllMobile] = useState(false);
  const halfCount = useMemo(
    () => Math.max(1, Math.ceil(testimonials.length / 2)),
    [testimonials.length]
  );

  return (
    <section className="border-t border-border bg-muted py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl font-semibold text-foreground sm:text-2xl">{title}</h2>
        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-3 sm:gap-8">
          {testimonials.map((item, idx) => {
            const hiddenOnMobile = !showAllMobile && idx >= halfCount;
            return (
              <blockquote
                key={item.id}
                className={`${
                  hiddenOnMobile ? 'hidden sm:flex' : 'flex'
                } h-full flex-col rounded-xl border border-border bg-surface p-4 shadow-lg sm:p-6`}
              >
                <p className="text-sm text-muted-foreground sm:text-base">&ldquo;{item.quote}&rdquo;</p>
                <footer className="mt-auto self-end pt-4 text-right text-xs font-medium text-foreground sm:pt-6 sm:text-sm">
                  — {item.author}, {item.company}
                </footer>
              </blockquote>
            );
          })}
        </div>

        {!showAllMobile && testimonials.length > halfCount && (
          <div className="mt-6 text-center sm:hidden">
            <button
              type="button"
              onClick={() => setShowAllMobile(true)}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition hover:bg-white"
            >
              {loadMoreLabel}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
