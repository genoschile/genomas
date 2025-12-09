"use client";
import "./style.css";
import "./layout.css";

import { Suspense, useState } from "react";
import { ModalContainer } from "../modals/components/ModalContainer";
import { SidebarOrganization } from "./components/SidebarOrganization/SidebarOrganization";
import { CommandMenu } from "./components/SidebarOrganization/components/Search";
import { TopBar } from "./components/SidebarOrganization/components/TopBar";
import { ThemeProvider } from "../theme/context/ThemeContext";

export const EnterprisePageLayout = ({
  children,
  role,
}: {
  children: React.ReactNode;
  role: "super-admin" | "admin" | "user";
}) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSetOpenSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  return (
    <ThemeProvider>
      <ModalContainer />
      <main className="enterpriselayout">
        <SidebarOrganization
          openSidebar={openSidebar}
          handleSetOpenSidebar={handleSetOpenSidebar}
          role={role}
        />
        <TopBar handleSetOpenSidebar={handleSetOpenSidebar} />
        <section>
          <Suspense fallback={<p>Loading ...</p>}>{children}</Suspense>
          <CommandMenu />
        </section>
      </main>
    </ThemeProvider>
  );
};
