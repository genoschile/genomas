import { Suspense } from "react";
import "./style.css";

import { SidebarOrganization } from "@/components/sidebar/SidebarOrganization/SidebarOrganization";
import { TopBar } from "@/components/sidebar/SidebarOrganization/components/TopBar";

export default function EnterpriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="enterpriselayout">
      <SidebarOrganization />

      <div>
        <TopBar />
        <Suspense fallback="Cargando hijo ...">{children}</Suspense>
      </div>
      
    </main>
  );
}
