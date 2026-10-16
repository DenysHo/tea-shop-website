import "server-only";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const r2 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

export async function uploadImage(key, body, contentType) {
    await r2.send(
        new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: key,
            Body: body,
            ContentType: contentType,
        })
    );
}

export async function deleteImagesFromR2(keys) {
    if (!keys || keys.length === 0) return;
    const results = await Promise.allSettled(
        keys.map((Key) =>
            r2.send(new DeleteObjectCommand({ Bucket: process.env.R2_BUCKET_NAME, Key }))
        )
    );
    results.forEach((r, i) => {
        if (r.status === "rejected") console.error("R2 delete failed:", keys[i], r.reason);
    });
}