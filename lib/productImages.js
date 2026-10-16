import "server-only";
import { uploadImage, deleteImagesFromR2 } from "@/lib/r2";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

export async function uploadNewImages(formData) {
    const files = formData
        .getAll("newImages")
        .filter((f) => f instanceof File && f.size > 0);

    const keys = [];
    for (const file of files) {
        if (!file.type.startsWith("image/") || file.size > MAX_IMAGE_SIZE) {
            keys.push(null);
            continue;
        }
        const ext =
            (file.name.split(".").pop() || "jpg")
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "") || "jpg";
        const key = `products/${crypto.randomUUID()}.${ext}`;
        await uploadImage(key, Buffer.from(await file.arrayBuffer()), file.type);
        keys.push(key);
    }
    return keys;
}

export function resolveImageOrder(formData, oldKeys, uploaded) {
    if (!formData.has("imagesField")) return oldKeys;

    const seen = new Set();
    const images = [];
    for (const token of formData.getAll("imageOrder").map(String)) {
        const key = token.startsWith("new:")
            ? uploaded[Number(token.slice(4))]
            : oldKeys.includes(token)
                ? token
                : null;
        if (key && !seen.has(key)) {
            seen.add(key);
            images.push(key);
        }
    }
    return images;
}

export async function processImagesForSave(formData, oldKeys) {
    const uploaded = await uploadNewImages(formData);
    const uploadedKeys = uploaded.filter(Boolean);
    const images = resolveImageOrder(formData, oldKeys, uploaded);

    await deleteImagesFromR2(uploadedKeys.filter((k) => !images.includes(k)));

    return {
        images,
        uploadedKeys,
        async cleanupAfterSave() {
            await deleteImagesFromR2(oldKeys.filter((k) => !images.includes(k)));
        },
        async cleanupOnError() {
            await deleteImagesFromR2(uploadedKeys);
        },
    };
}

export { deleteImagesFromR2 };