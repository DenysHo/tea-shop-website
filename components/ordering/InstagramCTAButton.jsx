"use client";

import { useTranslations } from "next-intl";
import { ButtonExternalLink } from "@/components/foundation/Button";

const INSTAGRAM_URL = "https://www.instagram.com/zentee_teehaus";

export function InstagramCTAButton({ variant = "ghost", className = "" }) {
  const t = useTranslations("common");
  return (
    <ButtonExternalLink
      href={INSTAGRAM_URL}
      variant={variant}
      className={className}
    >
      {t("cta.instagram")}
    </ButtonExternalLink>
  );
}
