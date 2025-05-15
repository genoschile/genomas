import { IconRoundedFull } from "@/components/enterprise/iconRoundedFull/IconRoundedFull";
import { FaUser } from "react-icons/fa";

export const GroupsCardMembers = () => {
  return (
    <article className="groupsCardMembers">
      <small>Members</small>
      <ul>
        <li>
          <GroupsCardMembersImg />
        </li>
        <li>
          <GroupsCardMembersImg />
        </li>
      </ul>
    </article>
  );
};

export const GroupsCardMembersImg = () => {
  return (
    <div>
      <IconRoundedFull icon={<FaUser />} />
      <span>Member 1</span>
    </div>
  );
};
