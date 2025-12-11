"use client";

import { useModalContext } from "@/features/modals/hooks/useModalsProject";
import { useDataTableUserEnterpriseContext } from "@/features/enterprise/context/DataTableUserEnterpriseContext";
import { getLocalStorageOrganization } from "@/utils/getLocalStorageOrganization";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import "./modalDeleteUserConfirmation.css";

type ModalDeleteUserConfirmationProps = {
  userId: string;
};

export const ModalDeleteUserConfirmation = ({
  userId,
}: ModalDeleteUserConfirmationProps) => {
  const { closeModal } = useModalContext();
  const { users, removeUser } = useDataTableUserEnterpriseContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const [orgId, setOrgId] = useState<string | null>(null);

  useEffect(() => {
    setOrgId(getLocalStorageOrganization());
  }, []);

  const user = users.find((u) => u.id === userId);

  const handleDelete = async () => {
    if (!orgId) {
      toast.error("ID de organización no encontrado");
      return;
    }

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/organization/${orgId}/users`, {
        method: "DELETE",
        body: JSON.stringify({ userId }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        removeUser(userId);
        toast.success("Usuario eliminado correctamente");
        closeModal();
      } else {
        const errorData = await res.json();
        toast.error(`Error: ${errorData.message || "Error al eliminar el usuario"}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error al eliminar el usuario");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user) {
    return (
      <div className="modal-delete-user">
        <p>Usuario no encontrado</p>
      </div>
    );
  }

  return (
    <div className="modal-delete-user">
      <div className="modal-delete-user__content">
        <p className="modal-delete-user__warning">
          ⚠️ ¿Estás seguro de que deseas eliminar este usuario?
        </p>
        
        <div className="modal-delete-user__info">
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.userType}</p>
        </div>

        <p className="modal-delete-user__note">
          Esta acción no se puede deshacer.
        </p>

        <div className="modal-delete-user__actions">
          <button
            className="modal-delete-user__button modal-delete-user__button--cancel"
            onClick={closeModal}
            disabled={isDeleting}
          >
            Cancelar
          </button>
          <button
            className="modal-delete-user__button modal-delete-user__button--delete"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Eliminando..." : "Eliminar Usuario"}
          </button>
        </div>
      </div>
    </div>
  );
};
