"use client";

import { useGroupsContext } from "@/context/enterprise/GroupsEnterpriseContext";
import { GroupsCard } from "./ContainerGroupList/GroupsCard";

export const containerGroupsListItem = [
  "owl",
  "dog",
  "cat",
  "birth",
  "dog",
  "cat",
  "birth",
  "dog",
];

export const ContainerGroupsList = () => {
  const { groups, loading } = useGroupsContext();

  console.log(groups);

  if (loading) {
    return <div className="loading">Cargando grupos...</div>;
    // También podés poner un spinner CSS o un componente <Spinner />
  }

  if (!groups || groups.length === 0) {
    return <div className="no-results">No hay grupos disponibles.</div>;
  }

  return (
    <div className="containerGroupsList">
      <ul>
        {groups.map((group, index) => (
          <GroupsCard key={index} item={group}/>
        ))}
      </ul>
    </div>
  );
};
