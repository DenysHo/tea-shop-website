import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Section } from "@/components/foundation/Section";
import { Container } from "@/components/foundation/Container";
import { Eyebrow, Heading, BodyText } from "@/components/foundation/Typography";
import { PlaceholderArt } from "@/components/foundation/PlaceholderArt";
import { InstagramCTAButton } from "@/components/ordering/InstagramCTAButton";
import { getTeaBySlug } from "@/lib/services/teaService";
import Image from "@/components/product/Image";
import ImageGallery from "@/components/product/ImageGallery";
import PriceTag from "@/components/product/PriceTag";
import AddToCartButton from "@/components/product/AddToCartButton";
import FoodInfo from "@/components/product/FoodInfo";
import {
  asTranslated,
  asTranslatedArray,
  resolveTranslated,
} from "@/lib/types";

export default async function TeaDetailPage({ params: { locale, slug } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("product");
  const tea = await getTeaBySlug(slug);

  if (!tea) notFound();

  const name = resolveTranslated(asTranslated(tea.name), locale);
  const shortDescription = resolveTranslated(
    asTranslated(tea.shortDescription),
    locale,
  );
  const description = resolveTranslated(asTranslated(tea.description), locale);
  const origin = resolveTranslated(asTranslated(tea.origin), locale);
  const flavorNotes = asTranslatedArray(tea.flavorNotes).map((note) =>
    resolveTranslated(note, locale),
  );

  return (
    <Section spacing="lg">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            {tea.images.length > 0 ? (
              <ImageGallery
                images={tea.images}
                alt={name}
                accentColor={tea.accentColor}
              />
            ) : (
              <PlaceholderArt accentColor={tea.accentColor} aspect="portrait" />
            )}
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <Eyebrow>{origin}</Eyebrow>
            <Heading as="h1" size="lg" className="mt-4">
              {name}
            </Heading>
            <div className="mt-3">
              <PriceTag product={{ ...tea, category: "tea" }} locale={locale} />
            </div>
            <BodyText size="lg" className="mt-4">
              {shortDescription}
            </BodyText>

            <dl className="mt-8 space-y-3 border-t border-bamboo/40 pt-6">
              <div className="flex justify-between text-sm">
                <dt className="text-stone">{t("origin")}</dt>
                <dd className="text-ink">{origin}</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-stone">{t("harvest")}</dt>
                <dd className="text-ink">{tea.harvest}</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-stone">{t("caffeineLevel")}</dt>
                <dd className="text-ink">
                  {t(`caffeine.${tea.caffeineLevel}`)}
                </dd>
              </div>
              {flavorNotes.length > 0 && (
                <div className="flex justify-between text-sm">
                  <dt className="text-stone">{t("flavorNotes")}</dt>
                  <dd className="text-right text-ink">
                    {flavorNotes.join(", ")}
                  </dd>
                </div>
              )}
            </dl>

            <BodyText className="mt-8">{description}</BodyText>

            <FoodInfo tea={tea} locale={locale} />

            <div className="mt-5">
              <AddToCartButton
                product={{
                  id: tea.id,
                  category: "tea",
                  slug: tea.slug,
                  name,
                  image: tea.images?.[0] ?? null,
                  priceCents: tea.priceCents,
                  saleUnitGrams: tea.saleUnitGrams,
                  accentColor: tea.accentColor,
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
