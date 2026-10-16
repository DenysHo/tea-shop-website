import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/foundation/Container";
import { LanguageSwitcher } from "@/components/foundation/LanguageSwitcher";
import CartWidget from "@/components/cart/CartWidget";

export function Header() {
  const t = useTranslations("common");

  const navItems = [
    { label: t("nav.tea"), href: "/tea" },
    { label: t("nav.teaware"), href: "/teaware" },
    { label: t("nav.philosophy"), href: "/philosophy" },
    { label: t("nav.order"), href: "/order" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <header className="border-b border-bamboo/30 bg-paper">
      <Container className="flex items-center justify-between py-6">
        <Link href="/" className="font-display text-2xl tracking-wide text-ink">
          {t("brand.name")}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-body text-sm text-stone transition-colors duration-300 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <LanguageSwitcher />
        <CartWidget />
      </Container>
    </header>
  );
}
