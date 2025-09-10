import { GroupsCardMembersContainer } from "./GroupsCardMembersContainer";
import { GroupsCardMembersImg } from "./GroupsCardMembersImg";

export const GroupsCardMembers = ({
  members,
}: {
  members: { id: string; name?: string }[];
}) => {
  return (
    <GroupsCardMembersContainer
      title="Miembros"
      currentQuantityMembers={members.length}
    >
      <ul className="groupsCardMembersList">
        {members.map(({ id, name }) => (
          <li key={id}>
            <GroupsCardMembersImg userId={id} userName={name} />
          </li>
        ))}
      </ul>
    </GroupsCardMembersContainer>
  );
};
