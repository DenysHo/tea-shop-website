import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/foundation/Container";
import { HeroSlider } from "@/components/content/HeroSlider";
import { HomeSectionHeading } from "@/components/content/HomeSectionHeading";
import { TemperatureCard } from "@/components/content/TemperatureCard";
import { InstagramStrip } from "@/components/content/InstagramStrip";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getFeaturedTeas } from "@/lib/services/teaService";
import { getFeaturedTeawares } from "@/lib/services/teawareService";

const SLIDES = [
  { image: "/hero/lake.jpg", position: "40% 50%", href: "/tea" },
  { image: "/hero/green.jpg", position: "55% 50%", href: "/tea" },
  { image: "/hero/gaiwan.jpg", position: "50% 50%", href: "/teaware" },
  { image: "/hero/puerh.jpg", position: "60% 50%", href: "/tea" },
  { image: "/hero/longjing.jpg", position: "45% 50%", href: "/tea" },
];

function toCard(item, category) {
  return {
    id: item.id,
    slug: item.slug,
    category,
    name: item.name,
    shortDescription: item.shortDescription,
    accentColor: item.accentColor,
    images: item.images,
    priceCents: item.priceCents,
    saleUnitGrams: item.saleUnitGrams,
    pieceCount: item.pieceCount,
  };
}

function CategoryButtons({ teaLabel, teawareLabel }) {
  return (
    <Container className="grid grid-cols-2 gap-2.5 pt-6 md:hidden">
      <a
        href="#tea"
        className="flex h-12 items-center justify-center bg-forest font-display text-base uppercase tracking-[0.1em] text-paper"
      >
        {teaLabel}
      </a>
      <a
        href="#teaware"
        className="flex h-12 items-center justify-center border border-forest font-display text-base uppercase tracking-[0.1em] text-ink"
      >
        {teawareLabel}
      </a>
    </Container>
  );
}

function ProductSection({ id, heading, products }) {
  if (products.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-20 pt-12 md:pt-20">
      <Container>
        {heading}
        <ProductGrid products={products} className="mt-6 md:mt-9" />
      </Container>
    </section>
  );
}

export default async function HomePage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("home");

  const [teas, teawares] = await Promise.all([
    getFeaturedTeas(),
    getFeaturedTeawares(),
  ]);

  const slides = t.raw("slider.slides").map((text, i) => ({
    ...SLIDES[i],
    ...text,
    dotLabel: t("slider.goTo", { n: i + 1 }),
  }));

  return (
    <>
      <HeroSlider slides={slides} label={t("slider.label")} />

      <CategoryButtons teaLabel={t("tea.title")} teawareLabel={t("teaware.title")} />

      <ProductSection
        id="tea"
        products={teas.map((tea) => toCard(tea, "tea"))}
        heading={
          <HomeSectionHeading
            script={t("tea.script")}
            title={t("tea.title")}
            href="/tea"
            linkLabel={t("tea.viewAll")}
          />
        }
      />

      <ProductSection
        id="teaware"
        products={teawares.map((item) => toCard(item, "teaware"))}
        heading={
          <HomeSectionHeading
            script={t("teaware.script")}
            title={t("teaware.title")}
            href="/teaware"
            linkLabel={t("teaware.viewAll")}
          />
        }
      />

      <div className="mx-auto mt-14 grid max-w-content grid-cols-1 gap-6 md:mt-24 md:grid-cols-2 md:items-center md:px-10">
        <TemperatureCard
          title={t("temps.title")}
          rows={t.raw("temps.rows")}
          note={t("temps.note")}
        />

        <div className="px-6 py-10 text-center md:py-0">
          <p className="text-xs uppercase tracking-[0.24em] text-stone">{t("philosophy.eyebrow")}</p>
          <h2 className="mt-4 font-display text-3xl leading-tight md:text-[40px]">{t("philosophy.title")}</h2>
          <div className="mx-auto my-6 h-px w-14 bg-matcha" />
          <p className="script-accent text-[28px] md:text-[34px]">{t("approach.script")}</p>
          <Link
            href="/philosophy"
            className="label-caps mt-5 inline-block py-2 hover:text-matcha"
          >
            {t("approach.more")}
          </Link>
        </div>
      </div>

      <div className="mt-14 md:mt-24">
        <InstagramStrip
          script={t("instagram.script")}
          follow={t("instagram.follow")}
          postLabel={t("instagram.post")}
        />
      </div>
    </>
  );
}
