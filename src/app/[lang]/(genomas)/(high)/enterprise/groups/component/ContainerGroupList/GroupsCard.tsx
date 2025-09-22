"use client";

/* styles */
import "./groupsCard.css";

/* icons */
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

/* groups */
import { GroupsCardMembers } from "./GroupsCardMembers";
import { GroupsCardHeader } from "./GroupsCardHeader";
import {
  Group,
  useGroupsContext,
} from "@/context/enterprise/GroupsEnterpriseContext";
import { GroupsCardMembersNoMembers } from "./GroupsCardMembersNoMembers";
import { GroupsCardMembersContainer } from "./GroupsCardMembersContainer";
import { GroupsCardRolesList } from "./GroupsCardRolesList";

/* hooks */
import { useModalContext } from "@/hooks/useModalsProject";

export const GroupsCard = ({ item }: { item: Group }) => {
  const { openModal } = useModalContext();

  const { selectedGroups, handleChangeCurrentGroup, handleAddGroupSelected } =
    useGroupsContext();

  const handleEdit = () => {
    handleChangeCurrentGroup(item);
    openModal("edit_group_enterprise", { userId: item.id });
  };

  const handleDelete = () => {
    handleChangeCurrentGroup(item);
    openModal("delete_group_enterprise");
  };

  const isSelected = selectedGroups.some((g) => g.id === item.id);

  return (
    <li
      className={`groupsCard flip ${isSelected ? "selected" : ""} `}
      onClick={() => handleAddGroupSelected(item)}
    >
      <GroupsCardHeader name={item.name} description={item.description} />

      {item.users && item.users.length > 0 ? (
        <GroupsCardMembers
          members={item.users.map((u: any) => ({
            id: u.user.id,
            name: u.user.name,
          }))}
        />
      ) : (
        <GroupsCardMembersNoMembers />
      )}

      <GroupsCardMembersContainer
        title="Roles"
        currentQuantityMembers={item.role.length}
      >
        <GroupsCardRolesList role={item.role} />
      </GroupsCardMembersContainer>

      <hr />

      <footer>
        <button
          className="btn edit"
          onClick={(e) => {
            e.stopPropagation();
            handleEdit();
          }}
          type="button"
        >
          <FaEdit />
          Edit
        </button>

        <button
          className="btn delete"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          type="button"
        >
          <MdDelete />
          Delete
        </button>
      </footer>

      <span></span>
      <div className="just-select">✔</div>
    </li>
  );
};
