import { useGroupsContext } from "@/context/enterprise/GroupsEnterpriseContext";
import { useModalContext } from "@/hooks/useModalsProject";
import { routes } from "@/lib/api/routes";
import { toast } from "react-toastify";

export const ModalGroupsDeleteEnterprise = () => {
  const { currentGroup, groups, deleteGroupIdFromContext } = useGroupsContext();
  const { closeModal } = useModalContext();

  if (!currentGroup || !currentGroup.id) {
    return <p>No group selected for deletion.</p>;
  }

  const groupName = currentGroup.name || "Unnamed Group";

  // delete group id form groups context

  const handleDeleteGroup = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log(`Deleting group: ${groupName}`);

    try {
      const response = await fetch(
        routes.deleteGroupEnterprise(
          currentGroup.organizationId,
          currentGroup.id
        ),
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        toast.error("Failed to delete group");
        throw new Error("Failed to delete group");
      }

      const data = await response.json();
      console.log("Group deleted successfully:", data);
      toast.success("Group deleted successfully");
      deleteGroupIdFromContext(currentGroup.id);
      closeModal();
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  return (
    <section className="groups-delete">
      <p>
        Are you sure you want to delete this group? This action cannot be
        undone.
      </p>
      <p>Please confirm your action below.</p>

      <form onSubmit={handleDeleteGroup}>
        <div className="form-group">
          <label htmlFor="groupName">{groupName}</label>
          <input
            type="text"
            id="groupName"
            name="groupName"
            value={groupName}
            readOnly
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-danger">
            Delete Group
          </button>
        </div>
      </form>
    </section>
  );
};
