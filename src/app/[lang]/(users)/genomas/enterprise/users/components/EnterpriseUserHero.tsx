import { NavActionsEnterpriseUser } from "./NavActionsEnterpriseUser";
import { SearchSectionEnterpriseUser } from "./SearchSectionEnterpriseUser";

export const EnterpriseUserHero = () => {
  return (
    <div className="enterprise-users__hero">
      <SearchSectionEnterpriseUser />
      <NavActionsEnterpriseUser />
    </div>
  );
};
