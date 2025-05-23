import { ChatSuggestionTitle } from "@/components/enterprise/headerMainSectionEnterprise/HeaderMainSectionEnterprise";
import { EnterpriseProjectHero } from "./components/EnterpriseProjectHero";
import { EnterpriseProjectListContainer } from "./components/EnterpriseProjectListContainer";

export default function page() {
  return (
    <>
      <ChatSuggestionTitle
        title="Administra tus Projects"
        description="Puedes agregar, editar y eliminar usuarios de tu organización."
      />

      <EnterpriseProjectHero />

      <EnterpriseProjectListContainer  />
    </>
  );
}
