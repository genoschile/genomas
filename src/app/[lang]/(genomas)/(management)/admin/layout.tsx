"use client";

/* contexts */
import { ThemeProvider } from "@/features/theme/context/ThemeContext";
import { ModalProvider } from "@/features/modals/context/ModalsProject";

/* hooks */
import BaseLayout from "../layout";

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
