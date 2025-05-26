"use client";

import { createContext, useState } from "react";

export interface FileStagingAreaContextType {
  decompressedFiles: { name: string; size: number; type: string }[];
  files: File[];
  setFiles: (files: File[]) => void;
  setDecompressedFiles: (
    decompressedFiles: { name: string; size: number; type: string }[]
  ) => void;
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
  const [decompressedFiles, setDecompressedFiles] = useState<
    { name: string; size: number; type: string }[]
  >([]);
  const [files, setFiles] = useState<File[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  return (
    <FileStagingAreaContext
      value={{ decompressedFiles, files, setFiles, setDecompressedFiles, setProgressMap, progressMap }}
    >
      {children}
    </FileStagingAreaContext>
  );
}
