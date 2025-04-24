import { Language } from "@/lib/i18n/i18n.types";
import api from "@/lib/i18n/api";
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
    <I18nClientProvider initialDictionary={dictionary}>{children}</I18nClientProvider>
  );
}
