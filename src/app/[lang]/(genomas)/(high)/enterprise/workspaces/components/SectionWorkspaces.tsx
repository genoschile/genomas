import { ChatSuggestionTitle } from "@/components/enterprise/headerMainSectionEnterprise/HeaderMainSectionEnterprise";
import { ContainerWorkspaces } from "./ContainerWorkspaces";
import "./sectionWorkspaces.css";
import { ContainerListWorkspaces } from "./ContainerListWorkspaces";

export const SectionWorkspaces = ({}: {}) => {
  return (
    <>
      <ChatSuggestionTitle
        title="Administra workspaces"
        description=" Puedes agregar, editar y eliminar workspaces de tu organización."
      />

      <ContainerWorkspaces>
        <ContainerListWorkspaces />
      </ContainerWorkspaces>
    </>
  );
};
