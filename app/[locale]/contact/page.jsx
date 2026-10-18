import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Section } from "@/components/foundation/Section";
import { Container } from "@/components/foundation/Container";
import { Eyebrow, Heading, BodyText } from "@/components/foundation/Typography";
import { SITE } from "@/lib/site";

export default async function ContactPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <Heading as="h1" size="lg">
            {t("title")}
          </Heading>
          <BodyText className="mt-6">{t("body")}</BodyText>

          <div className="mt-12 space-y-8">
            <div>
              <Eyebrow>{t("email")}</Eyebrow>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-2 inline-block font-display text-2xl text-ink hover:text-matcha"
              >
                {SITE.email}
              </a>
            </div>
            <div>
              <Eyebrow>Instagram</Eyebrow>
              <a
                href={SITE.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-display text-2xl text-ink hover:text-matcha"
              >
                @{SITE.instagram.handle}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
