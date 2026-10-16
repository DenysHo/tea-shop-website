"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/components/cart/CartContext";
import { formatMoney } from "@/lib/money";

function isWeightedTea(product) {
  return product.category === "tea" && product.saleUnitGrams > 0;
}

function useAddedFeedback(durationMs = 1500) {
  const [active, setActive] = useState(false);
  function trigger() {
    setActive(true);
    setTimeout(() => setActive(false), durationMs);
  }
  return [active, trigger];
}

export default function AddToCartButton({ product }) {
  const locale = useLocale();
  const t = useTranslations("cart");
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, triggerAdded] = useAddedFeedback();

  function handleAdd() {
    addItem(
      {
        id: product.id,
        category: product.category,
        slug: product.slug,
        name: product.name,
        image: product.image ?? null,
        priceCents: product.priceCents,
        saleUnitGrams: product.saleUnitGrams ?? 0,
        accentColor: product.accentColor,
      },
      qty,
    );
    triggerAdded();
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center rounded border border-ink/15">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="flex h-10 w-10 items-center justify-center text-ink transition hover:text-matcha"
        >
          −
        </button>
        <span className="w-10 text-center font-body text-sm">
          {isWeightedTea(product) ? `${qty * product.saleUnitGrams}g` : qty}
        </span>
        <button
          type="button"
          onClick={() => setQty((q) => q + 1)}
          className="flex h-10 w-10 items-center justify-center text-ink transition hover:text-matcha"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="flex-1 rounded bg-matcha px-6 py-3 font-body text-sm font-semibold text-white transition hover:bg-matcha/90"
      >
        {justAdded
          ? t("added")
          : `${t("add")} · ${formatMoney(product.priceCents * qty, locale)}`}
      </button>
    </div>
  );
}
