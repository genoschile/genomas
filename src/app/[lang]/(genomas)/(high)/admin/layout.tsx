"use client";

/* contexts */
import { ThemeProvider } from "@/context/enterprise/ThemeContext";
import { ModalProvider } from "@/context/ModalsProject";

/* hooks */
import BaseLayout from "../BaseLayout";

export default function EnterpriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <ModalProvider>
        <BaseLayout role="admin">{children}</BaseLayout>
      </ModalProvider>
    </ThemeProvider>
  );
}
