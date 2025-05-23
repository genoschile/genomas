"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Workspace = {
  id: string;
  name: string;
  pipelineType: string;
  organizationId?: string;
  ownerId: string;
  projects?: string[];
  members?: string[];
};

type WorkspaceList = Workspace[];

interface WorkspacesContextType {
  workspaces: WorkspaceList;
  loading: boolean;
  refreshWorkspaces: () => Promise<void>;
}

const WorkspacesContext = createContext<WorkspacesContextType | undefined>(
  undefined
);

export const WorkspacesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [workspaces, setWorkspaces] = useState<WorkspaceList>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);

      const organization = JSON.parse(
        localStorage.getItem("genomaOrganization") || "{}"
      );
      if (!organization.id) throw new Error("No organization ID found");

      const res = await fetch(
        `/api/organization/${organization.id}/workspaces`
      );

      console.log("Response from API:", res);

      if (!res.ok) {
        console.log(`HTTP Error: ${res.status}`);
        return;
      }

      const data = await res.json();
      console.log("Workspaces data:", data);

      if (!data.success) {
        console.log(`Error: ${data.message}`);
        return;
      }

      setWorkspaces(data.data);
    } catch (err) {
      console.error("Error fetching workspaces:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <WorkspacesContext.Provider
      value={{ workspaces, loading, refreshWorkspaces: fetchWorkspaces }}
    >
      {children}
    </WorkspacesContext.Provider>
  );
};

export const useWorkspacesContext = () => {
  const context = useContext(WorkspacesContext);
  if (!context) {
    throw new Error(
      "useWorkspacesContext must be used within a WorkspacesProvider"
    );
  }
  return context;
};
