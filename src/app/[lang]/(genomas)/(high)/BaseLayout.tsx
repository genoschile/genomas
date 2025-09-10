"use client";

/* styles */
import "./style.css";
import "./layout.css";

import { Suspense, useState } from "react";
import { SidebarOrganization } from "@/app/[lang]/(genomas)/(high)/enterprise/components/SidebarOrganization/SidebarOrganization";
import { TopBar } from "@/app/[lang]/(genomas)/(high)/enterprise/components/SidebarOrganization/components/TopBar";
import { ModalContainer } from "@/components/modals/ModalContainer";
import { CommandMenu } from "@/app/[lang]/(genomas)/(high)/enterprise/components/SidebarOrganization/components/Search";

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSetOpenSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  const user = { role: "admin" }; 

  return (
    <>
      <ModalContainer />
      <main className="enterpriselayout">
        <SidebarOrganization
          openSidebar={openSidebar}
          handleSetOpenSidebar={handleSetOpenSidebar}
          role={user.role}
        />
        <TopBar handleSetOpenSidebar={handleSetOpenSidebar} />
        <section>
          <Suspense fallback={<p>Loading ...</p>}>{children}</Suspense>
          <CommandMenu />
        </section>
      </main>
    </>
  );
}
