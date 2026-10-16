"use client";

import { useTranslations } from "next-intl";
import { ButtonExternalLink } from "@/components/foundation/Button";
import { SITE } from "@/lib/site";


export function InstagramCTAButton({ variant = "ghost", className = "" }) {
  const t = useTranslations("common");
  return (
    <ButtonExternalLink
      href={SITE.instagram.url}
      variant={variant}
      className={className}
    >
      {t("cta.instagram")}
    </ButtonExternalLink>
  );
}
