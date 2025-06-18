"use client";

/* components */
import { ProjectCardList } from "@/components/project/ProjectCardList";
import { ProjectHeaderUser } from "@/components/project/ProjectHeaderUser";
import { SidebarInfoProjectSelect } from "@/components/sidebar/sidebarInfoProjectSelect/SidebarInfoProjectSelect";

/* style */
import "./page.css";

/* hooks */
import { useProjectContext } from "@/hooks/useProjectContext";
import { FilesProjectSelected } from "./components/FilesProjectSelected";
import { TrashContainer } from "./components/TrashContainer";

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

      <article>
        <FilesProjectSelected />
      </article>

      <article className="project__home--article">
        <div className="project__home--container">
          <TrashContainer />
        </div>
      </article>

      {selectedCards.length > 0 && <SidebarInfoProjectSelect />}
    </>
  );
}
