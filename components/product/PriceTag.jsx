import { useTranslations } from "next-intl";
import { formatMoney } from "@/lib/money";

function pricePerKg(priceCents, grams) {
  return Math.round((priceCents * 1000) / grams);
}

function TeaPrice({ priceCents, grams, locale }) {
  const main = formatMoney(priceCents, locale);
  if (!(grams > 0)) {
    return <p className="font-body text-sm text-ink">{main}</p>;
  }

  return (
    <p className="font-body text-sm text-ink">
      {main}
      <span className="text-stone"> / {grams} g</span>
      {grams >= 10 && (
        <span className="text-stone">
          {" "}
          ({formatMoney(pricePerKg(priceCents, grams), locale)} / 1 kg)
        </span>
      )}
    </p>
  );
}

function PriceNote() {
  const t = useTranslations("product");
  return <p className="mt-1 font-body text-xs text-stone">{t("priceNote")}</p>;
}

function Price({ product, locale }) {
  const { priceCents, category } = product;

  if (category === "tea") {
    return (
      <TeaPrice
        priceCents={priceCents}
        grams={product.saleUnitGrams}
        locale={locale}
      />
    );
  }

  const main = formatMoney(priceCents, locale);

  if (product.pieceCount > 1) {
    const perPiece = formatMoney(priceCents / product.pieceCount, locale);
    return (
      <p className="font-body text-sm text-ink">
        {main}
        <span className="text-stone"> · {perPiece}/pc</span>
      </p>
    );
  }

  return <p className="font-body text-sm text-ink">{main}</p>;
}

export default function PriceTag({ product, locale }) {
  if (product.priceCents == null) return null;

  return (
    <div>
      <Price product={product} locale={locale} />
      <PriceNote />
    </div>
  );
}
