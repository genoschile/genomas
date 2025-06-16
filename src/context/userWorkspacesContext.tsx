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
  showList: boolean;
  setShowList: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [showList, setShowList] = useState<boolean>(false);

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);

      const organization = getLocalStorageOrganization();

      const res = await fetch(`/api/organization/${organization}/workspaces`);
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
    <UserWorkspacesContext.Provider
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
