export function linkType(link) {
  if (!link) return "none";
  return link.startsWith("/") ? "internal" : "external";
}

export function normalizeLink(type, value) {
  const link = value.trim();
  if (type === "none" || !link) return "";
  if (type === "internal") return link.startsWith("/") ? link : `/${link}`;
  return /^https?:\/\//i.test(link) ? link : `https://${link}`;
}
