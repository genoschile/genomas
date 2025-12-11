import { ContainerDefaultEnterprise } from "../../../ContainerDefaultEnterprise";
import { SearchFilterEnterpriseUser } from "./tablesUser/SearchFilterEnterpriseUser";

export const EnterpriseUserFiltersHero = () => {
  return (
    <ContainerDefaultEnterprise dinamicStyle="enterprise-users__hero">
      <SearchFilterEnterpriseUser />
    </ContainerDefaultEnterprise>
  );
};
