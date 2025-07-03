"use client";

/* styles */
import "./groupsCard.css";

/* icons */
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

/* groups */
import { GroupsCardMembers } from "./GroupsCardMembers";
import { GroupsCardHeader } from "./GroupsCardHeader";
import { Group } from "@/context/enterprise/GroupsEnterpriseContext";
import { GroupsCardMembersNoMembers } from "./GroupsCardMembersNoMembers";
import { GroupsCardMembersContainer } from "./GroupsCardMembersContainer";
import { GroupsCardRolesList } from "./GroupsCardRolesList";

/* hooks */
import { useModalContext } from "@/hooks/useModalsProject";

export const GroupsCard = ({ item }: { item: Group }) => {
  const { openModal } = useModalContext();

  return (
    <li className="groupsCard">
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
          onClick={() => openModal("edit_group_enterprise")}
          type="button"
        >
          <FaEdit />
          Edit
        </button>

        <button
          className="btn delete"
          onClick={() => openModal("delete_group_enterprise")}
          type="button"
        >
          <MdDelete />
          Delete
        </button>
      </footer>
    </li>
  );
};
