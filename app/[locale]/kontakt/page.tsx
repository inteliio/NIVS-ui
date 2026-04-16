import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Building2, MapPin, MapPinned, Phone } from 'lucide-react';
import ContactLocationMap from '@/components/ContactLocationMap';
import PageTitleAccent from '@/components/PageTitleAccent';
import { CONTACT_GOOGLE_MAP_EMBEDS, CONTACT_GOOGLE_MAPS_OPEN_URLS } from '@/data/contactMapEmbeds';

const PHONE_HREFS = {
  finance: '+38970306106',
  commerce: '+38970228220',
  offers: '+38970228218',
} as const;

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'al' }, { locale: 'mk' }];
}

const tileClass =
  'rounded-xl border border-border/40 bg-surface p-5 sm:p-6';

const iconWrapClass =
  'mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  const phoneRows = [
    { labelKey: 'phoneLabelFinance' as const, display: t('phoneDisplayFinance'), href: PHONE_HREFS.finance },
    { labelKey: 'phoneLabelCommerce' as const, display: t('phoneDisplayCommerce'), href: PHONE_HREFS.commerce },
    { labelKey: 'phoneLabelOffers' as const, display: t('phoneDisplayOffers'), href: PHONE_HREFS.offers },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header className="mb-8 sm:mb-10">
        <PageTitleAccent />
        <h1 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">{t('title')}</h1>
      </header>

      <div className="space-y-6 sm:space-y-8">
        {/* Company tile */}
        <div className={tileClass}>
          <div className={iconWrapClass}>
            <Building2 className="h-6 w-6 text-primary" strokeWidth={2} aria-hidden />
          </div>
          <p className="text-lg font-semibold text-foreground">{t('companyLine')}</p>
          <p className="mt-1 text-sm text-muted-foreground">{t('companyCity')}</p>
        </div>

        {/* Address tiles */}
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className={tileClass}>
            <div className={iconWrapClass}>
              <MapPin className="h-6 w-6 text-primary" strokeWidth={2} aria-hidden />
            </div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t('addressRegistered')}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground">{t('addressRegisteredLine')}</p>
            <ContactLocationMap
              embedUrl={CONTACT_GOOGLE_MAP_EMBEDS.registered}
              title={t('mapEmbedRegistered')}
              openInMapsUrl={CONTACT_GOOGLE_MAPS_OPEN_URLS.registered}
              openInMapsLabel={t('openInGoogleMaps')}
            />
          </div>
          <div className={tileClass}>
            <div className={iconWrapClass}>
              <MapPinned className="h-6 w-6 text-primary" strokeWidth={2} aria-hidden />
            </div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t('addressOffice')}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground">{t('addressOfficeLine')}</p>
            <ContactLocationMap
              embedUrl={CONTACT_GOOGLE_MAP_EMBEDS.office}
              title={t('mapEmbedOffice')}
              openInMapsUrl={CONTACT_GOOGLE_MAPS_OPEN_URLS.office}
              openInMapsLabel={t('openInGoogleMaps')}
            />
          </div>
        </div>

        {/* Phone tiles */}
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{t('contactsHeading')}</h2>
          <ul className="grid gap-4 sm:grid-cols-3 sm:gap-5">
            {phoneRows.map((row) => (
              <li key={row.labelKey} className={tileClass}>
                <div className={iconWrapClass}>
                  <Phone className="h-6 w-6 text-primary" strokeWidth={2} aria-hidden />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{t(row.labelKey)}</p>
                <a
                  href={`tel:${row.href}`}
                  className="mt-3 block text-lg font-semibold tabular-nums tracking-wide text-foreground underline decoration-border underline-offset-4 transition hover:text-primary hover:decoration-primary"
                >
                  {row.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
