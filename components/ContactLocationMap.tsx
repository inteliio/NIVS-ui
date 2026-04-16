import { ExternalLink } from 'lucide-react';

type ContactLocationMapProps = {
  embedUrl: string;
  title: string;
  openInMapsUrl: string;
  openInMapsLabel: string;
};

export default function ContactLocationMap({
  embedUrl,
  title,
  openInMapsUrl,
  openInMapsLabel,
}: ContactLocationMapProps) {
  return (
    <div className="mt-4 space-y-2">
      <div className="overflow-hidden rounded-lg border border-border/50 bg-muted/30 shadow-sm">
        <iframe
          src={embedUrl}
          title={title}
          className="block h-36 w-full sm:h-44"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a
        href={openInMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline decoration-border underline-offset-4 transition hover:text-foreground hover:decoration-primary"
      >
        {openInMapsLabel}
        <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
      </a>
    </div>
  );
}
