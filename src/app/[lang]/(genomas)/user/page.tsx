"use client";

/* components */
import { SidebarInfoProjectSelect } from "@/components/sidebar/sidebarInfoProjectSelect/SidebarInfoProjectSelect";
import { UserProject } from "../../../../features/user/components/sectionsHome/UserProject";

/* style */
import "./page.css";

export default function Page() {
  return (
    <>
      <UserProject />
      <SidebarInfoProjectSelect />
    </>
  );
}
