import type { Language, TranslationKey, TranslationParams } from "./layout";

export const createTranslator = (dictonary: Record<string, string>) => {
  return function t(key: TranslationKey, params?: TranslationParams): string {
    const translation = dictonary[key] || key;

    if (!params) return translation;

    return translation.replace(/\{(\w*)}/g, (_, param) => {
      return String(params[param] ?? `{${param}}`);
    });
  };
};

const api = {
  async fetch(lang: Language) {
    try {
      const dictionary = await import(`./${lang}.json`).then((module) => {
        return module.default;
      });

      return {
        dictionary,
        t: createTranslator(dictionary),
      };
    } catch (error) {
      console.log(error);

      throw new Error("Failed to fetch dictionary");
    }
  },
};

export default api;
