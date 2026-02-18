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
            className="overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-gray-900 transition hover:bg-gray-50"
              aria-expanded={isOpen}
            >
              {item.question}
              <span
                className={`ml-2 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              >
                ▼
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-gray-200 px-4 py-3 text-gray-600">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
