import { useGroupsContext } from "@/context/enterprise/GroupsEnterpriseContext";

export const ModalGroupsDeleteEnterprise = () => {
  const { currentGroup } = useGroupsContext();

  if (!currentGroup || !currentGroup.id) {
    return <p>No group selected for deletion.</p>;
  }

  const groupName = currentGroup.name || "Unnamed Group";

  return (
    <section className="groups-delete">
      <p>
        Are you sure you want to delete this group? This action cannot be
        undone.
      </p>
      <p>Please confirm your action below.</p>

      <form action="">
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
