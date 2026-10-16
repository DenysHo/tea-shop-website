"use client";

import { motion } from "framer-motion";
import { Eyebrow, Heading, BodyText } from "@/components/foundation/Typography";
import { Container } from "@/components/foundation/Container";
import { SteepingCircle } from "./SteepingCircle";

const heroRevealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
};

export function HeroSection({ eyebrow, title, subtitle }) {
  return (
    <div className="pt-24 pb-section-sm md:pt-32 md:pb-section">
      <Container>
        <motion.div initial="hidden" animate="visible" variants={heroRevealVariants}>
          <SteepingCircle />
        </motion.div>

        <motion.div
          className="mx-auto mt-10 max-w-2xl text-center"
          initial="hidden"
          animate="visible"
          variants={heroRevealVariants}
          transition={{ delay: 0.3 }}
        >
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading as="h1" size="xl" className="mt-4">{title}</Heading>
          <BodyText size="lg" className="mt-6">{subtitle}</BodyText>
        </motion.div>
      </Container>
    </div>
  );
}
