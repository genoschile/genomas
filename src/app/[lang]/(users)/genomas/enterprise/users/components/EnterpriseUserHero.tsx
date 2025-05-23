import { ContainerDefaultEnterprise } from "../../components/ContainerDefaultEnterprise";
import { NavActionsEnterpriseUser } from "./NavActionsEnterpriseUser";
import { SearchSectionEnterpriseUser } from "./SearchSectionEnterpriseUser";

export const EnterpriseUserHero = () => {
  return (
    <ContainerDefaultEnterprise dinamicStyle="enterprise-users__hero">
      <SearchSectionEnterpriseUser />
      <NavActionsEnterpriseUser />
    </ContainerDefaultEnterprise>
  );
};
