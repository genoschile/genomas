import { SearchFilterEnterpriseUser } from "@/app/[lang]/(genomas)/(high)/enterprise/users/components/tablesUser/SearchFilterEnterpriseUser";
import { ContainerDefaultEnterprise } from "../../components/ContainerDefaultEnterprise";

export const EnterpriseUserFiltersHero = () => {
  return (
    <ContainerDefaultEnterprise dinamicStyle="enterprise-users__hero">
      <SearchFilterEnterpriseUser />
    </ContainerDefaultEnterprise>
  );
};
