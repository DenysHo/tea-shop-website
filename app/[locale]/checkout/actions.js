"use server";

import { createOrder } from "@/lib/orders";

export async function submitOrderAction(payload) {
    try {
        const order = await createOrder(payload);
        return { ok: true, id: order.id };
    } catch (err) {
        return { ok: false, error: err.message };
    }
}