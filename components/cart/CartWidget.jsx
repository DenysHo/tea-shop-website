"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { drawerRight, fade } from "@/lib/motion";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "./CartContext";
import { formatMoney } from "@/lib/money";
import { getDomainsImageUrl } from "@/lib/imageUrl";
import { cartLineQuantityLabel } from "@/lib/cartLines";
import Link from "next/link";

function isWeightedTea(item) {
  return item.category === "tea" && item.saleUnitGrams > 0;
}

function useCloseOnEscape(open, onClose) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
}

export default function CartWidget() {
  const locale = useLocale();
  const t = useTranslations("cart");
  const { items, count, totalCents, updateQuantity, removeItem } = useCart();
  const [open, setOpen] = useState(false);

  useCloseOnEscape(open, () => setOpen(false));

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("title")}
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink transition hover:text-matcha"
      >
        <svg
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-matcha px-1 font-body text-[10px] font-semibold text-white">
            {count}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              {...fade}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-ink/40"
            />
            <motion.aside
              {...drawerRight}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-paper shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-bamboo/30 px-5 py-4">
                <h2 className="font-display text-xl text-ink">{t("title")}</h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-ink/60 transition hover:bg-linen hover:text-ink"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4">
                {items.length === 0 ? (
                  <p className="text-sm text-stone">{t("empty")}</p>
                ) : (
                  <ul className="space-y-5">
                    {items.map((item) => (
                      <li
                        key={`${item.category}:${item.id}`}
                        className="flex gap-3"
                      >
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded bg-linen">
                          {item.image && (
                            <img
                              src={getDomainsImageUrl(item.image)}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>

                        <div className="flex-1">
                          <p className="font-body text-sm font-medium text-ink">
                            {item.name}
                          </p>
                          <p className="mt-0.5 text-xs text-stone">
                            {cartLineQuantityLabel(item, t("piece"))}
                          </p>

                          <div className="mt-2 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.category,
                                  item.id,
                                  item.quantity - 1,
                                )
                              }
                              className="flex h-6 w-6 items-center justify-center rounded border border-ink/15 text-ink transition hover:border-matcha hover:text-matcha"
                            >
                              −
                            </button>
                            <span className="w-5 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.category,
                                  item.id,
                                  item.quantity + 1,
                                )
                              }
                              className="flex h-6 w-6 items-center justify-center rounded border border-ink/15 text-ink transition hover:border-matcha hover:text-matcha"
                            >
                              +
                            </button>

                            <button
                              type="button"
                              onClick={() => removeItem(item.category, item.id)}
                              className="ml-auto text-xs text-stone underline-offset-2 transition hover:text-seal hover:underline"
                            >
                              {t("remove")}
                            </button>
                          </div>
                        </div>

                        <p className="whitespace-nowrap text-sm text-ink">
                          {formatMoney(item.priceCents * item.quantity, locale)}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-bamboo/30 px-5 py-4">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-stone">{t("subtotal")}</span>
                    <span className="font-semibold text-ink">
                      {formatMoney(totalCents, locale)}
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={() => setOpen(false)}
                    className="mt-4 block w-full rounded bg-matcha px-6 py-3 text-center font-body text-sm font-semibold text-white transition hover:bg-matcha/90"
                  >
                    {t("checkout")}
                  </Link>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
