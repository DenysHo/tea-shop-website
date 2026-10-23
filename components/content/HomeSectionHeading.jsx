import { Link } from "@/i18n/navigation";

export function HomeSectionHeading({ script, title, href, linkLabel }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
      <div>
        <p className="script-accent text-[28px] md:text-[34px]">{script}</p>
        <h2 className="heading-caps text-3xl md:text-[44px]">
          {title}
        </h2>
      </div>
      <Link
        href={href}
        className="label-caps py-2 text-ink underline-offset-8 hover:text-matcha hover:underline"
      >
        {linkLabel}
      </Link>
    </div>
  );
}
