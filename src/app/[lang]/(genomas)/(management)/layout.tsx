import { EnterprisePageLayout } from "@/features/enterprise/page_layout";

export default function BaseLayout({ children, role }: BaseLayoutProps) {
  return <EnterprisePageLayout role={role}>{children}</EnterprisePageLayout>;
}
