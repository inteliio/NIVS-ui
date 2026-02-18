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
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">{t('title')}</h1>
      <div className="space-y-8">
        {departments.map((dept) => (
          <section
            key={dept.id}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              {t(dept.nameKey as 'marketing' | 'sales' | 'logistics')}
            </h2>
            <dl className="mt-4 space-y-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('email')}</dt>
                <dd>
                  <a
                    href={`mailto:${dept.email}`}
                    className="text-gray-900 underline hover:text-gray-700"
                  >
                    {dept.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('phone')}</dt>
                <dd>
                  <a
                    href={`tel:${dept.phone.replace(/\s/g, '')}`}
                    className="text-gray-900 underline hover:text-gray-700"
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
