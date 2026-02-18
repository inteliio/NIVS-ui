import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import contactData from '@/data/contact.json';

const departments = contactData as {
  id: string;
  nameKey: string;
  email: string;
  phone: string;
}[];

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'al' }, { locale: 'mk' }];
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground sm:mb-8 sm:text-3xl">{t('title')}</h1>
      <div className="space-y-4 sm:space-y-8">
        {departments.map((dept) => (
          <section
            key={dept.id}
            className="rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-6"
          >
            <h2 className="text-lg font-semibold text-foreground">
              {t(dept.nameKey as 'marketing' | 'sales' | 'logistics')}
            </h2>
            <dl className="mt-4 space-y-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">{t('email')}</dt>
                <dd>
                  <a
                    href={`mailto:${dept.email}`}
                    className="text-foreground underline hover:text-muted-foreground"
                  >
                    {dept.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">{t('phone')}</dt>
                <dd>
                  <a
                    href={`tel:${dept.phone.replace(/\s/g, '')}`}
                    className="text-foreground underline hover:text-muted-foreground"
                  >
                    {dept.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
