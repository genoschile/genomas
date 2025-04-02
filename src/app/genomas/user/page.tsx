"use client";

import "./page.css";
import { ProjectCardList } from "@/components/project/ProjectCardList";
import { ProjectHeaderUser } from "@/components/project/ProjectHeaderUser";
import ProjectUserTable from "@/components/project/table/ProjectUserTable";

export default function Page() {
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
    </>
  );
}
