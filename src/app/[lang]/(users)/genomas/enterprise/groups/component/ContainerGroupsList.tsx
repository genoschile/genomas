"use client";

import { useGroupsContext } from "@/context/enterprise/GroupsEnterpriseContext";
import { GroupsCard } from "./ContainerGroupList/GroupsCard";

export const ContainerGroupsList = () => {
  const { groups, loading } = useGroupsContext();

  if (loading) {
    return <div className="loading">Cargando grupos...</div>;
  }

  if (!groups || groups.length === 0) {
    return <div className="no-results">No hay grupos disponibles.</div>;
  }

  return (
    <div className="containerGroupsList">
      <ul>
        {groups.map((group) => (
          <GroupsCard key={group.id} item={group} />
        ))}
      </ul>
    </div>
  );
};
