"use client";

/* contexts */
import { ModalProvider } from "@/features/modals/context/ModalsProject";
import { EnterprisePageLayout } from "@/features/enterprise/page_layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EnterprisePageLayout role="super-admin">
      <ModalProvider>{children}</ModalProvider>
    </EnterprisePageLayout>
  );
}
