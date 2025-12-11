import { ContainerDefaultEnterprise } from "@/features/enterprise/components/ContainerDefaultEnterprise";
import { TableEnterpriseUser } from "./tablesUser/TableEnterpriseUser";

export const TableEnterpriseUserContainer = () => {
  return (
    <ContainerDefaultEnterprise dinamicStyle="enterprise-users__hero">
      <TableEnterpriseUser />
    </ContainerDefaultEnterprise>
  );
};
