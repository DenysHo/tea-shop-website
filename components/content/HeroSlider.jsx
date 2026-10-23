"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { SLIDER_INTERVAL_MS } from "@/lib/motion";

function useAutoplay(count, index, setIndex) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => setIndex((index + 1) % count), SLIDER_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [count, index, setIndex]);
}

function Slide({ slide, active }) {
  return (
    <div
      aria-hidden={!active}
      className={`absolute inset-0 transition-opacity duration-1000 ease-calm ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <img
        src={slide.image}
        alt={slide.alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: slide.position }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,42,36,0)_20%,rgba(31,42,36,0.55)_55%,rgba(31,42,36,0.9)_100%)] md:bg-gradient-to-r md:from-ink/75 md:via-ink/25 md:to-transparent" />
      <div className="absolute inset-0 mx-auto flex max-w-content flex-col justify-end px-6 pb-20 text-white md:justify-center md:px-10 md:pb-0">
        <p className="font-script text-3xl leading-tight md:text-[40px]">{slide.script}</p>
        <h2 className="heading-caps mt-1 max-w-2xl text-[38px] leading-[1.05] tracking-[0.08em] text-white md:text-6xl">
          {slide.title}
        </h2>
        {slide.temp && (
          <p className="font-display text-5xl leading-tight md:text-7xl">{slide.temp}</p>
        )}
        <p className="mt-2 max-w-sm text-[15px] leading-relaxed md:max-w-md md:text-lg">{slide.text}</p>
        <Link
          href={slide.href}
          tabIndex={active ? 0 : -1}
          className="btn-outline-light mt-6 self-start"
        >
          {slide.cta}
          <svg width="28" height="10" viewBox="0 0 28 10" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
            <path d="M0 5h27M22 1l5 4-5 4" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export function HeroSlider({ slides, label }) {
  const [index, setIndex] = useState(0);
  useAutoplay(slides.length, index, setIndex);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className="relative h-[600px] overflow-hidden bg-forest md:h-[640px]"
    >
      {slides.map((slide, i) => (
        <Slide key={slide.image} slide={slide} active={i === index} />
      ))}

      <div className="absolute inset-x-0 bottom-5 flex justify-center gap-1">
        {slides.map((slide, i) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={slide.dotLabel}
            aria-current={i === index}
            className="flex h-9 w-11 items-center justify-center"
          >
            <span
              className={`block h-0.5 bg-white transition-all duration-500 ${i === index ? "w-8 opacity-100" : "w-3 opacity-60"}`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
