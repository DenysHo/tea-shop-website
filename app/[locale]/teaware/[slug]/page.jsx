import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Section } from "@/components/foundation/Section";
import { Container } from "@/components/foundation/Container";
import { Eyebrow, Heading, BodyText } from "@/components/foundation/Typography";
import { PlaceholderArt } from "@/components/foundation/PlaceholderArt";
import { InstagramCTAButton } from "@/components/ordering/InstagramCTAButton";
import { getTeawareBySlug } from "@/lib/services/teawareService";
import { asTranslated, resolveTranslated } from "@/lib/types";
import ImageGallery from "@/components/product/ImageGallery";
import PriceTag from "@/components/product/PriceTag";
import AddToCartButton from "@/components/product/AddToCartButton";

export default async function TeaWareDetailPage({ params: { locale, slug } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("product");
  const item = await getTeawareBySlug(slug);

  if (!item) notFound();

  const name = resolveTranslated(asTranslated(item.name), locale);
  const shortDescription = resolveTranslated(
    asTranslated(item.shortDescription),
    locale,
  );
  const description = resolveTranslated(asTranslated(item.description), locale);
  const material = resolveTranslated(asTranslated(item.material), locale);
  const origin = resolveTranslated(asTranslated(item.origin), locale);
  const craftsman = item.craftsman
    ? resolveTranslated(asTranslated(item.craftsman), locale)
    : null;

  return (
    <Section spacing="lg">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            {item.images.length > 0 ? (
              <ImageGallery
                images={item.images}
                alt={name}
                accentColor={item.accentColor}
              />
            ) : (
              <PlaceholderArt
                accentColor={item.accentColor}
                aspect="portrait"
              />
            )}
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <Eyebrow>{origin}</Eyebrow>
            <Heading as="h1" size="lg" className="mt-4">
              {name}
            </Heading>
            <div className="mt-3">
              <PriceTag
                product={{ ...item, category: "teaware" }}
                locale={locale}
              />
            </div>
            <BodyText size="lg" className="mt-4">
              {shortDescription}
            </BodyText>

            <dl className="mt-8 space-y-3 border-t border-bamboo/40 pt-6">
              <div className="flex justify-between text-sm">
                <dt className="text-stone">{t("material")}</dt>
                <dd className="text-ink">{material}</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-stone">{t("origin")}</dt>
                <dd className="text-ink">{origin}</dd>
              </div>
              {craftsman && (
                <div className="flex justify-between text-sm">
                  <dt className="text-stone">{t("craftsman")}</dt>
                  <dd className="text-right text-ink">{craftsman}</dd>
                </div>
              )}
              {item.capacityMl && (
                <div className="flex justify-between text-sm">
                  <dt className="text-stone">{t("capacity")}</dt>
                  <dd className="text-ink">{item.capacityMl} ml</dd>
                </div>
              )}
            </dl>

            <BodyText className="mt-8">{description}</BodyText>

            <div className="mt-5">
              <AddToCartButton
                product={{
                  id: item.id,
                  category: "teaware",
                  slug: item.slug,
                  name,
                  image: item.images?.[0] ?? null,
                  priceCents: item.priceCents,
                  saleUnitGrams: 0,
                  accentColor: item.accentColor,
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
