"use client";

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
  showList: boolean;
  setShowList: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(
    null
  );
  const [showList, setShowList] = useState<boolean>(false);

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
      const data = await res.json();
      if (data.success) setWorkspaces(data.data);
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
      value={{
        workspaces,
        loading,
        refreshWorkspaces: fetchWorkspaces,
        selectedWorkspaceId,
        setSelectedWorkspaceId,
        showList,
        setShowList,
      }}
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
