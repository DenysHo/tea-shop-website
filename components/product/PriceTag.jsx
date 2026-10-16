const formatters = {};
function formatMoney(amountCents, locale, currency = "EUR") {
  const key = `${currency}-${locale}`;
  if (!formatters[key]) {
    formatters[key] = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return formatters[key].format(amountCents / 100);
}

export default function PriceTag({ product, locale }) {
  const { priceCents, category } = product;
  if (priceCents == null) return null;

  const main = formatMoney(priceCents, locale);

  if (category === "tea") {
    if (product.saleUnitGrams > 0) {
      return (
        <p className="font-body text-sm text-ink">
          {main}
          <span className="text-stone"> / {product.saleUnitGrams}g</span>
        </p>
      );
    }
    return <p className="font-body text-sm text-ink">{main}</p>;
  }

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
