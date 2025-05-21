// context/GroupsContext.tsx
"use client";

import { IGroup } from "@/core/interfaces/IGroup";
import React, { createContext, useContext, useEffect, useState } from "react";

interface GroupsContextType {
  groups: IGroup[];
  loading: boolean;
  refreshGroups: () => Promise<void>;
}

const GroupsContext = createContext<GroupsContextType | undefined>(undefined);

const baseUrl = "/api/organization";

export const GroupsProvider = ({ children }: { children: React.ReactNode }) => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const organization = JSON.parse(
        localStorage.getItem("genomaOrganization") || "{}"
      );
      if (!organization.id) throw new Error("No organization ID found");

      const res = await fetch(`/api/organization/${organization.id}/groups`);

      console.log("Response from API:", res);

      if (!res.ok) {
        console.log(`Error HTTP: ${res.status}`);
        return 
      }

      const data = await res.json();
      console.log("Data from API:", data);

      setGroups(data);
    } catch (err) {
      console.error("Error fetching groups:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <GroupsContext value={{ groups, loading, refreshGroups: fetchGroups }}>
      {children}
    </GroupsContext>
  );
};

export const useGroupsContext = () => {
  const context = useContext(GroupsContext);
  if (!context) {
    throw new Error("useGroupsContext must be used within a GroupsProvider");
  }
  return context;
};
