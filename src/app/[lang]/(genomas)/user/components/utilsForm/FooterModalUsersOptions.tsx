import { useModalContext } from "@/hooks/useModalsProject";

export const FooterModalUsersOptions = () => {
  const { closeModal } = useModalContext();
  return (
    <footer className="workflow-form-footer">
      <button type="button" onClick={closeModal}>
        close
      </button>
    </footer>
  );
};
