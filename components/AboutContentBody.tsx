import type { ReactNode } from 'react';

/**
 * Renders about copy: one paragraph per non-empty line, and lines starting with ●/•/- as a list.
 */
export default function AboutContentBody({ text }: { text: string }) {
  const rawLines = text.split('\n');
  const nodes: ReactNode[] = [];
  let listBuf: string[] = [];
  let k = 0;

  const flushList = () => {
    if (listBuf.length === 0) return;
    nodes.push(
      <ul key={`ul-${k++}`} className="my-5 space-y-2 border-l border-primary/25 pl-4 sm:my-6">
        {listBuf.map((item, i) => (
          <li key={i} className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            {item}
          </li>
        ))}
      </ul>
    );
    listBuf = [];
  };

  for (const line of rawLines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const isBullet = /^[●•]/.test(trimmed) || /^-\s+\S/.test(trimmed);
    if (isBullet) {
      const cleaned = trimmed.replace(/^[●•]\s*/, '').replace(/^-\s+/, '');
      listBuf.push(cleaned);
    } else {
      flushList();
      nodes.push(
        <p key={`p-${k++}`} className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          {trimmed}
        </p>
      );
    }
  }
  flushList();

  return <div className="space-y-3 sm:space-y-4">{nodes}</div>;
}
