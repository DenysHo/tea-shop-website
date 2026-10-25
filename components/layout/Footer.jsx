import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/foundation/Container";
import { Logo } from "@/components/foundation/Logo";
import { SITE } from "@/lib/site";

export function Footer() {
  const t = useTranslations("common");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-dark text-paper/80">
      <Container className="py-12 md:py-14">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div>
            <Logo className="justify-center text-paper md:justify-start" markClassName="h-6 w-6 text-mint" />
            <p className="mt-3 max-w-xs text-sm">{t("brand.tagline")}</p>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <a href={`mailto:${SITE.email}`} className="hover:text-paper">
              {SITE.email}
            </a>
            <a
              href={SITE.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-paper"
            >
              @{SITE.instagram.handle}
            </a>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <Link href="/imprint" className="hover:text-paper">
              {t("footer.imprint")}
            </Link>
            <Link href="/privacy" className="hover:text-paper">
              {t("footer.privacy")}
            </Link>
            <Link href="/withdrawal" className="hover:text-paper">
              {t("footer.withdrawal")}
            </Link>
          </div>
        </div>

        <p className="mt-10 border-t border-paper/15 pt-6 text-center text-xs md:text-left">
          © {year} {SITE.name}. {t("footer.rights")}
        </p>
      </Container>
    </footer>
  );
}
