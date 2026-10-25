import "server-only";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

const API = "https://graph.instagram.com";
const POST_COUNT = 6;
const REFRESH_AFTER_MS = 7 * 24 * 60 * 60 * 1000;

async function storedToken() {
    const row = await prisma.instagramToken.findUnique({ where: { id: 1 } });
    if (row) return row;

    const token = process.env.INSTAGRAM_TOKEN;
    if (!token) return null;
    return prisma.instagramToken.create({ data: { id: 1, token } });
}

async function refreshToken(token) {
    const res = await fetch(
        `${API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
    );
    if (!res.ok) return token;

    const { access_token } = await res.json();
    await prisma.instagramToken.update({
        where: { id: 1 },
        data: { token: access_token, refreshedAt: new Date() },
    });
    return access_token;
}

async function currentToken() {
    const row = await storedToken();
    if (!row) return null;

    const isOld = Date.now() - row.refreshedAt.getTime() > REFRESH_AFTER_MS;
    return isOld ? refreshToken(row.token) : row.token;
}

function toPost(media) {
    return {
        id: media.id,
        image: media.media_type === "VIDEO" ? media.thumbnail_url : media.media_url,
        url: media.permalink,
    };
}

async function fetchPosts() {
    const token = await currentToken();
    if (!token) throw new Error("INSTAGRAM_TOKEN is not set");

    const fields = "id,media_type,media_url,thumbnail_url,permalink";
    const res = await fetch(
        `${API}/me/media?fields=${fields}&limit=${POST_COUNT}&access_token=${token}`
    );
    const body = await res.json();
    if (!res.ok) throw new Error(body.error?.message ?? res.statusText);

    return body.data.map(toPost).filter((post) => post.image);
}

const cachedPosts = unstable_cache(fetchPosts, ["instagram-posts-v2"], {
    revalidate: 3600,
});

export async function getInstagramPosts() {
    try {
        return await cachedPosts();
    } catch (error) {
        console.error("Instagram:", error.message);
        return [];
    }
}
