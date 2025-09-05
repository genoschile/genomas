import { TableInputFiles } from "@/components/analysis/tables/TableInputFiles";
import { ArticleContainer } from "@/components/container/ProjectHomeArticleContainer";
import { ProjectHomeHeaderContainer } from "@/components/container/ProjectHomeHeaderContainer";

export const InputFilesProjects = () => {
  return (
    <ArticleContainer>
      <ProjectHomeHeaderContainer title="Task process resume" navButtons={[]} />
      <TableInputFiles />
    </ArticleContainer>
  );
};
