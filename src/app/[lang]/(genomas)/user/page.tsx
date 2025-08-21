"use client";

/* components */
import { SidebarInfoProjectSelect } from "@/components/sidebar/sidebarInfoProjectSelect/SidebarInfoProjectSelect";
import { FilesProject } from "./components/sectionsHome/FilesProject";
import { InputFilesProjects } from "./components/sectionsHome/InputFilesProjects";
import { OutputFilesProjects } from "./components/sectionsHome/OutputFilesProjects";
import { TrashProject } from "./components/sectionsHome/TrashProject";
import { UserProject } from "./components/sectionsHome/UserProject";

/* style */
import "./page.css";

export default function Page() {
  return (
    <>
      <UserProject />

      {/* <FilesProject /> */}

      <InputFilesProjects />

      <TrashProject />

      <OutputFilesProjects />

      <SidebarInfoProjectSelect />
    </>
  );
}
