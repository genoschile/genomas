"use client";

import { AccountToggle } from "./components/AccountToggle";
import { Plan } from "./components/Plan";
import { RouteSelect } from "./components/RouteSelect";
import { Search } from "./components/Search";

import "./sidebarOrganization.css";

export function SidebarOrganization() {
  return (
    <aside className="sidebar-org">
      <div className="sidebar-org--container ">
        <AccountToggle />
        <Search />
        <div className="sidebar-org--routecontainer">
          <RouteSelect />
        </div>
      </div>
      <Plan />
    </aside>
  );
}
