"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/session";
import { ORDER_STATUSES } from "@/lib/orderStatus";

async function requireAdmin() {
    const session = await getAdminSession();
    if (!session.isLoggedIn) redirect("/admin/login");
}

export async function updateOrderStatusAction(id, status) {
    await requireAdmin();

    if (!ORDER_STATUSES.includes(status)) {
        throw new Error("Invalid status");
    }

    await prisma.order.update({ where: { id }, data: { status } });
    revalidatePath("/admin/orders");
}