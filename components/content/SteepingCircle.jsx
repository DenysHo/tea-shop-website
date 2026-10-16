"use client";

import { motion } from "framer-motion";
import { useId } from "react";

const colors = { clay: "#8C5A3C", bamboo: "#B8A588", matcha: "#6B7A5E" };

export function SteepingCircle({ size = 420 }) {
  const gradientId = useId();

  return (
    <div style={{ width: size, height: size }} className="relative mx-auto">
      <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor={colors.clay} stopOpacity="0.9" />
            <stop offset="60%" stopColor={colors.clay} stopOpacity="0.5" />
            <stop offset="100%" stopColor={colors.clay} stopOpacity="0.08" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="188" fill="none" stroke={colors.bamboo} strokeOpacity="0.5" strokeWidth="1.5" />
        <motion.circle
          cx="200" cy="200" r="150" fill={`url(#${gradientId})`}
          initial={{ scale: 0.55, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx="200" cy="200" r="150" fill="none" stroke={colors.matcha} strokeOpacity="0.3" strokeWidth="1"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1.12, opacity: [0, 0.5, 0] }}
          transition={{ duration: 2.4, delay: 1.4, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}
