export function isWeightedTea(item) {
    return item.category === "tea" && item.saleUnitGrams > 0;
}

export function cartLineQuantityLabel(item, pieceLabel = "pc") {
    if (isWeightedTea(item)) {
        return `${item.quantity} × ${item.saleUnitGrams}g (${item.quantity * item.saleUnitGrams
            }g)`;
    }
    return `${item.quantity} × ${pieceLabel}`;
}