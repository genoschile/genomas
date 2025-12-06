import { Language } from "@/features/lang/types/i18n.types";
import api from "@/features/lang/api";
import { I18nClientProvider } from "./I18nClientProvider";

export async function I18nServerProvider({
  lang,
  children,
}: {
  lang: Language;
  children: React.ReactNode;
}) {
  const { dictionary } = await api.fetch(lang);

  return (
    <I18nClientProvider initialDictionary={dictionary}>
      {children}
    </I18nClientProvider>
  );
}
