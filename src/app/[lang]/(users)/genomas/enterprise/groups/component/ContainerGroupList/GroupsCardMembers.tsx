import { IconRoundedFull } from "@/components/enterprise/iconRoundedFull/IconRoundedFull";
import { FaUser } from "react-icons/fa";

export const GroupsCardMembers = ({
  members,
}: {
  members: { id: string; name?: string }[];
}) => {
  return (
    <article className="groupsCardMembers">
      <small>Miembros</small>
      <ul>
        {members.map(({ id, name }) => (
          <li key={id}>
            <GroupsCardMembersImg userId={id} />
            <span>{name ?? id}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export const GroupsCardMembersImg = ({ userId }: { userId: string }) => {
  return (
    <div>
      <IconRoundedFull icon={<FaUser />} />
      <span>Member 1</span>
    </div>
  );
};
