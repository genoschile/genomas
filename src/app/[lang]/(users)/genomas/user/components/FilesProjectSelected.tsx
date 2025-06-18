"use client";

import { useCurrentProject } from "@/context/currentProject";
import { useEffect, useState } from "react";

interface IFile {
  id: string;
  name: string;
  size: string;
  date: string;
}

export const FilesProjectSelected = () => {
  const { currentProject } = useCurrentProject();
  const currentIdProject = currentProject?.id;

  const [files, setFiles] = useState<IFile[] | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentIdProject) return;

    const fetchProjectFiles = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/project/${currentIdProject}/files`);
        if (!res.ok)
          throw new Error(`Error al obtener archivos: ${res.statusText}`);

        const data = await res.json();
        setFiles(data.data ?? []);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
        setFiles(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectFiles();
  }, [currentIdProject]);

  const toggleSelect = (fileId: string) => {
    setSelectedFiles((prev) => {
      const updated = new Set(prev);
      if (updated.has(fileId)) {
        updated.delete(fileId);
      } else {
        updated.add(fileId);
      }
      console.log("Selected files:", Array.from(updated)); // 🧪 Debug log
      return updated;
    });
  };

  const handleSendSelected = async () => {
    const selected = files?.filter((file) => selectedFiles.has(file.id)) ?? [];

    try {
      const res = await fetch("http://localhost:8000/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ files: selected }),
      });

      if (!res.ok) throw new Error("Error al enviar archivos seleccionados");

      const data = await res.json();
      alert(`Task enviado correctamente ✅\nTask ID: ${data.task_id}`);
      setSelectedFiles(new Set());
    } catch (err) {
      console.error(err);
      alert("Error al enviar archivos seleccionados ❌");
    }
  };

  if (!currentIdProject) return <p>No hay proyecto seleccionado.</p>;

  return (
    <div className="project__home--container">
      {loading && <p>Cargando archivos...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && files && files.length === 0 && (
        <p>No hay archivos en este proyecto.</p>
      )}

      {!loading && !error && files && files.length > 0 && (
        <>
          <ul className="files__project--list">
            {files.map((file, index) => (
              <li
                key={file.id || index}
                className={`files__project--item ${
                  selectedFiles.has(file.id) ? "selected" : ""
                }`}
                onClick={() => toggleSelect(file.id)}
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
                <div className="files__project--size">{file.size}</div>
                <div className="files__project--date">{file.date}</div>
              </li>
            ))}
          </ul>

          {selectedFiles.size > 0 && (
            <button
              onClick={handleSendSelected}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Enviar archivos seleccionados ({selectedFiles.size})
            </button>
          )}
        </>
      )}
    </div>
  );
};
