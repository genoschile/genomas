"use client";

import { createContext, useState } from "react";

interface Files extends File {
  name: string;
  accepted?: true | false;
  message?: string;
  type: string;
}

export interface FileStagingAreaContextType {
  decompressedFiles: Files[];
  files: Files[];
  setFiles: (files: Files[]) => void;
  setDecompressedFiles: (decompressedFiles: Files[]) => void;
  setProgressMap: (progressMap: Record<string, number>) => void;
  progressMap?: Record<string, number>;
}

export const FileStagingAreaContext = createContext<FileStagingAreaContextType>(
  {
    decompressedFiles: [],
    files: [],
    setFiles: () => {},
    setDecompressedFiles: () => {},
    setProgressMap: () => {},
    progressMap: {},
  }
);

export function FileStagingAreaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [decompressedFiles, setDecompressedFiles] = useState<Files[]>([]);
  const [files, setFiles] = useState<Files[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});


  
  return (
    <FileStagingAreaContext
      value={{
        decompressedFiles,
        files,
        setFiles,
        setDecompressedFiles,
        setProgressMap,
        progressMap,
      }}
    >
      {children}
    </FileStagingAreaContext>
  );
}
