import { IconRoundedFull } from "@/components/enterprise/iconRoundedFull/IconRoundedFull";
import { IoPersonAddSharp } from "react-icons/io5";

export const NavActionsEnterpriseUser = () => {
  return (
    <nav>
      <button>
        <IconRoundedFull icon={<IoPersonAddSharp />} />
      </button>
    </nav>
  );
};
