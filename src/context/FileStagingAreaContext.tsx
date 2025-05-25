"use client";

import { createContext, useState } from "react";

export interface FileStagingAreaContextType {
  decompressedFiles: { name: string; size: number; type: string }[];
  files: File[];
  setFiles: (files: File[]) => void;
  setDecompressedFiles: (
    decompressedFiles: { name: string; size: number; type: string }[]
  ) => void;
}

export const FileStagingAreaContext = createContext<FileStagingAreaContextType>(
  {
    decompressedFiles: [],
    files: [],
    setFiles: () => {},
    setDecompressedFiles: () => {},
  }
);

export function FileStagingAreaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [decompressedFiles, setDecompressedFiles] = useState<
    { name: string; size: number; type: string }[]
  >([]);
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileStagingAreaContext
      value={{ decompressedFiles, files, setFiles, setDecompressedFiles }}
    >
      {children}
    </FileStagingAreaContext>
  );
}
