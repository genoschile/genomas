import { ArticleContainer } from "@/components/container/ProjectHomeArticleContainer";
import { ProjectHomeHeaderContainer } from "@/components/container/ProjectHomeHeaderContainer";
import { ProjectCardList } from "@/components/project/ProjectCardList";
import { MODAL_IDS } from "@/context/ModalsProject";
import { useModalContext } from "@/hooks/useModalsProject";
import { useProjectContext } from "@/hooks/useProjectContext";
import { IoIosAdd } from "react-icons/io";
import { ProjectFilesSelected } from "../ProjectFilesSelected";
import { WorkerNameSelected } from "../WorkerNameSelected";
import { GenomeVersionRefSelected } from "../GenomeVersionRefSelected";
import { FilesProjectSelected } from "../FilesProjectSelected";
import { useState } from "react";
import { IFile } from "@/lib/types/files";
import "./userProject.css";
import { LuFileInput, LuFileOutput } from "react-icons/lu";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FilesTypeSwift } from "./FilesTypeSwift";

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
        title="Projects"
        navButtons={navButtonsUserProject}
      />

      <FilesTypeSwift />

      {/* <div className="project__home--header">
        <ProjectOptionsUser />
      </div> */}

      <section className="project__list--container">
        <ProjectCardList />
      </section>
    </ArticleContainer>
  );
};

export const ProjectOptionsUser = () => {
  const { projects } = useProjectContext();
  const [files, setFiles] = useState<IFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [currentProject, setCurrentProject] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const toggleSelect = (fileId: string) => {
    setSelectedFiles((prev) => {
      const updated = new Set(prev);
      updated.has(fileId) ? updated.delete(fileId) : updated.add(fileId);
      return updated;
    });
  };

  const onChangeProject = (project: { id: string; name: string } | null) => {
    if (!project) {
      setCurrentProject(null);
      return;
    }

    setCurrentProject(project);
  };

  return (
    <ul className="project__options--list">
      <li>
        <ProjectFilesSelected
          projects={projects}
          onChangeProject={onChangeProject}
          currentProject={currentProject}
        />
      </li>

      <li>
        <WorkerNameSelected />
      </li>

      <li>
        <GenomeVersionRefSelected />
      </li>

      <li>
        <FilesProjectSelected
          currentProject={currentProject}
          toggleSelect={toggleSelect}
          selectedFiles={selectedFiles}
          files={files}
          setFiles={setFiles}
        />
      </li>
    </ul>
  );
};
