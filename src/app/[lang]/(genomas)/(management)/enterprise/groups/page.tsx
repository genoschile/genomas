"use client";

import { ChatSuggestionTitle } from "@/features/enterprise/components/enterprise/headerMainSectionEnterprise/HeaderMainSectionEnterprise";

import "./page.css";

import { ContainerGroupsHeader } from "./component/ContainerGroupsHeader";
import { ContainerGroupsList } from "./component/ContainerGroupsList";
import { ContainerDefaultEnterprise } from "../../../../../../features/enterprise/components/ContainerDefaultEnterprise";
import { useMemo, useState } from "react";
import { SearchFilterEnterpriseGroups } from "./component/ContainerGroupsFiltersComponent/SearchFilterEnterpriseGroups";
import { useGroupsContext } from "@/features/enterprise/context/GroupsEnterpriseContext";
import { toast } from "react-toastify";

export default function page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAscending, setIsAscending] = useState(true);

  const { groups } = useGroupsContext();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleChangeDateCreateAscDesc = () => {
    if (groups.length === 0) {
      toast.error("No hay grupos para ordenar", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      return;
    }

    if (groups.length === 1) {
      toast.error("No se puede ordenar un solo grupo", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      return;
    }
    setIsAscending((prev) => !prev);
    toast.info(
      `Orden de creación de grupos ${
        isAscending ? "ascendente" : "descendente"
      }`,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };

  const filteredGroups = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const filtered =
      query === ""
        ? groups // si no hay term, devuelve todo
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
      <ChatSuggestionTitle
        title="Administra tus Groups"
        description="Puedes agregar, editar y eliminar usuarios de tu organización."
      />

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
}
