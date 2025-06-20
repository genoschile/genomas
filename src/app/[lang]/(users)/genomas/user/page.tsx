"use client";

/* components */
import { ProjectCardList } from "@/components/project/ProjectCardList";
import { SidebarInfoProjectSelect } from "@/components/sidebar/sidebarInfoProjectSelect/SidebarInfoProjectSelect";
import { FilesProjectSelected } from "./components/FilesProjectSelected";
import { TrashContainer } from "./components/TrashContainer";
import { ArticleContainer } from "@/components/container/ProjectHomeArticleContainer";
import { TableInputFiles } from "@/components/analysis/tables/TableInputFiles";
import { TableOutputFiles } from "@/components/analysis/tables/TableOutputFiles";
import { ProjectHomeHeaderContainer } from "@/components/container/ProjectHomeHeaderContainer";
import { ProjectWorkspaceSelected } from "@/components/project/ProjectWorkspaceSelected";

/* style */
import "./page.css";

/* context */
import { MODAL_IDS } from "@/context/ModalsProject";

/* hooks */
import { useProjectContext } from "@/hooks/useProjectContext";
import { IoIosAdd } from "react-icons/io";
import { useModalContext } from "@/hooks/useModalsProject";
import { ProjectFilesSelected } from "./components/ProjectFilesSelected";
import { useState } from "react";
import { WorkerNameSelected } from "./components/WorkerNameSelected";
import { GenomeVersionRefSelected } from "./components/GenomeVersionRefSelected";

export default function Page() {
  return (
    <>
      <UserProject />

      <FilesProject />

      <TrashProject />

      <InputFilesProjects />

      <OutputFilesProjects />

      <SidebarInfoProjectSelect />
    </>
  );
}

export const UserProject = () => {
  const { openModal } = useModalContext();
  const { projects } = useProjectContext();
  const { selectedCards } = useProjectContext();

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
      disabled: projects.length === 0 || selectedCards.length === 0,
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

const ExampleResFastAPI = {
  organizationId: "org-123" /* ✔️ */,
  userId: "user-456" /* ✔️ */,
  workspaceId: "workspace-789" /* ✔️ */,
  inputFiles: [
    {
      fileName: "sample1.fastq",
      fileType: "fastq",
      fileSize: 123456,
      filePath: "/uploads/sample1.fastq",
      pipeline: "Run Alignment & Mapping",
      status: "done",
      idprocess: "PID-123",
    },
  ] /* ✔️ */,
  workerName: "worker-1" /* ✔️ */,
  genomeVersionRef: "hg38" /* ✔️ */,
};

export const FilesProject = () => {
  const { openModal } = useModalContext();
  const { projects } = useProjectContext();
  const [currentProject, setCurrentProject] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const onChangeProject = (project: { id: string; name: string } | null) => {
    if (!project) {
      setCurrentProject(null);
      return;
    }

    setCurrentProject(project);
  };

  const navButtonsProjectFiles = [
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
        title="Project Files"
        navButtons={navButtonsProjectFiles}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <ProjectFilesSelected
            projects={projects}
            onChangeProject={onChangeProject}
            currentProject={currentProject}
          />

          <WorkerNameSelected />

          <GenomeVersionRefSelected />
        </div>
      </ProjectHomeHeaderContainer>

      <FilesProjectSelected currentProject={currentProject} />
    </ArticleContainer>
  );
};

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
        title="Input Files"
        navButtons={navButtonsInputFiles}
      ></ProjectHomeHeaderContainer>
      <TableInputFiles />
    </ArticleContainer>
  );
};

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
