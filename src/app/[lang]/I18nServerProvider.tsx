import { Language } from "./layout";
import api from "./api";
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
    <I18nClientProvider dictionary={dictionary}>{children}</I18nClientProvider>
  );
}
