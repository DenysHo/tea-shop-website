export const SUPPORTED_LOCALES = ["en", "de"];
export const DEFAULT_LOCALE = "en";

export function isSupportedLocale(value) {
  return SUPPORTED_LOCALES.includes(value);
}

export function asTranslated(value) {
  const fallback = { en: "", de: "" };
  if (value && typeof value === "object") {
    return { ...fallback, ...value };
  }
  return fallback;
}

export function asTranslatedArray(value) {
  if (Array.isArray(value)) {
    return value.map(asTranslated);
  }
  return [];
}

export function resolveTranslated(field, locale) {
  return field[locale] || field[DEFAULT_LOCALE];
}
