import { ArticleContainer } from "@/components/container/ProjectHomeArticleContainer";
import { ProjectHomeHeaderContainer } from "@/components/container/ProjectHomeHeaderContainer";
import { ProjectCardList } from "@/components/project/ProjectCardList";
import { ProjectWorkspaceSelected } from "@/components/project/ProjectWorkspaceSelected";
import { MODAL_IDS } from "@/context/ModalsProject";
import { useModalContext } from "@/hooks/useModalsProject";
import { useProjectContext } from "@/hooks/useProjectContext";
import { IoIosAdd } from "react-icons/io";

export const UserProject = () => {
  const { openModal } = useModalContext();
  const { projects } = useProjectContext();

  const navButtonsUserProject = [
    {
      id: "new-project",
      label: "New",
      icon: <IoIosAdd size="24" />,
      onClick: () => openModal(MODAL_IDS.WORKSPACE),
      disabled: false,
    },
    {
      id: "move-to-trash",
      label: "Move To Trash",
      icon: null,
      onClick: () => openModal(MODAL_IDS.DELETE_CONFIRMATION),
      disabled: projects.length === 0,
    },
  ];

  return (
    <ArticleContainer>
      <ProjectHomeHeaderContainer
        title="User Project"
        navButtons={navButtonsUserProject}
      >
        <ProjectWorkspaceSelected />
      </ProjectHomeHeaderContainer>
      <section className="project__list--container">
        <ProjectCardList />
      </section>
    </ArticleContainer>
  );
};
