import { Link } from "@/i18n/navigation";

export function HomeSectionHeading({ script, title, href, linkLabel }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
      <div>
        <p className="font-script text-[28px] leading-tight text-matcha md:text-[34px]">{script}</p>
        <h2 className="font-display text-3xl font-medium uppercase tracking-[0.1em] text-ink md:text-[44px]">
          {title}
        </h2>
      </div>
      <Link
        href={href}
        className="py-2 text-xs font-normal uppercase tracking-[0.2em] text-ink underline-offset-8 hover:text-matcha hover:underline"
      >
        {linkLabel}
      </Link>
    </div>
  );
}
