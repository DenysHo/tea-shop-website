export const SITE = {
  name: "Zentee",
  email: "hello@example.com",
  instagram: {
    handle: "zentee_teehaus",
    url: "https://www.instagram.com/zentee_teehaus/",
  },
};

export function fillContacts(text) {
  return text.replaceAll("{email}", SITE.email);
}
