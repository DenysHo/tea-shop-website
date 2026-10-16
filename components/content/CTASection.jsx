"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/foundation/Container";
import { Heading, BodyText } from "@/components/foundation/Typography";
import { ButtonExternalLink } from "@/components/foundation/Button";
import { SITE } from "@/lib/site";


const scrollRevealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function CTASection({ title, body }) {
  const t = useTranslations("common");

  return (
    <Container>
      <motion.div
        className="mx-auto max-w-xl text-center"
        variants={scrollRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <Heading size="md">{title}</Heading>
        <BodyText className="mt-4">{body}</BodyText>
        <ButtonExternalLink
          href={SITE.instagram.url}
          variant="primary"
          className="mt-8"
        >
          {t("cta.instagram")}
        </ButtonExternalLink>
      </motion.div>
    </Container>
  );
}
