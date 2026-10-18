"use client";

import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/components/cart/CartContext";
import { formatMoney } from "@/lib/money";
import { cartLineQuantityLabel } from "@/lib/cartLines";
import { submitOrderAction } from "./actions";
import { Section } from "@/components/foundation/Section";
import { Container } from "@/components/foundation/Container";
import { Heading, BodyText } from "@/components/foundation/Typography";

function toOrderItems(cartItems) {
  return cartItems.map((item) => ({
    category: item.category,
    id: item.id,
    slug: item.slug,
    name: item.name,
    priceCents: item.priceCents,
    quantity: item.quantity,
    saleUnitGrams: item.saleUnitGrams ?? 0,
  }));
}

export default function CheckoutPage() {
  const locale = useLocale();
  const t = useTranslations("checkout");
  const { items, totalCents, clear } = useCart();

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    country: "",
    postalCode: "",
    city: "",
    street: "",
    houseNumber: "",
    note: "",
  });
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [pending, startTransition] = useTransition();

  function updateField(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      const response = await submitOrderAction({
        ...form,
        items: toOrderItems(items),
      });

      if (!response.ok) {
        setError(response.error);
        return;
      }

      clear();
      setResult(response);
    });
  }

  if (result) {
    return (
      <Section spacing="lg">
        <Container className="max-w-xl text-center">
          <Heading as="h1" size="lg">
            {t("successTitle")}
          </Heading>
          <BodyText className="mt-4">
            {t("successBody", { id: result.id.slice(-6) })}
          </BodyText>
        </Container>
      </Section>
    );
  }

  if (items.length === 0) {
    return (
      <Section spacing="lg">
        <Container className="max-w-xl text-center">
          <BodyText>{t("empty")}</BodyText>
        </Container>
      </Section>
    );
  }

  return (
    <Section spacing="lg">
      <Container className="max-w-3xl">
        <Heading as="h1" size="lg">
          {t("title")}
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="admin-label" htmlFor="customerName">
                {t("name")}
              </label>
              <input
                id="customerName"
                required
                value={form.customerName}
                onChange={updateField("customerName")}
                className="admin-input"
              />
            </div>

            <div>
              <label className="admin-label" htmlFor="email">
                {t("email")}
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={updateField("email")}
                className="admin-input"
              />
            </div>

            <div>
              <label className="admin-label" htmlFor="phone">
                {t("phone")}
              </label>
              <input
                id="phone"
                value={form.phone}
                onChange={updateField("phone")}
                className="admin-input"
              />
            </div>

            <div className="grid grid-cols-[1fr,auto] gap-3">
              <div>
                <label className="admin-label" htmlFor="street">
                  {t("street")}
                </label>
                <input
                  id="street"
                  required
                  value={form.street}
                  onChange={updateField("street")}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label" htmlFor="houseNumber">
                  {t("houseNumber")}
                </label>
                <input
                  id="houseNumber"
                  required
                  value={form.houseNumber}
                  onChange={updateField("houseNumber")}
                  className="admin-input w-24"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="admin-label" htmlFor="postalCode">
                  {t("postalCode")}
                </label>
                <input
                  id="postalCode"
                  required
                  value={form.postalCode}
                  onChange={updateField("postalCode")}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label" htmlFor="city">
                  {t("city")}
                </label>
                <input
                  id="city"
                  required
                  value={form.city}
                  onChange={updateField("city")}
                  className="admin-input"
                />
              </div>
            </div>

            <div>
              <label className="admin-label" htmlFor="country">
                {t("country")}
              </label>
              <input
                id="country"
                required
                value={form.country}
                onChange={updateField("country")}
                className="admin-input"
              />
            </div>

            <div>
              <label className="admin-label" htmlFor="note">
                {t("note")}
              </label>
              <textarea
                id="note"
                rows={3}
                value={form.note}
                onChange={updateField("note")}
                className="admin-input"
              />
            </div>

            <BodyText className="text-sm text-stone">
              {t("paymentNote")}
            </BodyText>

            <label className="flex items-start gap-2 text-sm text-ink">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1"
              />
              <span>{t("consent")}</span>
            </label>

            {error && <p className="text-sm text-seal">{error}</p>}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded bg-matcha px-6 py-3 font-body text-sm font-semibold text-white transition hover:bg-matcha/90 disabled:opacity-60"
            >
              {pending ? t("submitting") : t("submit")}
            </button>
          </form>

          <div>
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={`${item.category}:${item.id}`}
                  className="flex justify-between text-sm"
                >
                  <div>
                    <p className="text-ink">{item.name}</p>
                    <p className="text-stone">
                      {cartLineQuantityLabel(item, t("piece"))}
                    </p>
                  </div>
                  <p className="text-ink">
                    {formatMoney(item.priceCents * item.quantity, locale)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-between border-t border-bamboo/30 pt-4 font-semibold">
              <span>{t("subtotal")}</span>
              <span>{formatMoney(totalCents, locale)}</span>
            </div>
            <p className="mt-1 text-right text-xs text-stone">
              {t("shippingNote")}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
