import { Suspense } from "react";
import "./style.css";

import { SidebarOrganization } from "@/components/sidebar/SidebarOrganization/SidebarOrganization";
import { TopBar } from "@/components/sidebar/SidebarOrganization/components/TopBar";
import { FooterLanding } from "@/components/footer/FooterLanding";

export default function EnterpriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="enterpriselayout">
      <SidebarOrganization />

      <TopBar />
      <section>
        <Suspense fallback={<p> Loading ... </p>}>{children}</Suspense>
      </section>
    </main>
  );
}
