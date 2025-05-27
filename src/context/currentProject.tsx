// context/CurrentProjectContext.tsx
"use client";

import { inter } from "@/lib/fonts/fonts";
import { createContext, useContext, useState, ReactNode } from "react";

export interface IProject {
    id: string;
    name: string;
    description: string | null;
    sharedWith?: string[];
    sharedWithGroups?: string[];
    files?: File[];
    executions?: string[];
}

interface CurrentProjectContextType {
  currentProject: IProject | null;
  setCurrentProject: (project: IProject | null) => void;
}

const CurrentProjectContext = createContext<
  CurrentProjectContextType | undefined
>(undefined);

export const CurrentProjectProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentProject, setCurrentProject] = useState<IProject | null>(null);

  return (
    <CurrentProjectContext.Provider
      value={{ currentProject, setCurrentProject }}
    >
      {children}
    </CurrentProjectContext.Provider>
  );
};

export const useCurrentProject = (): CurrentProjectContextType => {
  const context = useContext(CurrentProjectContext);
  if (context === undefined) {
    throw new Error(
      "useCurrentProject must be used within a CurrentProjectProvider"
    );
  }
  return context;
};
