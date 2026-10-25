export function getDomainsImageUrl(key) {
    if (!key) return null;
    return `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`;
}

export function getImageSrc(key) {
    if (key?.startsWith("/")) return key;
    return getDomainsImageUrl(key);
}
