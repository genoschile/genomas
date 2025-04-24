import { useRouter } from "next/navigation";
import { useTranslations } from "@/context/I18nClientProvider";
import "./i18nButton.css";
import { Language } from "@/lib/i18n/i18n.types";

const DEFAULT_LANG: Language = process.env.NEXT_PUBLIC_APP_LANGUAGE as Language || "es";

export const I18nButton = () => {
  const router = useRouter();
  const { setLang } = useTranslations();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as Language;

    if (!newLang) return;

    await setLang(newLang);
    router.refresh();
  };

  return (
    <div className="select-dropdown">
      <select defaultValue={DEFAULT_LANG} onChange={handleChange}>
        <option value="">Elige tu idioma</option>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};