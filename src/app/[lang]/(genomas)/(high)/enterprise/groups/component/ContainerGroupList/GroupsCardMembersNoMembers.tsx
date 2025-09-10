import { GroupsCardMembersContainer } from "./GroupsCardMembersContainer";

export const GroupsCardMembersNoMembers = () => {
  return (
    <GroupsCardMembersContainer title="Miembros" currentQuantityMembers={0}>
      <ul className="groupsCardMembersList">
        <p>No miembros aun</p>
      </ul>
    </GroupsCardMembersContainer>
  );
};
