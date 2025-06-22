import { TableOutputFiles } from "@/components/analysis/tables/TableOutputFiles";
import { ArticleContainer } from "@/components/container/ProjectHomeArticleContainer";
import { ProjectHomeHeaderContainer } from "@/components/container/ProjectHomeHeaderContainer";
import { IoIosAdd } from "react-icons/io";

export const OutputFilesProjects = () => {
  const navButtonsOutputFiles = [
    {
      id: "new-output-file",
      label: "New Output File",
      icon: <IoIosAdd size="24" />,
      onClick: () => console.log("Open modal to add new output file"),
      disabled: false,
    },
    {
      id: "delete-output-file",
      label: "Delete Output File",
      icon: null,
      onClick: () => console.log("Open modal to delete output file"),
      disabled: false,
    },
  ];

  return (
    <ArticleContainer>
      <ProjectHomeHeaderContainer
        title="Output Files"
        navButtons={navButtonsOutputFiles}
      >
        <div>
          <button>hola</button>
        </div>
      </ProjectHomeHeaderContainer>
      <TableOutputFiles />
    </ArticleContainer>
  );
};
