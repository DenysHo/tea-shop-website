import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Section } from "@/components/foundation/Section";
import { Container } from "@/components/foundation/Container";
import { Eyebrow, Heading, BodyText } from "@/components/foundation/Typography";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getAllTeawares } from "@/lib/services/teawareService";

export default async function TeaWareCatalogPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("catalog");
  const items = await getAllTeawares();

  const cards = items.map((item) => ({
    id: item.id,
    slug: item.slug,
    category: "teaware",
    name: item.name,
    shortDescription: item.shortDescription,
    accentColor: item.accentColor,
    images: item.images,
    priceCents: item.priceCents,
    pieceCount: item.pieceCount,
  }));

  return (
    <Section spacing="lg">
      <Container>
        <div className="mb-16 max-w-lg">
          <Eyebrow>{t("teawareTitle")}</Eyebrow>
          <Heading as="h1" size="lg" className="mt-4">
            {t("teawareTitle")}
          </Heading>
          <BodyText className="mt-4">{t("teawareSubtitle")}</BodyText>
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
