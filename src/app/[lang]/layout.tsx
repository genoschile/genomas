/* metadata */
import type { Metadata } from "next";

/* styles */
import "@styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

/* fonts */
import { inter } from "@/styles/fonts";

/* components */
import { ToastContainer } from "react-toastify";

import { I18nServerProvider } from "@/features/lang/context/I18nServerProvider";
import { Language } from "@/features/lang/types/i18n.types";
import { ModalProvider } from "@/context/ModalsProject";
import { ReactNode } from "react";
import { APP_LANGUAGE } from "@/config/env";

export type LangLayoutProps = {
  children: ReactNode;
  params: { lang: Language };
};

export const metadata: Metadata = {
  title: "Genomas",
  description:
    "GENOMAS offers a centralized platform for all your genomic data, ensuring your analyses are always synchronized, accessible, and secure.",
};

export async function generateStaticParams() {
  return [
    {
      lang: APP_LANGUAGE as Language,
    },
  ];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body className={`${inter} antialiased`}>
        <I18nServerProvider lang={lang as Language}>
          <ModalProvider>
            {children}
            <ToastContainer position="top-right" autoClose={5000} />
          </ModalProvider>
        </I18nServerProvider>
      </body>
    </html>
  );
}
