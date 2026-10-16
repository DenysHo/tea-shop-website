import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { Section } from "@/components/foundation/Section";
import { Container } from "@/components/foundation/Container";
import { Heading, BodyText } from "@/components/foundation/Typography";
import { fillContacts } from "@/lib/site";

export default async function ImprintPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const content = messages.imprint;

  return (
    <Section spacing="lg">
      <Container className="max-w-2xl">
        <Heading as="h1" size="lg">
          {content.title}
        </Heading>

        <div className="mt-10 space-y-8">
          {content.sections.map((section) => (
            <div key={section.heading}>
              <Heading as="h2" size="sm">
                {section.heading}
              </Heading>
              <BodyText className="mt-3 whitespace-pre-line">
                {fillContacts(section.body)}
              </BodyText>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
