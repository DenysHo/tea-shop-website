import { getDomainsImageUrl } from "@/lib/imageUrl";

export default function Image({ url, alt }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-linen">
      <img
        src={getDomainsImageUrl(url)}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
}
