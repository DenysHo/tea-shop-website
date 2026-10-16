import { getTranslations } from "next-intl/server";
import { Section } from "@/components/foundation/Section";
import { Container } from "@/components/foundation/Container";
import { Eyebrow, Heading, BodyText } from "@/components/foundation/Typography";
import { ButtonLink } from "@/components/foundation/Button";

export default async function NotFound() {
  const t = await getTranslations("common");

  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <Eyebrow>{t("notFound.eyebrow")}</Eyebrow>
          <Heading as="h1" size="lg" className="mt-4">{t("notFound.title")}</Heading>
          <BodyText className="mt-6">{t("notFound.body")}</BodyText>
          <ButtonLink href="/" variant="ghost" className="mt-8">{t("notFound.backHome")}</ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
