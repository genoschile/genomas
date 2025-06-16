"use client";

import { getLocalStorageOrganization } from "@/utils/getLocalStorageOrganization";
import { createContext, useContext, useEffect, useState } from "react";

export type Workspace = {
  id: string;
  name: string;
  description?: string;
  pipelineType: string;
  organizationId: string;
  ownerId: string;
  projects: string[];
  members: string[];
  createdAt: Date;
};

type WorkspaceList = Workspace[];

interface WorkspacesContextType {
  workspaces: WorkspaceList;
  loading: boolean;
  refreshWorkspaces: () => Promise<void>;
  selectedWorkspaceId: string | null;
  setSelectedWorkspaceId: React.Dispatch<React.SetStateAction<string | null>>;
  addWorkspace: (workspace: Workspace) => void;
}

const UserWorkspacesContext = createContext<WorkspacesContextType | undefined>(
  undefined
);

export const UserWorkspacesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [workspaces, setWorkspaces] = useState<WorkspaceList>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(
    null
  );

  const fetchWorkspaces = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/users/${getLocalStorageOrganization("genomaUser")}/workspaces`
      );
      if (!response.ok) {
        throw new Error("Error fetching workspaces");
      }
      const data = await response.json();
      if (data.success) {
        setWorkspaces(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    } finally {
      setLoading(false);
    }
  };

  const addWorkspace = (workspace: Workspace) => {
    setWorkspaces((prev) => [...prev, workspace]);
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <UserWorkspacesContext.Provider
      value={{
        workspaces,
        loading,
        refreshWorkspaces: fetchWorkspaces,
        selectedWorkspaceId,
        setSelectedWorkspaceId,
        addWorkspace
      }}
    >
      {children}
    </UserWorkspacesContext.Provider>
  );
};

export const useUserWorkspacesContext = () => {
  const context = useContext(UserWorkspacesContext);
  if (!context) {
    throw new Error(
      "useUserWorkspacesContext must be used within a WorkspacesProvider"
    );
  }
  return context;
};
