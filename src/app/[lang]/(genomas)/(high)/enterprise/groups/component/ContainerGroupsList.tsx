"use client";

import {
  Group,
  useGroupsContext,
} from "@/context/enterprise/GroupsEnterpriseContext";
import { GroupsCard } from "./ContainerGroupList/GroupsCard";

export const ContainerGroupsList = ({
  filteredGroups,
}: {
  filteredGroups: Group[];
}) => {
  const { loading } = useGroupsContext();

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
