const formatters = {};

export function formatMoney(amountCents, locale, currency = "EUR") {
    const key = `${currency}-${locale}`;
    if (!formatters[key]) {
        formatters[key] = new Intl.NumberFormat(locale, {
            style: "currency",
            currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }
    return formatters[key].format(amountCents / 100);
}