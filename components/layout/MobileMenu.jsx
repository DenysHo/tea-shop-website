"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/foundation/LanguageSwitcher";

function useLockScroll(locked) {
  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [locked]);
}

function MenuPanel({ items, closeLabel, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex flex-col bg-paper px-6"
    >
      <div className="flex h-16 items-center">
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="-ml-2 flex h-11 w-11 items-center justify-center text-ink"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="mt-10 flex flex-col">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="border-b border-bamboo/60 py-4 font-display text-3xl uppercase tracking-[0.08em] text-ink"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-10">
        <LanguageSwitcher />
      </div>
    </motion.div>
  );
}

export function MobileMenu({ items, menuLabel, closeLabel }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);
  useLockScroll(open);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={menuLabel}
        aria-expanded={open}
        className="-ml-2 flex h-11 w-11 items-center justify-center text-ink"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <path d="M4 8h16M4 16h16" />
        </svg>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && <MenuPanel items={items} closeLabel={closeLabel} onClose={() => setOpen(false)} />}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
