"use client";

import { createContext, useContext, useState } from "react";

export interface Project {
  id: string;
  name: string;
  description?: string;
  workspaceId: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectsContextType {
  projectsByWorkspace: Record<string, Project[]>;
  loading: boolean;
  getProjectsForWorkspace: (workspaceId: string) => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

export const ProjectsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projectsByWorkspace, setProjectsByWorkspace] = useState<
    Record<string, Project[]>
  >({});
  const [loading, setLoading] = useState<boolean>(false);

  const getProjectsForWorkspace = async (workspaceId: string) => {
    if (projectsByWorkspace[workspaceId]) return; 

    try {
      setLoading(true);
      const res = await fetch(`/api/workspaces/${workspaceId}/projects`);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      setProjectsByWorkspace((prev) => ({
        ...prev,
        [workspaceId]: data.data,
      }));
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projectsByWorkspace,
        loading,
        getProjectsForWorkspace,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjectsContextEnterprise = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error(
      "useProjectsContext must be used within a ProjectsProvider"
    );
  }
  return context;
};
