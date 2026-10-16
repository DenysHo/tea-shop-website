import "server-only";
import { prisma } from "@/lib/prisma";

function computeTotalCents(items) {
    return items.reduce((sum, it) => sum + it.priceCents * it.quantity, 0);
}

function assertOrderInput({
    customerName,
    email,
    country,
    postalCode,
    city,
    street,
    houseNumber,
    items,
}) {
    if (!customerName?.trim()) throw new Error("Name is required");
    if (!email?.trim()) throw new Error("Email is required");
    if (!country?.trim()) throw new Error("Country is required");
    if (!postalCode?.trim()) throw new Error("Postal code is required");
    if (!city?.trim()) throw new Error("City is required");
    if (!street?.trim()) throw new Error("Street is required");
    if (!houseNumber?.trim()) throw new Error("House number is required");
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Cart is empty");
    }
}

export async function createOrder(input) {
    assertOrderInput(input);

    const {
        customerName,
        email,
        phone,
        country,
        postalCode,
        city,
        street,
        houseNumber,
        note,
        items,
    } = input;

    const totalCents = computeTotalCents(items);

    return prisma.order.create({
        data: {
            customerName: customerName.trim(),
            email: email.trim(),
            phone: phone?.trim() || null,
            country: country.trim(),
            postalCode: postalCode.trim(),
            city: city.trim(),
            street: street.trim(),
            houseNumber: houseNumber.trim(),
            note: note?.trim() || null,
            items,
            totalCents,
        },
    });
}