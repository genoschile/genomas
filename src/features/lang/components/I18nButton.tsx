"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "@/features/lang/context/I18nClientProvider";
import { Language } from "@/features/lang/types/i18n.types";
import "./i18nButton.css";

const DEFAULT_LANG: Language =
  (process.env.NEXT_PUBLIC_APP_LANGUAGE as Language) || "es";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

function setCookie(name: string, value: string, days = 30) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

export const I18nButton = () => {
  const router = useRouter();
  const { setLang } = useTranslations();
  const [currentLang, setCurrentLang] = useState<Language>(DEFAULT_LANG);

  useEffect(() => {
    const savedLang = getCookie("lang") as Language;
    if (savedLang && savedLang !== currentLang) {
      setCurrentLang(savedLang);
      setLang(savedLang);
    }
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as Language;
    if (!newLang) return;

    setLang(newLang);
    setCurrentLang(newLang);
    setCookie("lang", newLang);
    router.refresh();
  };

  return (
    <div className="select-dropdown" onClick={(e) => e.stopPropagation()}>
      <label htmlFor="language-select" className="visually-hidden">
        Seleccionar idioma
      </label>
      <select id="language-select" value={currentLang} onChange={handleChange}>
        <option value="es">🇪🇸 Español</option>
        <option value="en">🇺🇸 English</option>
        <option value="fr">fr Francés</option>
      </select>
    </div>
  );
};
