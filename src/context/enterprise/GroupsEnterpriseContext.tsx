"use client";

import { getLocalStorageOrganization } from "@/utils/getLocalStorageOrganization";
import React, { createContext, useContext, useEffect, useState } from "react";

interface GroupsContextType {
  groups: GroupList;
  loading: boolean;
  refreshGroups: () => Promise<void>;
}

const GroupsContext = createContext<GroupsContextType | undefined>(undefined);

export type Group = {
  id: string;
  name: string;
  role: string[];
  users?: string[];
  organizationId: string;
  description: string;
  createdAt: string; // o Date 
  updatedAt: string; // o Date 
  isActive: boolean;
};

type GroupList = Group[];

export const GroupsProvider = ({ children }: { children: React.ReactNode }) => {
  const [groups, setGroups] = useState<GroupList>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const organization = getLocalStorageOrganization()
      
      const res = await fetch(`/api/organization/${organization}/groups`);

      console.log("Response from API:", res);

      if (!res.ok) {
        console.log(`Error HTTP: ${res.status}`);
        return 
      }

      const data = await res.json();
      console.log("Data from API:", data);

      if (!data.success) {
        console.log(`Error: ${data.message}`);
        return;
      }

      setGroups(data.data);

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
