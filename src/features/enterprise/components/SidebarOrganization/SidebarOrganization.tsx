"use client";

import { AccountToggle } from "./components/AccountToggle";
import { Plan } from "./components/Plan";
import { RouteSelect } from "./components/RouteSelect";

import "./sidebarOrganization.css";

export function SidebarOrganization({
  openSidebar,
  handleSetOpenSidebar,
  role,
}: {
  openSidebar?: boolean;
  handleSetOpenSidebar?: () => void;
  role?: "super-admin" | "admin" | "user";
}) {
  return (
    <>
      {openSidebar && (
        <div className="sidebar-backdrop" onClick={handleSetOpenSidebar} />
      )}
      <aside className={`sidebar-org ${openSidebar ? "open" : ""}`}>
        <div className="sidebar-org--container">
          <AccountToggle role={role} />
          <RouteSelect role={role} />
        </div>
        <Plan />
      </aside>
    </>
  );
}
