/* metadata */
import type { Metadata } from "next";

/* fonts */
import { inter } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "Genomas",
  description:
    "GENOMAS offers a centralized platform for all your genomic data, ensuring your analyses are always synchronized, accessible, and secure.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={`en`}>
      <body className={`${inter} antialiased`}>{children}</body>
    </html>
  );
}
