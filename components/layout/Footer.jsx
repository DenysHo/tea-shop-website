import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/foundation/Container";
import { Divider } from "@/components/foundation/Divider";
import { SITE } from "@/lib/site";

export function Footer() {
  const t = useTranslations("common");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-linen">
      <Container className="py-16">
        <Divider className="mb-12" />
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-xl text-ink">{SITE.name}</p>
            <p className="mt-2 max-w-xs font-body text-sm text-stone">
              {t("brand.tagline")}
            </p>
          </div>

          <div className="flex flex-col gap-2 font-body text-sm text-stone">
            <a href={`mailto:${SITE.email}`} className="hover:text-ink">
              {SITE.email}
            </a>
            <a
              href={SITE.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink"
            >
              @{SITE.instagram.handle}
            </a>
          </div>

          <div className="flex flex-col gap-2 font-body text-sm text-stone">
            <Link href="/imprint" className="hover:text-ink">
              {t("footer.imprint")}
            </Link>
            <Link href="/privacy" className="hover:text-ink">
              {t("footer.privacy")}
            </Link>
          </div>
        </div>

        <p className="mt-12 font-body text-xs text-stone">
          © {year} {SITE.name}. {t("footer.rights")}
        </p>
      </Container>
    </footer>
  );
}
