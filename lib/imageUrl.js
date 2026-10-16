export function getDomainsImageUrl(key) {
    if (!key) return null;
    return `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`;
}