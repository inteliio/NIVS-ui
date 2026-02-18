import { getTranslations } from 'next-intl/server';
import LoadingSpinner from '@/components/LoadingSpinner';

export default async function Loading() {
  const t = await getTranslations('common');
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-4"
      aria-live="polite"
      aria-busy="true"
      aria-label={t('loading')}
    >
      <LoadingSpinner size="lg" />
      <span className="text-sm text-muted-foreground">{t('loading')}</span>
    </div>
  );
}
