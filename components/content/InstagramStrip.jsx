import { SITE } from "@/lib/site";

const PHOTOS = ["lake", "gaiwan", "longjing", "cups", "puerh", "green"];

export function InstagramStrip({ script, follow, postLabel }) {
  return (
    <section className="bg-forest py-12 text-paper md:py-16">
      <div className="mx-auto max-w-content px-4 md:px-10">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <p className="font-script text-[28px] leading-tight text-mint md:text-[34px]">{script}</p>
            <a
              href={SITE.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm uppercase tracking-[0.2em] text-paper hover:text-mint"
            >
              @{SITE.instagram.handle}
            </a>
          </div>
          <a
            href={SITE.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-12 items-center border border-paper px-7 text-xs font-normal uppercase tracking-[0.2em] transition-colors hover:bg-paper hover:text-forest md:inline-flex"
          >
            {follow}
          </a>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-1 md:mt-8 md:grid-cols-6 md:gap-1.5">
          {PHOTOS.map((name) => (
            <a
              key={name}
              href={SITE.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={postLabel}
              className="block overflow-hidden"
            >
              <img
                src={`/hero/${name}.jpg`}
                alt=""
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </a>
          ))}
        </div>

        <a
          href={SITE.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex h-12 items-center justify-center border border-paper text-xs font-normal uppercase tracking-[0.2em] md:hidden"
        >
          {follow}
        </a>
      </div>
    </section>
  );
}
