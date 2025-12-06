export type Language = "es" | "en" | "fr" | "de" | "it";
export type TranslationKey = keyof typeof import("../translate/es.json");
export type TranslationParams = Record<string, string | number>;
