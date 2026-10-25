import Image from "next/image";
import { SITE } from "@/lib/site";

const FALLBACK_POSTS = [
  "lake",
  "gaiwan",
  "longjing",
  "cups",
  "puerh",
  "green",
].map((name) => ({
  id: name,
  image: `/hero/${name}.jpg`,
  url: SITE.instagram.url,
}));

export function InstagramStrip({ script, follow, postLabel, posts }) {
  const shown = posts?.length ? posts : FALLBACK_POSTS;

  return (
    <section className="bg-forest py-12 text-paper md:py-16">
      <div className="mx-auto max-w-content px-4 md:px-10">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <p className="script-accent text-[28px] text-mint md:text-[34px]">
              {script}
            </p>
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
            className="btn-outline-paper hidden md:inline-flex"
          >
            {follow}
          </a>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-1 md:mt-8 md:grid-cols-6 md:gap-1.5">
          {shown.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={postLabel}
              className="block overflow-hidden"
            >
              <Image
                src={post.image}
                alt=""
                width={400}
                height={400}
                sizes="(min-width: 768px) 16vw, 33vw"
                className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </a>
          ))}
        </div>

        <a
          href={SITE.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-paper mt-6 flex md:hidden"
        >
          {follow}
        </a>
      </div>
    </section>
  );
}
