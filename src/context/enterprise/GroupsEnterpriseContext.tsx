"use client";

import { routes } from "@/lib/api/routes";
import { getLocalStorageOrganization } from "@/utils/getLocalStorageOrganization";
import { createContext, useContext, useEffect, useState } from "react";

interface GroupsContextType {
  groups: GroupList;
  loading: boolean;
  refreshGroups: () => Promise<void>;
  selectedGroups: GroupList;
  handleAddGroupSelected: (group: Group) => void;
  currentGroup: Group | null;
  handleChangeCurrentGroup: (group: Group) => void;
  deleteGroupIdFromContext: (groupId: string) => void;
}

const GroupsContext = createContext<GroupsContextType | undefined>(undefined);

export type Group = {
  id: string;
  name: string;
  role: string[];
  users?: string[];
  organizationId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
};

type GroupList = Group[];

export const GroupsProvider = ({ children }: { children: React.ReactNode }) => {
  const [groups, setGroups] = useState<GroupList>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const [selectedGroups, setSelectedGroups] = useState<GroupList>([]);

  /* groups seleccionados */
  const handleAddGroupSelected = (group: Group) => {
    const alreadySelected = selectedGroups.some((g) => g.id === group.id);

    if (alreadySelected) {
      setSelectedGroups(selectedGroups.filter((g) => g.id !== group.id));
    } else {
      setSelectedGroups([...selectedGroups, group]);
    }
  };
  /* actual */
  const handleChangeCurrentGroup = (group: Group) => {
    setCurrentGroup(group);
  };

  const deleteGroupIdFromContext = (groupId: string) => {
    setGroups((prevGroups) =>
      prevGroups.filter((group) => group.id !== groupId)
    );
    setSelectedGroups((prevSelected) =>
      prevSelected.filter((group) => group.id !== groupId)
    );
    if (currentGroup && currentGroup.id === groupId) {
      setCurrentGroup(null);
    }
  };

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const organization = getLocalStorageOrganization();

      if (!organization) {
        console.error("No organization found in local storage");
        return;
      }

      const res = await fetch(routes.getGroupsEnterprise(organization));

      if (!res.ok) {
        console.log(`Error HTTP: ${res.status}`);
        return;
      }

      const data = await res.json();

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
    <GroupsContext
      value={{
        groups,
        loading,
        refreshGroups: fetchGroups,
        selectedGroups,
        handleAddGroupSelected,
        currentGroup,
        handleChangeCurrentGroup,
        deleteGroupIdFromContext,
      }}
    >
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
