export const SITE = {
    name: "Zentee",
    email: "denys.ho.de@gmail.com", // TODO: real email
    instagram: {
        handle: "zentee_teehaus",
        url: "https://www.instagram.com/zentee_teehaus/",
    },
};

export function fillContacts(text) {
    return text.replaceAll("{email}", SITE.email);
}