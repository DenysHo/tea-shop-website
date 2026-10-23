import "server-only";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

const MAX_FAILURES = 5;
const LOCK_MS = 15 * 60 * 1000;

export function clientIp() {
    const forwarded = headers().get("x-forwarded-for");
    return forwarded?.split(",")[0].trim() || "unknown";
}

export async function isLocked(ip) {
    const entry = await prisma.loginAttempt.findUnique({ where: { ip } });
    return Boolean(entry?.lockedUntil && entry.lockedUntil > new Date());
}

export async function recordFailure(ip) {
    const entry = await prisma.loginAttempt.upsert({
        where: { ip },
        update: { failures: { increment: 1 } },
        create: { ip, failures: 1 },
    });
    if (entry.failures >= MAX_FAILURES) {
        await prisma.loginAttempt.update({
            where: { ip },
            data: { failures: 0, lockedUntil: new Date(Date.now() + LOCK_MS) },
        });
    }
}

export async function clearFailures(ip) {
    await prisma.loginAttempt.deleteMany({ where: { ip } });
}
