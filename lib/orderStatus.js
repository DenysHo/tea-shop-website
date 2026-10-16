export const ORDER_STATUSES = [
    "NEW",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELED",
];

const labels = {
    NEW: "New",
    PROCESSING: "Processing",
    SHIPPED: "Shipped",
    DELIVERED: "Delivered",
    CANCELED: "Canceled",
};

const badgeClasses = {
    NEW: "bg-bamboo/20 text-ink",
    PROCESSING: "bg-clay/15 text-clay",
    SHIPPED: "bg-matcha/15 text-matcha",
    DELIVERED: "bg-matcha text-white",
    CANCELED: "bg-seal/15 text-seal",
};

export function orderStatusLabel(status) {
    return labels[status] ?? status;
}

export function orderStatusBadgeClass(status) {
    return badgeClasses[status] ?? "bg-stone/15 text-stone";
}