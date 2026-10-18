export const SITE = {
    name: "Zentee",
    owner: "Denys HO",
    street: "Denys street 1",
    city: "12345 Berlin",
    email: "hello@example.com",
    phone: "+49 123 456789",
    instagram: {
        handle: "zentee_teehaus",
        url: "https://www.instagram.com/zentee_teehaus/",
    },
    providers: {
        hosting: "[HOSTING-ANBIETER, z. B. Vercel Inc.]",
        database: "[DATENBANK-ANBIETER]",
        email: "[E-MAIL-DIENSTLEISTER, z. B. Resend]",
        logRetentionDays: "[ANZAHL]",
    },
};

const CONTACT_FIELDS = {
    "{owner}": SITE.owner,
    "{street}": SITE.street,
    "{city}": SITE.city,
    "{email}": SITE.email,
    "{phone}": SITE.phone,
    "{hosting}": SITE.providers.hosting,
    "{database}": SITE.providers.database,
    "{emailService}": SITE.providers.email,
    "{logDays}": SITE.providers.logRetentionDays,
};

export function fillContacts(text) {
    return Object.entries(CONTACT_FIELDS).reduce(
        (result, [token, value]) => result.replaceAll(token, value),
        text
    );
}
