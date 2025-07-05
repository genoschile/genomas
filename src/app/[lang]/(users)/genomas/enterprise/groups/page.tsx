"use client";

import { ChatSuggestionTitle } from "@/components/enterprise/headerMainSectionEnterprise/HeaderMainSectionEnterprise";

import "./page.css";

import { ContainerGroupsHeader } from "./component/ContainerGroupsHeader";
import { ContainerGroupsList } from "./component/ContainerGroupsList";
import { ContainerDefaultEnterprise } from "../components/ContainerDefaultEnterprise";
import { useState } from "react";
import { SearchFilterEnterpriseGroups } from "./component/ContainerGroupsFiltersComponent/SearchFilterEnterpriseGroups";
import { useGroupsContext } from "@/context/enterprise/GroupsEnterpriseContext";

export default function page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAscending, setIsAscending] = useState(true);

  const { groups } = useGroupsContext();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleChangeDateCreateAscDesc = () => {
    setIsAscending((prev) => !prev);
  };

  const sortedGroups = [...groups].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return isAscending ? dateA - dateB : dateB - dateA;
  });

  const filteredGroups = sortedGroups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <ContainerGroupsList searchTerm={searchTerm} />
      </ContainerDefaultEnterprise>
    </>
  );
}
