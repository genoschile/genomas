// context/GroupsContext.tsx
"use client";

import { IGroup } from "@/core/interfaces/IGroup";
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

const groups: GroupList = [
  {
    id: "cmay13geb0001g10z3miqwxxq",
    name: "benja_e_e@hotmail.com",
    role: ["ADMIN"],
    organizationId: "cmawkntgi0000g1eo76p5zufg",
    description: "z<zx<zx",
    createdAt: "2025-05-21T14:18:44.145Z",
    updatedAt: "2025-05-21T14:18:44.145Z",
    isActive: true,
  },
];



export const GroupsProvider = ({ children }: { children: React.ReactNode }) => {
  const [groups, setGroups] = useState<GroupList>([]);
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
