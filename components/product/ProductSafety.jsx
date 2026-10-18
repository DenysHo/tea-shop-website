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

function joinLines(...lines) {
  return lines.filter(Boolean).join("\n");
}

export default function ProductSafety({ item, locale }) {
  const t = useTranslations("product.safety");
  const warnings = (
    resolveTranslated(asTranslated(item.warnings), locale) ?? ""
  ).trim();
  const manufacturer = joinLines(item.manufacturer, item.manufacturerContact);

  return (
    <section className="mt-10 border-t border-bamboo/40 pt-6">
      <h2 className="font-body text-xs uppercase tracking-widest text-stone">
        {t("title")}
      </h2>
      <dl className="mt-4 space-y-3">
        {manufacturer && (
          <InfoRow label={t("manufacturer")}>{manufacturer}</InfoRow>
        )}
        <InfoRow label={t("responsible")}>
          {joinLines(SITE.owner, SITE.street, SITE.city, SITE.email)}
        </InfoRow>
        {item.itemNumber && (
          <InfoRow label={t("itemNumber")}>{item.itemNumber}</InfoRow>
        )}
        {warnings && <InfoRow label={t("warnings")}>{warnings}</InfoRow>}
      </dl>
    </section>
  );
}
