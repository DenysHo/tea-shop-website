import { getTranslations } from "next-intl/server";
import { Section } from "@/components/foundation/Section";
import { Container } from "@/components/foundation/Container";
import { Eyebrow, Heading, BodyText } from "@/components/foundation/Typography";
import { InstagramCTAButton } from "@/components/ordering/InstagramCTAButton";

export async function ComingSoonSection({ title }) {
  const t = await getTranslations("common");

  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <Eyebrow>{t("comingSoon.eyebrow")}</Eyebrow>
          <Heading as="h1" size="lg" className="mt-4">{title}</Heading>
          <BodyText className="mt-6">{t("comingSoon.body")}</BodyText>
          <InstagramCTAButton variant="ghost" className="mt-8" />
        </div>
      </Container>
    </Section>
  );
}
