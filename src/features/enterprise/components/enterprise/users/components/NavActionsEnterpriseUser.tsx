import { IconRoundedFull } from "@/features/enterprise/components/enterprise/iconRoundedFull/IconRoundedFull";
import { MODAL_IDS } from "@/features/modals/context/ModalsProject";
import { useModalContext } from "@/features/modals/hooks/useModalsProject";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdGroups2 } from "react-icons/md";
import { FaList } from "react-icons/fa";

export const NavActionsEnterpriseUser = () => {
  const { openModal } = useModalContext();

  return (
    <nav>
      <button onClick={() => openModal(MODAL_IDS.ADD_USER_ENTERPRISE)}>
        <IconRoundedFull icon={<IoPersonAddSharp />} />
      </button>
      <button onClick={() => openModal(MODAL_IDS.ADD_GROUPS_ENTERPRISE)}>
        <IconRoundedFull icon={<MdGroups2 />} />
      </button>
      <button onClick={() => openModal(MODAL_IDS.VIEW_GROUPS_LIST)}>
        <IconRoundedFull icon={<FaList />} />
      </button>
    </nav>
  );
};
