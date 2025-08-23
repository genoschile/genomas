// /context/filesContext.tsx
"use client";
import { createContext, useContext, useState } from "react";

interface File {
  id: string;
  name: string;
  size: number;
  createdAt: string;
}

interface FilesContextType {
  files: File[];
  isLoadingFiles: boolean;
  fetchFilesByProject: (projectId: string) => Promise<void>;
  clearFiles: () => void;
}

const FilesContext = createContext<FilesContextType | null>(null);

export const FilesProvider = ({ children }: { children: React.ReactNode }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);

  const fetchFilesByProject = async (projectId: string) => {
    try {
      setIsLoadingFiles(true);

      // Llamada a tu API — ajústala según tu backend
      const response = await fetch(`/api/projects/${projectId}/files`);
      if (!response.ok) throw new Error("Error al cargar archivos");

      const data = await response.json();
      setFiles(data.files || []);
    } catch (error) {
      console.error("Error cargando archivos:", error);
      setFiles([]);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const clearFiles = () => setFiles([]);

  return (
    <FilesContext.Provider
      value={{
        files,
        isLoadingFiles,
        fetchFilesByProject,
        clearFiles,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

export const useFilesContext = () => {
  const context = useContext(FilesContext);
  if (!context) {
    throw new Error("useFilesContext debe usarse dentro de un FilesProvider");
  }
  return context;
};
