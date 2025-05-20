import { ChatSuggestionTitle } from "@/components/enterprise/headerMainSectionEnterprise/HeaderMainSectionEnterprise";
import { ContainerGroups } from "./component/ContainerGroups";

import "./page.css";

import { ContainerGroupsHeader } from "./component/ContainerGroupsHeader";
import { ContainerGroupsList } from "./component/ContainerGroupsList";
import { ContainerGroupsFilters } from "./component/ContainerGroupsFilters";

export default function page() {
  return (
    <>
      <ChatSuggestionTitle
        title="Administra tus Groups"
        description="Puedes agregar, editar y eliminar usuarios de tu organización."
      />

      <ContainerGroups>
        <ContainerGroupsHeader />
      </ContainerGroups>

      <ContainerGroups>
        <ContainerGroupsFilters />
      </ContainerGroups>

      <ContainerGroups>
        <ContainerGroupsList />
      </ContainerGroups>
    </>
  );
}
