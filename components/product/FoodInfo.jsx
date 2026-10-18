import { useTranslations } from "next-intl";
import { asTranslated, resolveTranslated } from "@/lib/types";
import { SITE } from "@/lib/site";

function InfoRow({ label, children }) {
  return (
    <div className="flex justify-between gap-6 text-sm">
      <dt className="text-stone">{label}</dt>
      <dd className="text-right text-ink whitespace-pre-line">{children}</dd>
    </div>
  );
}

function translatedText(value, locale) {
  return (resolveTranslated(asTranslated(value), locale) ?? "").trim();
}

export default function FoodInfo({ tea, locale }) {
  const t = useTranslations("product.foodInfo");
  const legalName = translatedText(tea.legalName, locale);
  const ingredients = translatedText(tea.ingredients, locale);
  const allergens = translatedText(tea.allergens, locale);
  const origin = translatedText(tea.origin, locale);

  return (
    <section className="mt-10 border-t border-bamboo/40 pt-6">
      <h2 className="font-body text-xs uppercase tracking-widest text-stone">
        {t("title")}
      </h2>
      <dl className="mt-4 space-y-3">
        {legalName && <InfoRow label={t("legalName")}>{legalName}</InfoRow>}
        {ingredients && (
          <InfoRow label={t("ingredients")}>{ingredients}</InfoRow>
        )}
        <InfoRow label={t("allergens")}>
          {allergens || t("noAllergens")}
        </InfoRow>
        {tea.saleUnitGrams > 0 && (
          <InfoRow label={t("netWeight")}>{tea.saleUnitGrams} g</InfoRow>
        )}
        {origin && <InfoRow label={t("origin")}>{origin}</InfoRow>}
        <InfoRow label={t("storage")}>{t("storageText")}</InfoRow>
        <InfoRow label={t("operator")}>
          {`${SITE.owner}\n${SITE.street}\n${SITE.city}`}
        </InfoRow>
      </dl>
    </section>
  );
}
