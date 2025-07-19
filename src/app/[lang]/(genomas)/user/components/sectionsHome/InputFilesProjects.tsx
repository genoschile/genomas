import { TableInputFiles } from "@/components/analysis/tables/TableInputFiles";
import { ArticleContainer } from "@/components/container/ProjectHomeArticleContainer";
import { ProjectHomeHeaderContainer } from "@/components/container/ProjectHomeHeaderContainer";
import { IoIosAdd } from "react-icons/io";

export const InputFilesProjects = () => {
  const navButtonsInputFiles = [
    {
      id: "new-input-file",
      label: "New Input File",
      icon: <IoIosAdd size="24" />,
      onClick: () => console.log("Open modal to add new input file"),
      disabled: false,
    },
    {
      id: "delete-input-file",
      label: "Delete Input File",
      icon: null,
      onClick: () => console.log("Open modal to delete input file"),
      disabled: false,
    },
  ];

  return (
    <ArticleContainer>
      <ProjectHomeHeaderContainer
        title="Task process resume"
        // navButtons={navButtonsInputFiles}
        navButtons={[]}
      />
      <TableInputFiles />
    </ArticleContainer>
  );
};
