// Shop name and contacts. Change them here, they are used across the site.
export const SITE = {
  name: "Zentee",
  email: "hello@example.com", // TODO: real email
  instagram: {
    handle: "zentee_teehaus",
    url: "https://www.instagram.com/zentee_teehaus/",
  },
};

// Puts the site email into legal texts that contain "{email}".
export function fillContacts(text) {
  return text.replaceAll("{email}", SITE.email);
}
