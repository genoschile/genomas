"use client";

import { useGroupsContext } from "@/context/enterprise/GroupsEnterpriseContext";
import { GroupsCard } from "./ContainerGroupList/GroupsCard";
import { useMemo } from "react";

export const ContainerGroupsList = ({
  searchTerm,
}: {
  searchTerm: string;
}) => {
  const { groups, loading } = useGroupsContext();

  const filteredGroups = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return query === ""
      ? groups
      : groups.filter((group) =>
          `${group.name} ${group.description}`.toLowerCase().includes(query)
        );
  }, [searchTerm, groups]);

  if (loading) {
    return <div className="loading">Cargando grupos...</div>;
  }

  if (!filteredGroups || filteredGroups.length === 0) {
    return <div className="no-results">No hay grupos disponibles.</div>;
  }

  return (
    <div className="containerGroupsList">
      <ul>
        {filteredGroups.map((group) => (
          <GroupsCard key={group.id} item={group} />
        ))}
      </ul>
    </div>
  );
};
