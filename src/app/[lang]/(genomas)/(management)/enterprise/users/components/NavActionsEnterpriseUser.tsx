import { IconRoundedFull } from "@/components/enterprise/iconRoundedFull/IconRoundedFull";
import { MODAL_IDS } from "@/features/modals/context/ModalsProject";
import { useModalContext } from "@/features/modals/hooks/useModalsProject";
import { IoPersonAddSharp } from "react-icons/io5";

export const NavActionsEnterpriseUser = () => {
  const { openModal } = useModalContext();

  return (
    <nav>
      <button onClick={() => openModal(MODAL_IDS.ADD_USER_ENTERPRISE)}>
        <IconRoundedFull icon={<IoPersonAddSharp />} />
      </button>
    </nav>
  );
};
