import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Boxes, Globe2, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import HeroSlider from "@/components/HeroSlider";
import StatCounter from "@/components/StatCounter";
import TestimonialsGrid from "@/components/TestimonialsGrid";
import partnersData from "@/data/partners.json";
import testimonialsData from "@/data/testimonials.json";
import type { Partner } from "@/types/partners";

const STATS = [
  { key: "clients" as const, value: "100+" },
  { key: "products" as const, value: "500+" },
  { key: "years" as const, value: "15+" },
];

const HERO_SLIDES = [
  { src: "/videos/MythosBaner.mp4", alt: "Mythos beer banner", type: "video" as const },
  { src: "/images/hero/FrutisanBaner.jpg", alt: "Frutisan banner" },
];

const SECTION_DIVIDER_LINE_CLASS = "mx-auto mb-6 h-[2px] w-[100%] bg-gradient-to-r from-transparent via-[#2C4F7C]/70 to-transparent sm:mb-8";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <div className="-mt-14">
        <HeroSlider slides={HERO_SLIDES} />
      </div>
      <StatsSection />
      <AboutSection />
      <PartnersSection />
      <TestimonialsSection />
    </>
  );
}

async function AboutSection() {
  const t = await getTranslations("home");
  return (
    <section className="border-b border-border bg-surface py-8 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{t("aboutTitle")}</h2>
        <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">{t("aboutShort")}</p>
        <Link href="/za-nas" className="mt-4 inline-block font-medium text-foreground underline decoration-border underline-offset-4 transition hover:decoration-foreground sm:mt-6">
          {t("aboutLink")}
        </Link>
      </div>
    </section>
  );
}

async function StatsSection() {
  const t = await getTranslations("home.stats");
  const statIcons = {
    clients: Globe2,
    products: Boxes,
    years: Users,
  } as const;

  return (
    <section className="border-y border-border bg-muted py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* <div className={SECTION_DIVIDER_LINE_CLASS} /> */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8">
          {STATS.map(({ key, value }) => (
            <div key={key} className="flex items-center justify-center gap-2 text-left sm:gap-4">
              {(() => {
                const Icon = statIcons[key];
                return <Icon className="mt-0.5 h-6 w-6 shrink-0 text-primary sm:h-10 sm:w-10" aria-hidden />;
              })()}
              <div className="flex items-baseline gap-1.5 sm:block">
                <p className="text-xl font-bold text-foreground sm:text-3xl lg:text-4xl">
                  <StatCounter value={value} />
                </p>
                <p className="text-xs font-medium text-muted-foreground sm:mt-1 sm:text-sm">{t(key)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

async function PartnersSection() {
  const t = await getTranslations("home");
  const partners = partnersData as Partner[];
  const marqueePartners = [...partners, ...partners];
  return (
    <section className="border-y border-border bg-surface py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={SECTION_DIVIDER_LINE_CLASS} />
        <h2 className="text-center text-xl font-semibold text-foreground sm:text-2xl">{t("partners")}</h2>
        <div className="partners-fade-mask mt-6 overflow-hidden py-2 sm:mt-8">
          <div className="partners-marquee-track">
            {marqueePartners.map((p, idx) => (
              <div key={`${p.partnerName}-${idx}`} className="mx-6 flex shrink-0 items-center justify-center sm:mx-10">
                <Image src={p.partnerLogoUrl} alt={p.partnerName} width={220} height={88} className="h-16 w-auto max-w-[min(220px,40vw)] object-contain opacity-90 sm:h-24 sm:max-w-[260px]" />
              </div>
            ))}
          </div>
        </div>
        {/* <div className={SECTION_DIVIDER_LINE_CLASS} /> */}
      </div>
    </section>
  );
}

async function TestimonialsSection() {
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const testimonials = testimonialsData as { id: string; quote: string; author: string; company: string }[];
  return <TestimonialsGrid title={t("testimonials")} loadMoreLabel={tCommon("readMore")} testimonials={testimonials} />;
}
