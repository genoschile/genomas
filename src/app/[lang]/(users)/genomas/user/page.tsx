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
import { ArticleContainer } from "@/components/container/ProjectHomeArticleContainer";
import { TableInputFiles } from "@/components/analysis/tables/TableInputFiles";
import { TableOutputFiles } from "@/components/analysis/tables/TableOutputFiles";

export default function Page() {
  const { selectedCards } = useProjectContext();

  return (
    <>
      <ArticleContainer>
        <ProjectHeaderUser />
        <section className="project__list--container">
          <ProjectCardList />
        </section>
      </ArticleContainer>

      <ArticleContainer>
        <FilesProjectSelected />
      </ArticleContainer>

      <ArticleContainer>
        <TrashContainer />
      </ArticleContainer>

      <ArticleContainer>
        <TableInputFiles />
      </ArticleContainer>

      <ArticleContainer>
        <TableOutputFiles />
      </ArticleContainer>

      {selectedCards.length > 0 && <SidebarInfoProjectSelect />}
    </>
  );
}
