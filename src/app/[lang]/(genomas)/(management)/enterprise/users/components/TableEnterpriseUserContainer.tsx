import { TableEnterpriseUser } from "@/app/[lang]/(genomas)/(high)/enterprise/users/components/tablesUser/TableEnterpriseUser";
import { ContainerDefaultEnterprise } from "../../../../../../../features/enterprise/components/ContainerDefaultEnterprise";

export const TableEnterpriseUserContainer = () => {
  return (
    <ContainerDefaultEnterprise dinamicStyle="enterprise-users__hero">
      <TableEnterpriseUser />
    </ContainerDefaultEnterprise>
  );
};
