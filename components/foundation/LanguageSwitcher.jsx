"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { SUPPORTED_LOCALES } from "@/lib/types";

export function LanguageSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-3">
      {SUPPORTED_LOCALES.map((code, index) => (
        <span key={code} className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: code })}
            aria-current={code === locale}
            className={`font-body text-xs uppercase tracking-widest transition-colors duration-300 ${
              code === locale ? "text-ink" : "text-stone hover:text-ink"
            }`}
          >
            {t(`language.${code}`)}
          </button>
          {index < SUPPORTED_LOCALES.length - 1 && (
            <span className="text-bamboo" aria-hidden="true">
              /
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
