"use client";

import { motion } from "framer-motion";
import { revealVariants } from "@/lib/motion";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PlaceholderArt } from "@/components/foundation/PlaceholderArt";
import { asTranslated, resolveTranslated } from "@/lib/types";
import Image from "@/components/product/Image";
import PriceTag from "@/components/product/PriceTag";

export function ProductCard({ product, index = 0 }) {
  const locale = useLocale();
  const name = resolveTranslated(asTranslated(product.name), locale);
  const shortDescription = resolveTranslated(
    asTranslated(product.shortDescription),
    locale,
  );
  const basePath = product.category === "tea" ? "/tea" : "/teaware";

  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      <Link href={`${basePath}/${product.slug}`} className="group block">
        {product.images?.length > 0 ? (
          <Image url={product.images[0]} alt={name} />
        ) : (
          <PlaceholderArt accentColor={product.accentColor} aspect="portrait" />
        )}
        <div className="mt-3 md:mt-4">
          <h3 className="font-display text-xl font-medium leading-tight text-ink transition-colors duration-300 group-hover:text-matcha md:text-2xl">
            {name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm leading-snug text-stone">{shortDescription}</p>
          <div className="mt-2">
            <PriceTag product={product} locale={locale} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
