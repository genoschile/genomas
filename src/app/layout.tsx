/* metadata */
import type { Metadata } from "next";

/* styles */
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

/* fonts */
import { inter } from "@/lib/fonts/fonts";

/* components */
import { ToastContainer } from "react-toastify";
import { unstable_ViewTransition as ViewTransition } from "react";

export const metadata: Metadata = {
  title: "Genomas",
  description: "GENOMAS offers a centralized platform for all your genomic data, ensuring your analyses are always synchronized, accessible, and secure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter} antialiased`}>
        <ViewTransition name="page">{children}</ViewTransition>
        <ToastContainer position="top-right" autoClose={5000} />
      </body>
    </html>
  );
}
