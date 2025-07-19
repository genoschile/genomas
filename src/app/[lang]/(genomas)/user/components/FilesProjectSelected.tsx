"use client";

import { useEffect, useState } from "react";
import "./filesProjectSelected.css";
import { IFile } from "@/lib/types/files";
import { routes } from "@/lib/api/routes";

export const FilesProjectSelected = ({
  currentProject,
  toggleSelect,
  selectedFiles,
  files,
  setFiles,
}: {
  currentProject: { id: string; name: string } | null;
  toggleSelect: (fileId: string) => void;
  selectedFiles: Set<string>;
  files: IFile[];
  setFiles: (files: IFile[]) => void;
}) => {
  const currentIdProject = currentProject?.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentIdProject) return;

    const fetchProjectFiles = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(routes.getFilesOfProject(currentIdProject));
        if (!res.ok)
          throw new Error(`Error al obtener archivos: ${res.statusText}`);

        const { data } = await res.json();
        setFiles(data ?? []);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
        setFiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectFiles();
  }, [currentIdProject]);

  if (!currentIdProject) return <p>No hay proyecto seleccionado.</p>;

  return (
    <div className="files__project--container">
      {loading && <p>Cargando archivos...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && files.length === 0 && (
        <p>No hay archivos en este proyecto.</p>
      )}

      <ul className="files__project--list">
        {!loading && !error && files.length > 0 && (
          <>
            {files.map((file) => (
              <li
                key={file.id}
                onClick={() => toggleSelect(file.id)}
                className={`files__project--item ${
                  selectedFiles.has(file.id) ? "selected" : ""
                }`}
                style={{
                  cursor: "pointer",
                  backgroundColor: selectedFiles.has(file.id)
                    ? "#e0f7fa"
                    : "white",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <div className="files__project--name">{file.name}</div>
                <div className="files__project--size">
                  Tamaño: {(file.size / 1024).toFixed(1)} KB
                </div>
                <div className="files__project--date">
                  Subido: {new Date(file.uploadedAt).toLocaleString()}
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};
