/* metadata */
import type { Metadata } from "next";

/* styles */
import "../globals.css";
import "react-toastify/dist/ReactToastify.css";

/* fonts */
import { inter } from "@/lib/fonts/fonts";

/* components */
import { ToastContainer } from "react-toastify";

import { I18nServerProvider } from "@/context/I18nServerProvider";
import { Language } from "@/lib/i18n/i18n.types";
import { ModalProvider } from "@/context/ModalsProject";

export const metadata: Metadata = {
  title: "Genomas",
  description:
    "GENOMAS offers a centralized platform for all your genomic data, ensuring your analyses are always synchronized, accessible, and secure.",
};

export async function generateStaticParams() {
  return [
    {
      lang: process.env.APP_LANGUAGE as Language,
    },
  ];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;

  return (
    <html lang={`${lang}`}>
      <body className={`${inter} antialiased`}>
        <I18nServerProvider lang={`${lang}`}>
          <ModalProvider>
            {children}
            <ToastContainer position="top-right" autoClose={5000} />
          </ModalProvider>
        </I18nServerProvider>
      </body>
    </html>
  );
}
