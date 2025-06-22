"use client";

/* icons */
import { IoIosAdd } from "react-icons/io";

/* context */
import { MODAL_IDS } from "@/context/ModalsProject";

/* hooks */
import { useState } from "react";
import { toast } from "react-toastify";
import { useModalContext } from "@/hooks/useModalsProject";
import { useProjectContext } from "@/hooks/useProjectContext";

/* components */
import { FilesProjectSelected } from "../FilesProjectSelected";
import { GenomeVersionRefSelected } from "../GenomeVersionRefSelected";
import { ProjectFilesSelected } from "../ProjectFilesSelected";
import { WorkerNameSelected } from "../WorkerNameSelected";
import { ArticleContainer } from "@/components/container/ProjectHomeArticleContainer";
import { ProjectHomeHeaderContainer } from "@/components/container/ProjectHomeHeaderContainer";

/* utils */
import { getLocalStorageOrganization } from "@/utils/getLocalStorageOrganization";

/* styles */
import "./filesProject.css";
import { IFile } from "@/lib/types/files";

const ExampleResFastAPI = {
  organizationId: "org-123" /* ✔️ */,
  userId: "user-456" /* ✔️ */,
  workspaceId: "workspace-789" /* ✔️ */,
  inputFiles: [] /* ✔️ */,
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
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [files, setFiles] = useState<IFile[]>([]);

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

  const handleClick = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const projectId = files[0]?.projectId;
    const selected = files.filter((file) => selectedFiles.has(file.id));
    const userId = getLocalStorageOrganization("genomaUser");
    const form = e.currentTarget;

    const workspaceId = projects.find((p) => p.id === projectId)?.workspaceId;

    const formData = new FormData(form);
    const workerId = formData.get("workerId") as string;
    const genomeVersionRef = formData.get("genomeVersionRef") as string;

    const payload = {
      files: selected,
      workerId,
      genomeVersionRef,
      userId,
      projectId,
      workspaceId,
    };

    if (!workerId) return toast.error("Worker no seleccionado");
    if (!genomeVersionRef) return toast.error("Genome version no seleccionado");
    if (selected.length === 0) return;

    try {
      const res = await fetch("http://localhost:8000/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al enviar archivos seleccionados");

      const data = await res.json();

      toast.success(`Task enviado correctamente ✅\nTask ID: ${data.task_id}`);
      setSelectedFiles(new Set());
    } catch (err) {
      toast.error(
        `Error al enviar archivos seleccionados ❌\n${(err as Error).message}`
      );
    }
  };

  return (
    <ArticleContainer>
      <form
        id="project-files-form"
        onSubmit={handleClick}
        className="project__files--form"
      >
        <ProjectHomeHeaderContainer
          title="Project Files"
          navButtons={navButtonsProjectFiles}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
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

        <FilesProjectSelected
          currentProject={currentProject}
          toggleSelect={toggleSelect}
          selectedFiles={selectedFiles}
          files={files}
          setFiles={setFiles}
        />
      </form>
      <button
        form="project-files-form"
        type="submit"
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        disabled={selectedFiles.size < 0}
      >
        Enviar archivos seleccionados ({selectedFiles.size})
      </button>
    </ArticleContainer>
  );
};
