import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Section } from "@/components/foundation/Section";
import { Container } from "@/components/foundation/Container";
import { Eyebrow, Heading } from "@/components/foundation/Typography";
import { HeroSection } from "@/components/content/HeroSection";
import { StorySection } from "@/components/content/StorySection";
import { CTASection } from "@/components/content/CTASection";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getFeaturedTeas } from "@/lib/services/teaService";
import { getFeaturedTeawares } from "@/lib/services/teawareService";

export default async function HomePage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("home");

  const [teas, teawares] = await Promise.all([
    getFeaturedTeas(),
    getFeaturedTeawares(),
  ]);

  const teaCards = teas.map((tea) => ({
    id: tea.id,
    slug: tea.slug,
    category: "tea",
    name: tea.name,
    shortDescription: tea.shortDescription,
    accentColor: tea.accentColor,
    images: tea.images,
  }));

  const teawareCards = teawares.map((item) => ({
    id: item.id,
    slug: item.slug,
    category: "teaware",
    name: item.name,
    shortDescription: item.shortDescription,
    accentColor: item.accentColor,
    images: item.images,
  }));

  return (
    <>
      <HeroSection
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <Section tone="linen">
        <StorySection
          eyebrow={t("philosophy.eyebrow")}
          title={t("philosophy.title")}
          body={t("philosophy.body")}
          imageSide="left"
        />
      </Section>

      <Section tone="paper">
        <Container>
          <div className="mb-12 max-w-lg">
            <Eyebrow>{t("featuredTea.eyebrow")}</Eyebrow>
            <Heading size="md" className="mt-4">
              {t("featuredTea.title")}
            </Heading>
          </div>
          <ProductGrid products={teaCards} />
        </Container>
      </Section>

      <Section tone="linen">
        <Container>
          <div className="mb-12 max-w-lg">
            <Eyebrow>{t("featuredTeaware.eyebrow")}</Eyebrow>
            <Heading size="md" className="mt-4">
              {t("featuredTeaware.title")}
            </Heading>
          </div>
          <ProductGrid products={teawareCards} />
        </Container>
      </Section>

      <Section tone="paper" spacing="lg">
        <CTASection title={t("cta.title")} body={t("cta.body")} />
      </Section>
    </>
  );
}
