"use client";

/* components */
import { ProjectCardList } from "@/components/project/ProjectCardList";
import { ProjectHeaderUser } from "@/components/project/ProjectHeaderUser";
import ProjectUserTable from "@/components/project/table/ProjectUserTable";
import { SidebarInfoProjectSelect } from "@/components/sidebar/sidebarInfoProjectSelect/SidebarInfoProjectSelect";

/* style */
import "./page.css";

/* hooks */
import { useProjectContext } from "@/hooks/useProjectContext";


export default function Page() {
  const { selectedCards } = useProjectContext();
  
  return (
    <>
      <article className="project__home--article">
        <div className="project__home--container">
          <ProjectHeaderUser />
          <section className="project__list--container">
            <ProjectCardList />
          </section>
        </div>
      </article>

      <article className="project__home--article">
        <div className="project__home--container">
          <ProjectUserTable />
        </div>
      </article>

      {selectedCards.length > 0 && <SidebarInfoProjectSelect />}
    </>
  );
}
