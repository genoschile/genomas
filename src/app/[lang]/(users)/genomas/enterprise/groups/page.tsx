"use client";

import { ChatSuggestionTitle } from "@/components/enterprise/headerMainSectionEnterprise/HeaderMainSectionEnterprise";

import "./page.css";

import { ContainerGroupsHeader } from "./component/ContainerGroupsHeader";
import { ContainerGroupsList } from "./component/ContainerGroupsList";
import { ContainerGroupsFilters } from "./component/ContainerGroupsFilters";
import { ContainerDefaultEnterprise } from "../components/ContainerDefaultEnterprise";
import { useState } from "react";

export default function page() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

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
        <ContainerGroupsFilters />
      </ContainerDefaultEnterprise>

      <ContainerDefaultEnterprise dinamicStyle="enterprise-groups__hero">
        <ContainerGroupsList searchTerm={searchTerm} />
      </ContainerDefaultEnterprise>
    </>
  );
}
