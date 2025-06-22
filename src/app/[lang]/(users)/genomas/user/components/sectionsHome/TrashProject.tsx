import { ArticleContainer } from "@/components/container/ProjectHomeArticleContainer";
import { ProjectHomeHeaderContainer } from "@/components/container/ProjectHomeHeaderContainer";
import { MODAL_IDS } from "@/context/ModalsProject";
import { useModalContext } from "@/hooks/useModalsProject";
import { useProjectContext } from "@/hooks/useProjectContext";
import { TrashContainer } from "../TrashContainer";

export const TrashProject = () => {
  const { openModal } = useModalContext();
  const { projects } = useProjectContext();
  const { selectedCards } = useProjectContext();

  const navButtonsTrashContainer = [
    {
      id: "restore",
      label: "Restore",
      icon: null,
      onClick: () => openModal(MODAL_IDS.DELETE_CONFIRMATION),
      disabled: projects.length === 0 || selectedCards.length === 0,
    },
    {
      id: "delete-permanently",
      label: "Delete Permanently",
      icon: null,
      onClick: () => openModal(MODAL_IDS.DELETE_CONFIRMATION),
      disabled: projects.length === 0 || selectedCards.length === 0,
    },
  ];
  return (
    <ArticleContainer>
      <ProjectHomeHeaderContainer
        title="Trash"
        navButtons={navButtonsTrashContainer}
      >
        <div
          style={{
            width: "100%",
            marginBlock: "0",
            marginInline: "auto",
          }}
        >
          <p
            className="project__trash--description"
            style={{
              textAlign: "center",
              width: "60%",
              marginInline: "auto",
            }}
          >
            Here you can find all the projects that have been moved to the
            trash. You can restore them or delete them permanently.
          </p>
        </div>
      </ProjectHomeHeaderContainer>

      <TrashContainer />
    </ArticleContainer>
  );
};
