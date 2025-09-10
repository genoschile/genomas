import { TableEnterpriseUser } from "@/app/[lang]/(genomas)/(high)/enterprise/users/components/tablesUser/TableEnterpriseUser";
import { ContainerDefaultEnterprise } from "../../components/ContainerDefaultEnterprise";

export const TableEnterpriseUserContainer = () => {
  return (
    <ContainerDefaultEnterprise dinamicStyle="enterprise-users__hero">
      <TableEnterpriseUser />
    </ContainerDefaultEnterprise>
  );
};
