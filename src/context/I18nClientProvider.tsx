"use client";

import { createContext, useContext, useState } from "react";
import api, { createTranslator } from "@/lib/i18n/api";
import {
  Language,
  TranslationKey,
  TranslationParams,
} from "@/lib/i18n/i18n.types";

type I18nContextType = {
  t: (key: TranslationKey, params?: TranslationParams) => string;
  setLang: (lang: Language) => void;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nClientProvider({
  children,
  initialDictionary,
}: {
  children: React.ReactNode;
  initialDictionary: Record<string, string>;
}) {
  const [dictionary, setDictionary] = useState(initialDictionary);
  const [translator, setTranslator] = useState(() =>
    createTranslator(initialDictionary)
  );

  const setLang = async (lang: Language) => {
    const { dictionary } = await api.fetch(lang);
    setDictionary(dictionary);
    setTranslator(() => createTranslator(dictionary));
  };

  return (
    <I18nContext.Provider value={{ t: translator, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslations must be used within I18nClientProvider");
  }
  return context;
}
