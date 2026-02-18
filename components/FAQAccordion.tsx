'use client';

import { useState } from 'react';

type Item = { id: string; question: string; answer: string };

export default function FAQAccordion({ items }: { items: Item[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-lg border border-border bg-surface"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex min-h-[2.75rem] w-full touch-manipulation items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-surface-foreground transition hover:bg-muted sm:text-base"
              aria-expanded={isOpen}
            >
              <span className="min-w-0 flex-1">{item.question}</span>
              <span
                className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden
              >
                ▼
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground sm:text-base">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
