import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/foundation/Container";
import { LanguageSwitcher } from "@/components/foundation/LanguageSwitcher";
import { Logo } from "@/components/foundation/Logo";
import CartWidget from "@/components/cart/CartWidget";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const t = useTranslations("common");

  const navItems = [
    { label: t("nav.tea"), href: "/tea" },
    { label: t("nav.teaware"), href: "/teaware" },
    { label: t("nav.philosophy"), href: "/philosophy" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-bamboo/40 bg-paper">
      <Container className="grid h-16 grid-cols-[1fr_auto_1fr] items-center md:flex md:h-20 md:justify-between">
        <MobileMenu items={navItems} menuLabel={t("menu")} closeLabel={t("close")} />

        <Link href="/" aria-label={t("home")} className="justify-self-center text-ink">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-normal uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:text-matcha"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-4">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <CartWidget />
        </div>
      </Container>
    </header>
  );
}
