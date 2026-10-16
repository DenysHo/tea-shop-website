import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Section } from "@/components/foundation/Section";
import { Container } from "@/components/foundation/Container";
import { Eyebrow, Heading, BodyText } from "@/components/foundation/Typography";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getAllTeas } from "@/lib/services/teaService";

export default async function TeaCatalogPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("catalog");
  const teas = await getAllTeas();

  const cards = teas.map((tea) => ({
    id: tea.id,
    slug: tea.slug,
    category: "tea",
    name: tea.name,
    shortDescription: tea.shortDescription,
    accentColor: tea.accentColor,
    images: tea.images,
    priceCents: tea.priceCents,
    saleUnitGrams: tea.saleUnitGrams,
  }));

  return (
    <Section spacing="lg">
      <Container>
        <div className="mb-16 max-w-lg">
          <Eyebrow>{t("teaTitle")}</Eyebrow>
          <Heading as="h1" size="lg" className="mt-4">
            {t("teaTitle")}
          </Heading>
          <BodyText className="mt-4">{t("teaSubtitle")}</BodyText>
        </div>

        {cards.length > 0 ? (
          <ProductGrid products={cards} />
        ) : (
          <BodyText>{t("empty")}</BodyText>
        )}
      </Container>
    </Section>
  );
}
