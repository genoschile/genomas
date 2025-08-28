// context/CurrentProjectContext.tsx
"use client";

import { IProject } from "@/lib/types/contextTypes";
import { createContext, useContext, useState, ReactNode } from "react";

interface CurrentProjectContextType {
  currentProject: IProject | null;
  setCurrentProject: (project: IProject | null) => void;
  ChangeCurrentProject: (project: IProject | null) => void;
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

  const ChangeCurrentProject = (project: IProject | null) => {
    setCurrentProject(project);
  };

  return (
    <CurrentProjectContext.Provider
      value={{ currentProject, setCurrentProject, ChangeCurrentProject }}
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
