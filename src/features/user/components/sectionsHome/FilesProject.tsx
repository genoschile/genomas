"use client";

/* icons */
import { IoIosAdd } from "react-icons/io";

/* context */
import { MODAL_IDS } from "@/features/modals/context/ModalsProject";

/* hooks */
import { useState } from "react";
import { toast } from "react-toastify";
import { useModalContext } from "@/features/modals/hooks/useModalsProject";
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
import { useProcessContext } from "@/context/ProcessContext";
import { routes } from "@/lib/api/routes";

const ExampleResFastAPI = {
  organizationId: "org-123" /* ✔️ */,
  userId: "user-456" /* ✔️ */,
  workspaceId: "workspace-789" /* ✔️ */,
  inputFiles: [] /* ✔️ */,
  workerName: "worker-1" /* ✔️ */,
  genomeVersionRef: "hg38" /* ✔️ */,
};

export const FilesProject = () => {
  const { projects } = useProjectContext();
  const { addTask, updateTaskStatus } = useProcessContext();

  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [files, setFiles] = useState<IFile[]>([]);

  const [taskState, setTaskState] = useState<string | null>(null);

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
      const res = await fetch(routes.annomafTest(), {
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
      addTask({
        id: data.task_id,
        fileName: "Sin nombre",
        workflow: "Pending Assignment",
        status: "pending",
      });

      const socket = new WebSocket(
        `ws://localhost:8000/ws/status/${data.task_id}`
      );

      socket.onmessage = (event) => {
        const { state } = JSON.parse(event.data);
        updateTaskStatus(data.task_id, state.toLowerCase() as any);

        if (state === "SUCCESS") {
          toast.success("Tarea completada");
        } else if (state === "FAILURE") {
          toast.error("Tarea fallida");
        }
      };

      socket.onopen = () => {
        console.log("WebSocket conectado");
      };

      socket.onerror = (error) => {
        console.error("WebSocket error", error);
      };

      socket.onclose = () => {
        console.log("WebSocket cerrado");
      };
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
      ></form>
      {taskState && (
        <strong
          style={{
            padding: "0.3rem 0.6rem",
            backgroundColor:
              taskState === "PENDING"
                ? "lightblue"
                : taskState === "STARTED"
                ? "orange"
                : taskState === "SUCCESS"
                ? "green"
                : taskState === "FAILURE"
                ? "red"
                : "gray",
            color: "white",
            borderRadius: "4px",
            textTransform: "uppercase",
            fontSize: "0.85rem",
            width: "fit-content",
          }}
        >
          Estado: {taskState}
        </strong>
      )}
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
