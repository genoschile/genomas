import { useModalContext } from "@/features/modals/hooks/useModalsProject";
import { MODAL_IDS } from "@/features/modals/context/ModalsProject";

export const ButtonEditUser = ({ userId }: { userId: string }) => {
  const { openModal } = useModalContext();

  return (
    <button
      className="edit"
      onClick={() => openModal(MODAL_IDS.EDIT_USERS_ENTERPRISE, { userId })}
    >
      Editar
    </button>
  );
};
