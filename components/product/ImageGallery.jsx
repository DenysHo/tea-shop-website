"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gallerySlideTransition, gallerySlideVariants, thumbSpring } from "@/lib/motion";
import { getDomainsImageUrl } from "@/lib/imageUrl";
import { PlaceholderArt } from "@/components/foundation/PlaceholderArt";

const SWIPE_THRESHOLD = 80;

function Arrow({ direction, onClick }) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous image" : "Next image"}
      className={`absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow-md backdrop-blur transition duration-300 hover:scale-110 hover:bg-white md:opacity-0 md:group-hover:opacity-100 ${
        isPrev ? "left-3" : "right-3"
      }`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={isPrev ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
      </svg>
    </button>
  );
}

export default function ImageGallery({
  images = [],
  alt = "",
  accentColor,
  className = "",
}) {
  const [[index, direction], setPage] = useState([0, 0]);
  const thumbRefs = useRef([]);
  const uid = useId();
  const count = images.length;

  const paginate = useCallback(
    (dir) => setPage(([i]) => [(i + dir + count) % count, dir]),
    [count],
  );

  const goTo = (target) =>
    setPage(([current]) =>
      target === current ? [current, 0] : [target, target > current ? 1 : -1],
    );

  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [index]);

  if (count === 0) {
    return (
      <PlaceholderArt
        accentColor={accentColor}
        aspect="portrait"
        className={className}
      />
    );
  }

  const handleKeyDown = (e) => {
    if (count < 2) return;
    if (e.key === "ArrowLeft") paginate(-1);
    if (e.key === "ArrowRight") paginate(1);
  };

  return (
    <div className={`mx-auto w-[min(100%,calc(70svh*0.8))] ${className}`}>
      <div
        className="group relative aspect-[4/5] w-full overflow-hidden bg-linen outline-none focus-visible:ring-2 focus-visible:ring-matcha"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={index}
            src={getDomainsImageUrl(images[index])}
            alt={alt}
            custom={direction}
            variants={gallerySlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={gallerySlideTransition}
            drag={count > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, { offset }) => {
              if (offset.x < -SWIPE_THRESHOLD) paginate(1);
              else if (offset.x > SWIPE_THRESHOLD) paginate(-1);
            }}
            draggable={false}
            className="absolute inset-0 h-full w-full cursor-grab select-none object-cover active:cursor-grabbing"
          />
        </AnimatePresence>

        {count > 1 && (
          <>
            <Arrow direction="prev" onClick={() => paginate(-1)} />
            <Arrow direction="next" onClick={() => paginate(1)} />
            <span className="absolute bottom-3 right-3 z-10 rounded-full bg-ink/60 px-3 py-1 font-body text-xs text-white backdrop-blur">
              {index + 1} / {count}
            </span>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {images.map((key, i) => (
            <button
              key={key}
              type="button"
              ref={(el) => (thumbRefs.current[i] = el)}
              onClick={() => goTo(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              className="relative aspect-[4/5] w-16 shrink-0 overflow-hidden bg-linen md:w-20"
            >
              <img
                src={getDomainsImageUrl(key)}
                alt=""
                loading="lazy"
                draggable={false}
                className={`h-full w-full object-cover transition duration-300 ${
                  i === index ? "opacity-100" : "opacity-60 hover:opacity-100"
                }`}
              />
              {i === index && (
                <motion.span
                  layoutId={`${uid}-active-thumb`}
                  className="absolute inset-0 border-2 border-matcha"
                  transition={thumbSpring}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
