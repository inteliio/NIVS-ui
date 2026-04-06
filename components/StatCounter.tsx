'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type StatCounterProps = {
  value: string;
  durationMs?: number;
};

function parseValue(input: string) {
  const match = input.match(/^(\d+)(.*)$/);
  if (!match) {
    return { target: 0, suffix: input };
  }
  return {
    target: Number(match[1]),
    suffix: match[2] ?? '',
  };
}

export default function StatCounter({ value, durationMs = 1200 }: StatCounterProps) {
  const { target, suffix } = useMemo(() => parseValue(value), [value]);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const rootRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || target <= 0) {
      if (started && target <= 0) setCount(target);
      return;
    }

    let rafId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [started, target, durationMs]);

  return (
    <span ref={rootRef}>
      {target > 0 ? count : value}
      {target > 0 ? suffix : ''}
    </span>
  );
}
