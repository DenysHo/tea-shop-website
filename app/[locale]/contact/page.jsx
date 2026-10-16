import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { ComingSoonSection } from "@/components/content/ComingSoonSection";

export default async function Page({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("common");
  return <ComingSoonSection title={t("nav.contact")} />;
}
