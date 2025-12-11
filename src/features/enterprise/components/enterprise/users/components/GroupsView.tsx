"use client";

import { useMemo, useState } from "react";
import { useGroupsContext } from "@/features/enterprise/context/GroupsEnterpriseContext";
import { toast } from "react-toastify";
import { ContainerDefaultEnterprise } from "@/features/enterprise/components/ContainerDefaultEnterprise";
import { ContainerGroupsHeader } from "../../groups/component/ContainerGroupsHeader";
import { SearchFilterEnterpriseGroups } from "../../groups/component/ContainerGroupsFiltersComponent/SearchFilterEnterpriseGroups";
import { ContainerGroupsList } from "../../groups/component/ContainerGroupsList";

export const GroupsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAscending, setIsAscending] = useState(true);

  const { groups } = useGroupsContext();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleChangeDateCreateAscDesc = () => {
    if (groups.length === 0) {
      toast.error("No hay grupos para ordenar");
      return;
    }

    if (groups.length === 1) {
      toast.error("No se puede ordenar un solo grupo");
      return;
    }
    
    setIsAscending((prev) => !prev);
    toast.info(
      `Orden de creación de grupos ${
        isAscending ? "ascendente" : "descendente"
      }`
    );
  };

  const filteredGroups = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const filtered =
      query === ""
        ? groups
        : groups.filter((group) =>
            `${group.name} ${group.description}`.toLowerCase().includes(query)
          );

    return filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return isAscending ? dateA - dateB : dateB - dateA;
    });
  }, [groups, searchTerm, isAscending]);

  return (
    <>
      <ContainerDefaultEnterprise dinamicStyle="enterprise-groups__hero">
        <ContainerGroupsHeader
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      </ContainerDefaultEnterprise>

      <ContainerDefaultEnterprise dinamicStyle="enterprise-groups__hero">
        <SearchFilterEnterpriseGroups
          isAscending={isAscending}
          onChangeDateCreateAscDesc={handleChangeDateCreateAscDesc}
        />
      </ContainerDefaultEnterprise>

      <ContainerDefaultEnterprise dinamicStyle="enterprise-groups__hero">
        <ContainerGroupsList filteredGroups={filteredGroups} />
      </ContainerDefaultEnterprise>
    </>
  );
};
