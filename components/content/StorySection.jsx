"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/foundation/Container";
import { Eyebrow, Heading, BodyText } from "@/components/foundation/Typography";
import { PlaceholderArt } from "@/components/foundation/PlaceholderArt";

const scrollRevealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function StorySection({ eyebrow, title, body, imageSide = "left", accentColor = "#6B7A5E" }) {
  const imageBlock = (
    <motion.div
      className="md:col-span-7"
      variants={scrollRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <PlaceholderArt accentColor={accentColor} aspect="wide" />
    </motion.div>
  );

  const textBlock = (
    <motion.div
      className="md:col-span-4 md:self-center"
      variants={scrollRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: 0.15 }}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading size="md" className="mt-4">{title}</Heading>
      <BodyText className="mt-6">{body}</BodyText>
    </motion.div>
  );

  return (
    <Container>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        {imageSide === "left" ? (
          <>{imageBlock}<div className="md:col-span-1" />{textBlock}</>
        ) : (
          <>{textBlock}<div className="md:col-span-1" />{imageBlock}</>
        )}
      </div>
    </Container>
  );
}
